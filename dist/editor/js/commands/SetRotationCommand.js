"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetRotationCommand = void 0;
const three_1 = require("three");
const Command_1 = require("../Command");
/**
 * @param editor Editor
 * @param object THREE.Object3D
 * @param newRotation THREE.Euler
 * @param optionalOldRotation THREE.Euler
 * @constructor
 */
class SetRotationCommand extends Command_1.Command {
    constructor(editor, object, newRotation, optionalOldRotation) {
        super(editor);
        this.type = 'SetRotationCommand';
        this.name = 'Set Rotation';
        this.updatable = true;
        this.object = object;
        if (object !== undefined && newRotation !== undefined) {
            this.oldRotation = object.rotation.clone();
            this.newRotation = newRotation.clone();
        }
        if (optionalOldRotation !== undefined) {
            this.oldRotation = optionalOldRotation.clone();
        }
    }
    execute() {
        this.object.rotation.copy(this.newRotation);
        this.object.updateMatrixWorld(true);
        this.editor.signals.objectChanged.dispatch(this.object);
    }
    undo() {
        this.object.rotation.copy(this.oldRotation);
        this.object.updateMatrixWorld(true);
        this.editor.signals.objectChanged.dispatch(this.object);
    }
    update(command) {
        this.newRotation.copy(command.newRotation);
    }
    toJSON() {
        const output = super.toJSON(this);
        output.objectUuid = this.object.uuid;
        output.oldRotation = this.oldRotation.toArray();
        output.newRotation = this.newRotation.toArray();
        return output;
    }
    fromJSON(json) {
        super.fromJSON(json);
        this.object = this.editor.objectByUuid(json.objectUuid);
        this.oldRotation = new three_1.Euler().fromArray(json.oldRotation);
        this.newRotation = new three_1.Euler().fromArray(json.newRotation);
    }
}
exports.SetRotationCommand = SetRotationCommand;
