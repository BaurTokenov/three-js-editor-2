"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenubarEdit = void 0;
const three_1 = require("three");
const ui_1 = require("./libs/ui");
const AddObjectCommand_1 = require("./commands/AddObjectCommand");
const RemoveObjectCommand_1 = require("./commands/RemoveObjectCommand");
const SetPositionCommand_1 = require("./commands/SetPositionCommand");
function MenubarEdit(editor) {
    const strings = editor.strings;
    const container = new ui_1.UIPanel();
    container.setClass('menu');
    const title = new ui_1.UIPanel();
    title.setClass('title');
    title.setTextContent(strings.getKey('menubar/edit'));
    container.add(title);
    const options = new ui_1.UIPanel();
    options.setClass('options');
    container.add(options);
    // Undo
    const undo = new ui_1.UIRow();
    undo.setClass('option');
    undo.setTextContent(strings.getKey('menubar/edit/undo'));
    undo.onClick(function () {
        editor.undo();
    });
    options.add(undo);
    // Redo
    const redo = new ui_1.UIRow();
    redo.setClass('option');
    redo.setTextContent(strings.getKey('menubar/edit/redo'));
    redo.onClick(function () {
        editor.redo();
    });
    options.add(redo);
    // Clear History
    let option = new ui_1.UIRow();
    option.setClass('option');
    option.setTextContent(strings.getKey('menubar/edit/clear_history'));
    option.onClick(function () {
        if (confirm('The Undo/Redo History will be cleared. Are you sure?')) {
            editor.history.clear();
        }
    });
    options.add(option);
    editor.signals.historyChanged.add(function () {
        const history = editor.history;
        undo.setClass('option');
        redo.setClass('option');
        if (history.undos.length == 0) {
            undo.setClass('inactive');
        }
        if (history.redos.length == 0) {
            redo.setClass('inactive');
        }
    });
    // ---
    options.add(new ui_1.UIHorizontalRule());
    // Center
    option = new ui_1.UIRow();
    option.setClass('option');
    option.setTextContent(strings.getKey('menubar/edit/center'));
    option.onClick(function () {
        const object = editor.selected;
        if (object === null || object.parent === null)
            return; // avoid centering the camera or scene
        const aabb = new three_1.Box3().setFromObject(object);
        const center = aabb.getCenter(new three_1.Vector3());
        const newPosition = new three_1.Vector3();
        newPosition.x = object.position.x + (object.position.x - center.x);
        newPosition.y = object.position.y + (object.position.y - center.y);
        newPosition.z = object.position.z + (object.position.z - center.z);
        editor.execute(new SetPositionCommand_1.SetPositionCommand(editor, object, newPosition));
    });
    options.add(option);
    // Clone
    option = new ui_1.UIRow();
    option.setClass('option');
    option.setTextContent(strings.getKey('menubar/edit/clone'));
    option.onClick(function () {
        let object = editor.selected;
        if (object === null || object.parent === null)
            return; // avoid cloning the camera or scene
        object = object.clone();
        editor.execute(new AddObjectCommand_1.AddObjectCommand(editor, object));
    });
    options.add(option);
    // Delete
    option = new ui_1.UIRow();
    option.setClass('option');
    option.setTextContent(strings.getKey('menubar/edit/delete'));
    option.onClick(function () {
        const object = editor.selected;
        if (object !== null && object.parent !== null) {
            editor.execute(new RemoveObjectCommand_1.RemoveObjectCommand(editor, object));
        }
    });
    options.add(option);
    //
    options.add(new ui_1.UIHorizontalRule());
    // Set textures to sRGB. See #15903
    option = new ui_1.UIRow();
    option.setClass('option');
    option.setTextContent(strings.getKey('menubar/edit/fixcolormaps'));
    option.onClick(function () {
        editor.scene.traverse(fixColorMap);
    });
    options.add(option);
    const colorMaps = ['map', 'envMap', 'emissiveMap'];
    function fixColorMap(obj) {
        const material = obj.material;
        if (material !== undefined) {
            if (Array.isArray(material) === true) {
                for (let i = 0; i < material.length; i += 1) {
                    fixMaterial(material[i]);
                }
            }
            else {
                fixMaterial(material);
            }
            editor.signals.sceneGraphChanged.dispatch();
        }
    }
    function fixMaterial(material) {
        let needsUpdate = material.needsUpdate;
        for (let i = 0; i < colorMaps.length; i += 1) {
            const map = material[colorMaps[i]];
            if (map) {
                map.encoding = THREE.sRGBEncoding;
                needsUpdate = true;
            }
        }
        material.needsUpdate = needsUpdate;
    }
    return container;
}
exports.MenubarEdit = MenubarEdit;
