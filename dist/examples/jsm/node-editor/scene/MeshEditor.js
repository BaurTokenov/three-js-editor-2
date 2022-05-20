"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeshEditor = void 0;
const flow_module_1 = require("../../libs/flow.module");
const Object3DEditor_1 = require("./Object3DEditor");
const three_1 = require("three");
class MeshEditor extends Object3DEditor_1.Object3DEditor {
    constructor(mesh = null) {
        if (mesh === null) {
            mesh = new three_1.Mesh();
        }
        super(mesh, 'Mesh');
        this.material = null;
        this.defaultMaterial = null;
        this._initMaterial();
        this.updateDefault();
        this.restoreDefault();
        this.update();
    }
    get mesh() {
        return this.value;
    }
    _initMaterial() {
        const materialElement = new flow_module_1.LabelElement('Material').setInputColor('forestgreen').setInput(1);
        materialElement
            .onValid((source, target, stage) => {
            const object = target.getObject();
            if (object && object.isMaterial !== true) {
                if (stage === 'dragged') {
                    const name = target.node.getName();
                    this.editor.tips.error(`"${name}" is not a Material.`);
                }
                return false;
            }
        })
            .onConnect(() => {
            this.material = materialElement.getLinkedObject() || this.defaultMaterial;
            this.update();
        });
        this.add(materialElement);
    }
    update() {
        super.update();
        const mesh = this.mesh;
        if (mesh) {
            mesh.material = this.material || this.defaultMaterial;
        }
    }
    updateDefault() {
        super.updateDefault();
        this.defaultMaterial = this.mesh.material;
    }
    restoreDefault() {
        super.restoreDefault();
        this.mesh.material = this.defaultMaterial;
    }
}
exports.MeshEditor = MeshEditor;
