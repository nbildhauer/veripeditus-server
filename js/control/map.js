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

/** global: L */

app.controller('ViewMapController', function($scope, Player) {
    // Set up map view
    var map = L.map("map");
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    Player.query(function(data) {
        $scope.players = data;

        // FIXME: Use a more intelligent way to find map center!
        map.setView([$scope.players[0].latitude, $scope.players[0].longitude], 16);

        // Iterate over players and add map markers
        for (var i = 0; i < $scope.players.length; i++) {
            var player = $scope.players[i];
            var picon = L.icon({
                'iconUrl': 'data:image/png;base64,' + player.avatar_base64,
                'iconSize': [32, 32],
            });
            var marker = L.marker([player.latitude, player.longitude], {
                'icon': picon
            });
            marker.bindPopup("<p>Username: " + player.username + "<br />Name: " + player.name + "</p>");
            marker.addTo(map);
        }
    });
});
