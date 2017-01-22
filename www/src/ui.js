/*
 * veripeditus-web - Web frontend to the veripeditus server
 * Copyright (C) 2016, 2017  Dominik George <nik@naturalnet.de>
 * Copyright (C) 2016  Eike Tim Jesinghaus <eike@naturalnet.de>
 * Copyright (c) 2017  mirabilos <thorsten.glaser@teckids.org>
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

UIService = function() {
    var self = this;
    self.name = "ui";

    self.render_view = function (view, opts) {
        var dialog = $('div#dialog');
        opts = opts || {};
        dialog.load("html/views/" + view + ".html", function () {
            var head = $('div#dialog h1');
            opts.title = head.text();
            head.remove();
            dialog.dialog(opts);

            // UI magic
            if (view == "player") {
                $('#dialog-player-logout-tabs').tabs();

                $('button#dialog-player-login-button').click(function () {
                    var username = $('#dialog-player-login-username').val();
                    var password = $('#dialog-player-login-password').val();
                    dialog.dialog("close");
                    GameData.login(username, password);
                });

                $('button#dialog-player-register-button').click(function () {
                    var username = $('#dialog-player-login-username').val();
                    var password = $('#dialog-player-login-password').val();
                    GameData.register(username, password);
                });

                $('button#dialog-player-logout-button').click(function () {
                    dialog.dialog("close");
                    GameData.logout();
                });

                if (localStorage.getItem("username")) {
                    // Player is logged in
                    $("#dialog-player-login").hide();
                    $("#dialog-player-logout").show();

                    // Generate inventory list
                    $('table#inventory-table').empty();
                    $.each(GameData.gameobjects[GameData.current_player_id].relationships.inventory.data, function (i, item) {
                        var real_item = GameData.gameobjects[item.id];
                        var html = "<tr>";
                        html += "<td><img src='/api/v2/gameobject/" + real_item.id + "/image_raw' /></td>";
                        html += "<td>" + real_item.attributes.name + "</td>";
                        html += "</tr>";
                        var elem = $(html);
                        $('table#inventory-table').append(elem);
                    });

                    // Insert profile
                    $('#dialog-player-logout-tabs-profile-avatar-image').attr('src',
                      '/api/v2/gameobject/' + GameData.current_player_id +
                      '/image_raw');

                    // Generate world list
                    var worlds_select = $('select#worlds');
                    worlds_select.empty();
                    $.each(GameData.worlds, function (i, item) {
                        // Create a new select option
                        var option = $("<option>", {
                            value: item.id
                        });
                        option.text(item.attributes.name);

                        // Append to select box
                        worlds_select.append(option);
                    });
                    worlds_select.val(GameData.gameobjects[GameData.current_player_id].relationships.world.data.id);

                    // Bind event to worlds_select to handle world change action
                    worlds_select.change(function () {
                        // Close dialog
                        dialog.dialog("close");

                        // Pass on joining the world to GameData service
                        GameData.joinWorld(worlds_select.val());
                    });
                } else {
                    // Player is not logged in
                    $("#dialog-player-login").show();
                    $("#dialog-player-logout").hide();
                }
                // end of “player” view
            }
        });
    };

    self.control_click = function() {
        var dialogs = ["player"];

        var view = $(this).attr("id").substr(8);
        if (dialogs.indexOf(view) > -1) {
            self.render_view(view);
        } else if (view == "view") {
            Veripeditus.nextView();
        }
    };

    self.needle = $("#compass-needle");
    self.onOrientationChanged = function() {
        self.needle.css("transform", "rotateZ(" + Device.orientation.heading + "deg)");
    };

    $('div.control').on("click", self.control_click);
};

UI = new UIService();
Veripeditus.registerService(UI);
