"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Toolbar = void 0;
const ui_1 = require("./libs/ui");
const translate_svg_1 = __importDefault(require("../images/translate.svg"));
const rotate_svg_1 = __importDefault(require("../images/rotate.svg"));
const scale_svg_1 = __importDefault(require("../images/scale.svg"));
function Toolbar(editor) {
    const signals = editor.signals;
    const strings = editor.strings;
    const container = new ui_1.UIPanel();
    container.setId('toolbar');
    // translate / rotate / scale
    const translateIcon = document.createElement('img');
    translateIcon.title = strings.getKey('toolbar/translate');
    translateIcon.src = translate_svg_1.default;
    const translate = new ui_1.UIButton();
    translate.dom.className = 'Button selected';
    translate.dom.appendChild(translateIcon);
    translate.onClick(function () {
        signals.transformModeChanged.dispatch('translate');
    });
    container.add(translate);
    const rotateIcon = document.createElement('img');
    rotateIcon.title = strings.getKey('toolbar/rotate');
    rotateIcon.src = rotate_svg_1.default;
    const rotate = new ui_1.UIButton();
    rotate.dom.appendChild(rotateIcon);
    rotate.onClick(function () {
        signals.transformModeChanged.dispatch('rotate');
    });
    container.add(rotate);
    const scaleIcon = document.createElement('img');
    scaleIcon.title = strings.getKey('toolbar/scale');
    scaleIcon.src = scale_svg_1.default;
    const scale = new ui_1.UIButton();
    scale.dom.appendChild(scaleIcon);
    scale.onClick(function () {
        signals.transformModeChanged.dispatch('scale');
    });
    container.add(scale);
    const local = new ui_1.UICheckbox(false);
    local.dom.title = strings.getKey('toolbar/local');
    local.onChange(function () {
        signals.spaceChanged.dispatch(this.getValue() === true ? 'local' : 'world');
    });
    container.add(local);
    //
    signals.transformModeChanged.add(function (mode) {
        translate.dom.classList.remove('selected');
        rotate.dom.classList.remove('selected');
        scale.dom.classList.remove('selected');
        switch (mode) {
            case 'translate':
                translate.dom.classList.add('selected');
                break;
            case 'rotate':
                rotate.dom.classList.add('selected');
                break;
            case 'scale':
                scale.dom.classList.add('selected');
                break;
        }
    });
    return container;
}
exports.Toolbar = Toolbar;
