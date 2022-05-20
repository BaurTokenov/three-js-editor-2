"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewHelper = void 0;
const ui_1 = require("./libs/ui");
const ViewHelper_1 = require("../../examples/jsm/helpers/ViewHelper");
class ViewHelper extends ViewHelper_1.ViewHelper {
    constructor(editorCamera, container) {
        super(editorCamera, container.dom);
        const panel = new ui_1.UIPanel();
        panel.setId('viewHelper');
        panel.setPosition('absolute');
        panel.setRight('0px');
        panel.setBottom('0px');
        panel.setHeight('128px');
        panel.setWidth('128px');
        panel.dom.addEventListener('pointerup', (event) => {
            event.stopPropagation();
            this.handleClick(event);
        });
        panel.dom.addEventListener('pointerdown', function (event) {
            event.stopPropagation();
        });
        container.add(panel);
    }
}
exports.ViewHelper = ViewHelper;
