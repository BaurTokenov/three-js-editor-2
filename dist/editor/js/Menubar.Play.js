"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenubarPlay = void 0;
const ui_1 = require("./libs/ui");
function MenubarPlay(editor) {
    const signals = editor.signals;
    const strings = editor.strings;
    const container = new ui_1.UIPanel();
    container.setClass('menu');
    let isPlaying = false;
    const title = new ui_1.UIPanel();
    title.setClass('title');
    title.setTextContent(strings.getKey('menubar/play'));
    title.onClick(function () {
        if (isPlaying === false) {
            isPlaying = true;
            title.setTextContent(strings.getKey('menubar/play/stop'));
            signals.startPlayer.dispatch();
        }
        else {
            isPlaying = false;
            title.setTextContent(strings.getKey('menubar/play/play'));
            signals.stopPlayer.dispatch();
        }
    });
    container.add(title);
    return container;
}
exports.MenubarPlay = MenubarPlay;
