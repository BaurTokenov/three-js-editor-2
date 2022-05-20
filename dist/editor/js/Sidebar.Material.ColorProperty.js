"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidebarMaterialColorProperty = void 0;
const ui_1 = require("./libs/ui");
const SetMaterialColorCommand_1 = require("./commands/SetMaterialColorCommand");
const SetMaterialValueCommand_1 = require("./commands/SetMaterialValueCommand");
function SidebarMaterialColorProperty(editor, property, name) {
    const signals = editor.signals;
    const container = new ui_1.UIRow();
    container.add(new ui_1.UIText(name).setWidth('90px'));
    const color = new ui_1.UIColor().onInput(onChange);
    container.add(color);
    let intensity;
    if (property === 'emissive') {
        intensity = new ui_1.UINumber().setWidth('30px').onChange(onChange);
        container.add(intensity);
    }
    let object = null;
    let material = null;
    function onChange() {
        if (material[property].getHex() !== color.getHexValue()) {
            editor.execute(new SetMaterialColorCommand_1.SetMaterialColorCommand(editor, object, property, color.getHexValue(), 0 /* TODO: currentMaterialSlot */));
        }
        if (intensity !== undefined) {
            if (material[`${property}Intensity`] !== intensity.getValue()) {
                editor.execute(new SetMaterialValueCommand_1.SetMaterialValueCommand(editor, object, `${property}Intensity`, intensity.getValue(), 
                /* TODO: currentMaterialSlot*/ 0));
            }
        }
    }
    function update() {
        if (object === null)
            return;
        if (object.material === undefined)
            return;
        material = object.material;
        if (property in material) {
            color.setHexValue(material[property].getHexString());
            if (intensity !== undefined) {
                intensity.setValue(material[`${property}Intensity`]);
            }
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
exports.SidebarMaterialColorProperty = SidebarMaterialColorProperty;
