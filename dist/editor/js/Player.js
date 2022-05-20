"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const ui_1 = require("./libs/ui");
const app_1 = require("./libs/app");
function Player(editor) {
    const signals = editor.signals;
    const container = new ui_1.UIPanel();
    container.setId('player');
    container.setPosition('absolute');
    container.setDisplay('none');
    //
    const player = new app_1.APP();
    container.dom.appendChild(player.dom);
    window.addEventListener('resize', function () {
        player.setSize(container.dom.clientWidth, container.dom.clientHeight);
    });
    signals.windowResize.add(function () {
        player.setSize(container.dom.clientWidth, container.dom.clientHeight);
    });
    signals.startPlayer.add(function () {
        container.setDisplay('');
        player.load(editor.toJSON());
        player.setSize(container.dom.clientWidth, container.dom.clientHeight);
        player.play();
    });
    signals.stopPlayer.add(function () {
        container.setDisplay('none');
        player.stop();
        player.dispose();
    });
    return container;
}
exports.Player = Player;
