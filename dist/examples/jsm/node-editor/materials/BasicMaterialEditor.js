"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicMaterialEditor = void 0;
const flow_module_1 = require("../../libs/flow.module");
const BaseNode_1 = require("../core/BaseNode");
const Nodes_1 = require("three-nodes/Nodes");
const three_1 = require("three");
class BasicMaterialEditor extends BaseNode_1.BaseNode {
    constructor() {
        const material = new Nodes_1.MeshBasicNodeMaterial();
        super('Basic Material', 1, material);
        this.setWidth(300);
        const color = new flow_module_1.LabelElement('color').setInput(3);
        const opacity = new flow_module_1.LabelElement('opacity').setInput(1);
        const position = new flow_module_1.LabelElement('position').setInput(3);
        color.add(new flow_module_1.ColorInput(material.color.getHex()).onChange((input) => {
            material.color.setHex(input.getValue());
        }));
        opacity.add(new flow_module_1.SliderInput(material.opacity, 0, 1).onChange((input) => {
            material.opacity = input.getValue();
            this.updateTransparent();
        }));
        color.onConnect(() => this.update(), true);
        opacity.onConnect(() => this.update(), true);
        position.onConnect(() => this.update(), true);
        this.add(color).add(opacity).add(position);
        this.color = color;
        this.opacity = opacity;
        this.position = position;
        this.material = material;
        this.update();
    }
    update() {
        const { material, color, opacity, position } = this;
        color.setEnabledInputs(!color.getLinkedObject());
        opacity.setEnabledInputs(!opacity.getLinkedObject());
        material.colorNode = color.getLinkedObject();
        material.opacityNode = opacity.getLinkedObject() || null;
        material.positionNode = position.getLinkedObject() || null;
        material.dispose();
        this.updateTransparent();
        // TODO: Fix on NodeMaterial System
        material.customProgramCacheKey = () => {
            return three_1.MathUtils.generateUUID();
        };
    }
    updateTransparent() {
        const { material, opacity } = this;
        material.transparent = opacity.getLinkedObject() || material.opacity < 1 ? true : false;
        opacity.setIcon(material.transparent ? 'ti ti-layers-intersect' : 'ti ti-layers-subtract');
    }
}
exports.BasicMaterialEditor = BasicMaterialEditor;
