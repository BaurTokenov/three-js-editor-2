"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewportInfo = void 0;
const ui_1 = require("./libs/ui");
function ViewportInfo(editor) {
    const signals = editor.signals;
    const strings = editor.strings;
    const container = new ui_1.UIPanel();
    container.setId('info');
    container.setPosition('absolute');
    container.setLeft('10px');
    container.setBottom('10px');
    container.setFontSize('12px');
    container.setColor('#fff');
    const objectsText = new ui_1.UIText('0').setMarginLeft('6px');
    const verticesText = new ui_1.UIText('0').setMarginLeft('6px');
    const trianglesText = new ui_1.UIText('0').setMarginLeft('6px');
    const frametimeText = new ui_1.UIText('0').setMarginLeft('6px');
    container.add(new ui_1.UIText(strings.getKey('viewport/info/objects')).setTextTransform('lowercase'));
    container.add(objectsText, new ui_1.UIBreak());
    container.add(new ui_1.UIText(strings.getKey('viewport/info/vertices')).setTextTransform('lowercase'));
    container.add(verticesText, new ui_1.UIBreak());
    container.add(new ui_1.UIText(strings.getKey('viewport/info/triangles')).setTextTransform('lowercase'));
    container.add(trianglesText, new ui_1.UIBreak());
    container.add(new ui_1.UIText(strings.getKey('viewport/info/frametime')).setTextTransform('lowercase'));
    container.add(frametimeText, new ui_1.UIBreak());
    signals.objectAdded.add(update);
    signals.objectRemoved.add(update);
    signals.geometryChanged.add(update);
    //
    function update() {
        const scene = editor.scene;
        let objects = 0, vertices = 0, triangles = 0;
        for (let i = 0, l = scene.children.length; i < l; i += 1) {
            const object = scene.children[i];
            object.traverseVisible(function (object) {
                objects++;
                if (object.isMesh) {
                    const geometry = object.geometry;
                    vertices += geometry.attributes.position.count;
                    if (geometry.index !== null) {
                        triangles += geometry.index.count / 3;
                    }
                    else {
                        triangles += geometry.attributes.position.count / 3;
                    }
                }
            });
        }
        objectsText.setValue(objects.toLocaleString());
        verticesText.setValue(vertices.toLocaleString());
        trianglesText.setValue(triangles.toLocaleString());
    }
    signals.sceneRendered.add(updateFrametime);
    function updateFrametime(frametime) {
        frametimeText.setValue(Number(frametime).toFixed(2) + ' ms');
    }
    return container;
}
exports.ViewportInfo = ViewportInfo;
