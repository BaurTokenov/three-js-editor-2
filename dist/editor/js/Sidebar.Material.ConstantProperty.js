"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidebarMaterialConstantProperty = void 0;
const ui_1 = require("./libs/ui");
const SetMaterialValueCommand_1 = require("./commands/SetMaterialValueCommand");
function SidebarMaterialConstantProperty(editor, property, name, options) {
    const signals = editor.signals;
    const container = new ui_1.UIRow();
    container.add(new ui_1.UIText(name).setWidth('90px'));
    const constant = new ui_1.UISelect().setOptions(options).onChange(onChange);
    container.add(constant);
    let object = null;
    let material = null;
    function onChange() {
        const value = parseInt(constant.getValue());
        if (material[property] !== value) {
            editor.execute(new SetMaterialValueCommand_1.SetMaterialValueCommand(editor, object, property, value, 0 /* TODO: currentMaterialSlot */));
        }
    }
    function update() {
        if (object === null)
            return;
        if (object.material === undefined)
            return;
        material = object.material;
        if (property in material) {
            constant.setValue(material[property]);
            container.setDisplay('');
        }
        else {
            container.setDisplay('none');
        }
    }
    //
    signals.objectSelected.add(function (selected) {
        object = selected;
        update();
    });
    signals.materialChanged.add(update);
    return container;
}
exports.SidebarMaterialConstantProperty = SidebarMaterialConstantProperty;
