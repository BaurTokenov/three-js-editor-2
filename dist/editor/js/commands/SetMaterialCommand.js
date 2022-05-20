"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetMaterialCommand = void 0;
const three_1 = require("three");
const Command_1 = require("../Command");
/**
 * @param editor Editor
 * @param object THREE.Object3D
 * @param newMaterial THREE.Material
 * @constructor
 */
class SetMaterialCommand extends Command_1.Command {
    constructor(editor, object, newMaterial, materialSlot) {
        super(editor);
        this.type = 'SetMaterialCommand';
        this.name = 'New Material';
        this.object = object;
        this.materialSlot = materialSlot;
        this.oldMaterial = this.editor.getObjectMaterial(object, materialSlot);
        this.newMaterial = newMaterial;
    }
    execute() {
        this.editor.setObjectMaterial(this.object, this.materialSlot, this.newMaterial);
        this.editor.signals.materialChanged.dispatch(this.newMaterial);
    }
    undo() {
        this.editor.setObjectMaterial(this.object, this.materialSlot, this.oldMaterial);
        this.editor.signals.materialChanged.dispatch(this.oldMaterial);
    }
    toJSON() {
        const output = super.toJSON(this);
        output.objectUuid = this.object.uuid;
        output.oldMaterial = this.oldMaterial.toJSON();
        output.newMaterial = this.newMaterial.toJSON();
        return output;
    }
    fromJSON(json) {
        super.fromJSON(json);
        this.object = this.editor.objectByUuid(json.objectUuid);
        this.oldMaterial = parseMaterial(json.oldMaterial);
        this.newMaterial = parseMaterial(json.newMaterial);
        function parseMaterial(json) {
            const loader = new three_1.ObjectLoader();
            const images = loader.parseImages(json.images);
            const textures = loader.parseTextures(json.textures, images);
            const materials = loader.parseMaterials([json], textures);
            return materials[json.uuid];
        }
    }
}
exports.SetMaterialCommand = SetMaterialCommand;
