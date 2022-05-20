"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidebarGeometryModifiers = void 0;
const ui_1 = require("./libs/ui");
function SidebarGeometryModifiers(editor, object) {
    const signals = editor.signals;
    const container = new ui_1.UIDiv().setPaddingLeft('90px');
    const geometry = object.geometry;
    // Compute Vertex Normals
    const button = new ui_1.UIButton('Compute Vertex Normals');
    button.onClick(function () {
        geometry.computeVertexNormals();
        geometry.attributes.normal.needsUpdate = true;
        signals.geometryChanged.dispatch(object);
    });
    container.add(button);
    //
    return container;
}
exports.SidebarGeometryModifiers = SidebarGeometryModifiers;
