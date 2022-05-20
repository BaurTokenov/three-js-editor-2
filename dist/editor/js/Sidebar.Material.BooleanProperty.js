"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidebarMaterialBooleanProperty = void 0;
const ui_1 = require("./libs/ui");
const SetMaterialValueCommand_1 = require("./commands/SetMaterialValueCommand");
function SidebarMaterialBooleanProperty(editor, property, name) {
    const signals = editor.signals;
    const container = new ui_1.UIRow();
    container.add(new ui_1.UIText(name).setWidth('90px'));
    const boolean = new ui_1.UICheckbox().setLeft('100px').onChange(onChange);
    container.add(boolean);
    let object = null;
    let material = null;
    function onChange() {
        if (material[property] !== boolean.getValue()) {
            editor.execute(new SetMaterialValueCommand_1.SetMaterialValueCommand(editor, object, property, boolean.getValue(), 0 /* TODO: currentMaterialSlot */));
        }
    }
    function update() {
        if (object === null)
            return;
        if (object.material === undefined)
            return;
        material = object.material;
        if (property in material) {
            boolean.setValue(material[property]);
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
exports.SidebarMaterialBooleanProperty = SidebarMaterialBooleanProperty;
