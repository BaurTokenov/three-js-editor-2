"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Object3DEditor = void 0;
const flow_module_1 = require("../../libs/flow.module");
const BaseNode_1 = require("../core/BaseNode");
const three_1 = require("three");
class Object3DEditor extends BaseNode_1.BaseNode {
    constructor(object3d = null, name = 'Object 3D') {
        if (object3d === null) {
            object3d = new three_1.Group();
        }
        super(name, 1, object3d);
        this.defaultPosition = new three_1.Vector3();
        this.defaultRotation = new three_1.Vector3();
        this.defaultScale = new three_1.Vector3(100, 100, 100);
        this._initTags();
        this._initTransform();
        this.onValidElement = () => { };
    }
    setEditor(editor) {
        if (this.editor) {
            this.restoreDefault();
        }
        super.setEditor(editor);
        if (editor) {
            const name = this.nameInput.getValue();
            const object3d = editor.scene.getObjectByName(name);
            this.value = object3d;
            this.updateDefault();
            this.restoreDefault();
            this.update();
        }
        return this;
    }
    get object3d() {
        return this.value;
    }
    _initTags() {
        this.nameInput = new flow_module_1.StringInput(this.object3d.name)
            .setReadOnly(true)
            .onChange(() => (this.object3d.name = this.nameInput.getValue()));
        this.add(new flow_module_1.LabelElement('Name').add(this.nameInput));
    }
    _initTransform() {
        const update = () => this.update();
        const posX = new flow_module_1.NumberInput().setTagColor('red').onChange(update);
        const posY = new flow_module_1.NumberInput().setTagColor('green').onChange(update);
        const posZ = new flow_module_1.NumberInput().setTagColor('blue').onChange(update);
        const rotationStep = 1;
        const rotX = new flow_module_1.NumberInput().setTagColor('red').setStep(rotationStep).onChange(update);
        const rotY = new flow_module_1.NumberInput().setTagColor('green').setStep(rotationStep).onChange(update);
        const rotZ = new flow_module_1.NumberInput().setTagColor('blue').setStep(rotationStep).onChange(update);
        const scaleX = new flow_module_1.NumberInput(100).setTagColor('red').setStep(rotationStep).onChange(update);
        const scaleY = new flow_module_1.NumberInput(100).setTagColor('green').setStep(rotationStep).onChange(update);
        const scaleZ = new flow_module_1.NumberInput(100).setTagColor('blue').setStep(rotationStep).onChange(update);
        this.add(new flow_module_1.LabelElement('Position').add(posX).add(posY).add(posZ))
            .add(new flow_module_1.LabelElement('Rotation').add(rotX).add(rotY).add(rotZ))
            .add(new flow_module_1.LabelElement('Scale').add(scaleX).add(scaleY).add(scaleZ));
        this.posX = posX;
        this.posY = posY;
        this.posZ = posZ;
        this.rotX = rotX;
        this.rotY = rotY;
        this.rotZ = rotZ;
        this.scaleX = scaleX;
        this.scaleY = scaleY;
        this.scaleZ = scaleZ;
    }
    update() {
        const object3d = this.object3d;
        if (object3d) {
            const { position, rotation, scale } = object3d;
            position.x = this.posX.getValue();
            position.y = this.posY.getValue();
            position.z = this.posZ.getValue();
            rotation.x = three_1.MathUtils.degToRad(this.rotX.getValue());
            rotation.y = three_1.MathUtils.degToRad(this.rotY.getValue());
            rotation.z = three_1.MathUtils.degToRad(this.rotZ.getValue());
            scale.x = this.scaleX.getValue() / 100;
            scale.y = this.scaleY.getValue() / 100;
            scale.z = this.scaleZ.getValue() / 100;
        }
    }
    updateDefault() {
        const { position, rotation, scale } = this.object3d;
        this.defaultPosition = position.clone();
        this.defaultRotation = new three_1.Vector3(three_1.MathUtils.radToDeg(rotation.x), three_1.MathUtils.radToDeg(rotation.y), three_1.MathUtils.radToDeg(rotation.z));
        this.defaultScale = scale.clone().multiplyScalar(100);
    }
    restoreDefault() {
        const position = this.defaultPosition;
        const rotation = this.defaultRotation;
        const scale = this.defaultScale;
        this.posX.setValue(position.x);
        this.posY.setValue(position.y);
        this.posZ.setValue(position.z);
        this.rotX.setValue(rotation.x);
        this.rotY.setValue(rotation.y);
        this.rotZ.setValue(rotation.z);
        this.scaleX.setValue(scale.x);
        this.scaleY.setValue(scale.y);
        this.scaleZ.setValue(scale.z);
    }
}
exports.Object3DEditor = Object3DEditor;
