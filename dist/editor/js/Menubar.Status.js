"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenubarStatus = void 0;
const THREE = __importStar(require("three"));
const ui_1 = require("./libs/ui");
const ui_three_1 = require("./libs/ui.three");
function MenubarStatus(editor) {
    const strings = editor.strings;
    const container = new ui_1.UIPanel();
    container.setClass('menu right');
    const autosave = new ui_three_1.UIBoolean(editor.config.getKey('autosave'), strings.getKey('menubar/status/autosave'));
    autosave.text.setColor('#888');
    autosave.onChange(function () {
        const value = this.getValue();
        editor.config.setKey('autosave', value);
        if (value === true) {
            editor.signals.sceneGraphChanged.dispatch();
        }
    });
    container.add(autosave);
    editor.signals.savingStarted.add(function () {
        autosave.text.setTextDecoration('underline');
    });
    editor.signals.savingFinished.add(function () {
        autosave.text.setTextDecoration('none');
    });
    const version = new ui_1.UIText('r' + THREE.REVISION);
    version.setClass('title');
    version.setOpacity(0.5);
    container.add(version);
    return container;
}
exports.MenubarStatus = MenubarStatus;
