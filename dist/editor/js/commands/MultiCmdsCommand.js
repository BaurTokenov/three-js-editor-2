"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiCmdsCommand = void 0;
const Command_1 = require("../Command");
/**
 * @param editor Editor
 * @param cmdArray array containing command objects
 * @constructor
 */
class MultiCmdsCommand extends Command_1.Command {
    constructor(editor, cmdArray) {
        super(editor);
        this.type = 'MultiCmdsCommand';
        this.name = 'Multiple Changes';
        this.cmdArray = cmdArray !== undefined ? cmdArray : [];
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
exports.MultiCmdsCommand = MultiCmdsCommand;
