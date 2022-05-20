"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidebarMaterialProgram = void 0;
const ui_1 = require("./libs/ui");
function SidebarMaterialProgram(editor, property) {
    const signals = editor.signals;
    const strings = editor.strings;
    let object = null;
    let material = null;
    const container = new ui_1.UIRow();
    container.add(new ui_1.UIText(strings.getKey('sidebar/material/program')).setWidth('90px'));
    const programInfo = new ui_1.UIButton(strings.getKey('sidebar/material/info'));
    programInfo.setMarginRight('4px');
    programInfo.onClick(function () {
        signals.editScript.dispatch(object, 'programInfo');
    });
    container.add(programInfo);
    const programVertex = new ui_1.UIButton(strings.getKey('sidebar/material/vertex'));
    programVertex.setMarginRight('4px');
    programVertex.onClick(function () {
        signals.editScript.dispatch(object, 'vertexShader');
    });
    container.add(programVertex);
    const programFragment = new ui_1.UIButton(strings.getKey('sidebar/material/fragment'));
    programFragment.setMarginRight('4px');
    programFragment.onClick(function () {
        signals.editScript.dispatch(object, 'fragmentShader');
    });
    container.add(programFragment);
    function update() {
        if (object === null)
            return;
        if (object.material === undefined)
            return;
        material = object.material;
        if (property in material) {
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
exports.SidebarMaterialProgram = SidebarMaterialProgram;
