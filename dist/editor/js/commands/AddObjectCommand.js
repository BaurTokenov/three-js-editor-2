"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddObjectCommand = void 0;
const three_1 = require("three");
const Command_1 = require("../Command");
/**
 * @param editor Editor
 * @param object THREE.Object3D
 * @constructor
 */
class AddObjectCommand extends Command_1.Command {
    constructor(editor, object) {
        super(editor);
        this.type = 'AddObjectCommand';
        this.object = object;
        if (object !== undefined) {
            this.name = `Add Object: ${object.name}`;
        }
    }
    execute() {
        this.editor.addObject(this.object);
        this.editor.select(this.object);
    }
    undo() {
        this.editor.removeObject(this.object);
        this.editor.deselect();
    }
    toJSON() {
        const output = super.toJSON(this);
        output.object = this.object.toJSON();
        return output;
    }
    fromJSON(json) {
        super.fromJSON(json);
        this.object = this.editor.objectByUuid(json.object.object.uuid);
        if (this.object === undefined) {
            const loader = new three_1.ObjectLoader();
            this.object = loader.parse(json.object);
        }
    }
}
exports.AddObjectCommand = AddObjectCommand;
