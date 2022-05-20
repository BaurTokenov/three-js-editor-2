"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetSceneCommand = void 0;
const Command_1 = require("../Command");
const SetUuidCommand_1 = require("./SetUuidCommand");
const SetValueCommand_1 = require("./SetValueCommand");
const AddObjectCommand_1 = require("./AddObjectCommand");
/**
 * @param editor Editor
 * @param scene containing children to import
 * @constructor
 */
class SetSceneCommand extends Command_1.Command {
    constructor(editor, scene) {
        super(editor);
        this.type = 'SetSceneCommand';
        this.name = 'Set Scene';
        this.cmdArray = [];
        if (scene !== undefined) {
            this.cmdArray.push(new SetUuidCommand_1.SetUuidCommand(this.editor, this.editor.scene, scene.uuid));
            this.cmdArray.push(new SetValueCommand_1.SetValueCommand(this.editor, this.editor.scene, 'name', scene.name));
            this.cmdArray.push(new SetValueCommand_1.SetValueCommand(this.editor, this.editor.scene, 'userData', JSON.parse(JSON.stringify(scene.userData))));
            while (scene.children.length > 0) {
                const child = scene.children.pop();
                this.cmdArray.push(new AddObjectCommand_1.AddObjectCommand(this.editor, child));
            }
        }
    }
    execute() {
        this.editor.signals.sceneGraphChanged.active = false;
        for (let i = 0; i < this.cmdArray.length; i += 1) {
            this.cmdArray[i].execute();
        }
        this.editor.signals.sceneGraphChanged.active = true;
        this.editor.signals.sceneGraphChanged.dispatch();
    }
    undo() {
        this.editor.signals.sceneGraphChanged.active = false;
        for (let i = this.cmdArray.length - 1; i >= 0; i -= 1) {
            this.cmdArray[i].undo();
        }
        this.editor.signals.sceneGraphChanged.active = true;
        this.editor.signals.sceneGraphChanged.dispatch();
    }
    toJSON() {
        const output = super.toJSON(this);
        const cmds = [];
        for (let i = 0; i < this.cmdArray.length; i += 1) {
            cmds.push(this.cmdArray[i].toJSON());
        }
        output.cmds = cmds;
        return output;
    }
    fromJSON(json) {
        super.fromJSON(json);
        const { cmds } = json;
        for (let i = 0; i < cmds.length; i += 1) {
            const cmd = new window[cmds[i].type](); // creates a new object of type "json.type"
            cmd.fromJSON(cmds[i]);
            this.cmdArray.push(cmd);
        }
    }
}
exports.SetSceneCommand = SetSceneCommand;
