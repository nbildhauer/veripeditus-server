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

// All route definitions for app views
app.config(function($routeProvider) {
    $routeProvider.when('/', {
        redirectTo: '/map'
    }).when('/login', {
        templateUrl: 'html/login.html',
        controller: 'ViewLoginController'
    }).when('/logout', {
        templateUrl: 'html/logout.html',
        controller: 'ViewLogoutController'
    }).when('/map', {
        templateUrl: 'html/map.html',
        controller: 'ViewMapController'
    }).when('/register', {
        templateUrl: 'html/register.html',
        controller: 'ViewRegisterController'
    }).when('/status', {
        templateUrl: 'html/status.html',
        controller: 'ViewStatusController'
    });
});
