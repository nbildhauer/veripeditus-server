/*
 * veripeditus-web - Web frontend to the veripeditus server
 * Copyright (C) 2016  Dominik George <nik@naturalnet.de>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

var VERSION = "0.1";

var veripeditusMain = angular.module('Veripeditus', [
    'ngRoute',
    'ngResource',
    'gettext',
]);

veripeditusMain.controller('veripeditusController', ['$scope', '$rootScope', '$location', '$http', 'Messages', function ($scope, $rootScope, $location, $http, Messages) {
  $rootScope.VERSION = VERSION;

  // Bind $rootScope into controller scope to make it available
  // in data bindings
  $scope.root = $rootScope;

  // Function that passes closing of a floating alert to the Messages service
  $scope.closeAlert = function(id) {
    Messages.remove(id);
  };

  // Look for auth string in session storage, then local storage
  var s_auth_string = sessionStorage.auth_string || localStorage.auth_string;
  // Set to HTTP service if auth string was stored
  if (s_auth_string) {
    $http.defaults.headers.common['Authorization'] = s_auth_string;
  }
}]);
