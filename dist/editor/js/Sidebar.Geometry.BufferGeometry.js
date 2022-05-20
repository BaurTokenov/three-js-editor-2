"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidebarGeometryBufferGeometry = void 0;
const ui_1 = require("./libs/ui");
function SidebarGeometryBufferGeometry(editor) {
    const strings = editor.strings;
    const signals = editor.signals;
    const container = new ui_1.UIRow();
    function update(object) {
        if (object === null)
            return; // objectSelected.dispatch( null )
        if (object === undefined)
            return;
        const geometry = object.geometry;
        if (geometry && geometry.isBufferGeometry) {
            container.clear();
            container.setDisplay('block');
            const text = new ui_1.UIText(strings.getKey('sidebar/geometry/buffer_geometry/attributes')).setWidth('90px');
            container.add(text);
            const container2 = new ui_1.UISpan().setDisplay('inline-block').setVerticalAlign('middle').setWidth('160px');
            container.add(container2);
            const index = geometry.index;
            if (index !== null) {
                container2.add(new ui_1.UIText(strings.getKey('sidebar/geometry/buffer_geometry/index')).setWidth('80px'));
                container2.add(new ui_1.UIText(index.count.toLocaleString()).setFontSize('12px'));
                container2.add(new ui_1.UIBreak());
            }
            const attributes = geometry.attributes;
            for (const name in attributes) {
                const attribute = attributes[name];
                container2.add(new ui_1.UIText(name).setWidth('80px'));
                container2.add(new ui_1.UIText(attribute.count.toLocaleString() + ' (' + attribute.itemSize + ')').setFontSize('12px'));
                container2.add(new ui_1.UIBreak());
            }
        }
        else {
            container.setDisplay('none');
        }
    }
    signals.objectSelected.add(update);
    signals.geometryChanged.add(update);
    return container;
}
exports.SidebarGeometryBufferGeometry = SidebarGeometryBufferGeometry;
