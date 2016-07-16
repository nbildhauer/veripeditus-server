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

angular.module('Veripeditus.view_login', ['ngRoute', 'ngResource']).config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'src/views/login.html',
    controller: 'ViewLoginController'
  });
}]).controller('ViewLoginController', ['$scope', '$window', 'APIService', function($scope, $window, APIService) {
  $scope.login = function() {
   APIService.login($scope.username, $scope.password);
   // FIXME: Only on success
   $window.history.back();
  };
}]);
