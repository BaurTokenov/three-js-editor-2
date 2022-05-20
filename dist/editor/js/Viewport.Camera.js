"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewportCamera = void 0;
const ui_1 = require("./libs/ui");
function ViewportCamera(editor) {
    const signals = editor.signals;
    //
    const cameraSelect = new ui_1.UISelect();
    cameraSelect.setPosition('absolute');
    cameraSelect.setRight('10px');
    cameraSelect.setTop('10px');
    cameraSelect.onChange(function () {
        editor.setViewportCamera(this.getValue());
    });
    signals.cameraAdded.add(update);
    signals.cameraRemoved.add(update);
    update();
    //
    function update() {
        const options = {};
        const cameras = editor.cameras;
        for (const key in cameras) {
            const camera = cameras[key];
            options[camera.uuid] = camera.name;
        }
        cameraSelect.setOptions(options);
        cameraSelect.setValue(editor.viewportCamera.uuid);
    }
    return cameraSelect;
}
exports.ViewportCamera = ViewportCamera;
