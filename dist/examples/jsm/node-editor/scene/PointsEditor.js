"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointsEditor = void 0;
const flow_module_1 = require("../../libs/flow.module");
const Object3DEditor_1 = require("./Object3DEditor");
const three_1 = require("three");
class PointsEditor extends Object3DEditor_1.Object3DEditor {
    constructor(points = null) {
        if (points === null) {
            points = new three_1.Points();
        }
        super(points, 'Points');
        this.material = null;
        this.defaultMaterial = null;
        this._initMaterial();
        this.updateDefault();
        this.restoreDefault();
        this.update();
    }
    get points() {
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
        const points = this.points;
        if (points) {
            points.material = this.material || this.defaultMaterial;
        }
    }
    updateDefault() {
        super.updateDefault();
        this.defaultMaterial = this.points.material;
    }
    restoreDefault() {
        super.restoreDefault();
        this.points.material = this.defaultMaterial;
    }
}
exports.PointsEditor = PointsEditor;
