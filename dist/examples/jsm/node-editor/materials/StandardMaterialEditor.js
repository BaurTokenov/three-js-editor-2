"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StandardMaterialEditor = void 0;
const flow_module_1 = require("../../libs/flow.module");
const BaseNode_1 = require("../core/BaseNode");
const Nodes_1 = require("three-nodes/Nodes");
const THREE = __importStar(require("three"));
class StandardMaterialEditor extends BaseNode_1.BaseNode {
    constructor() {
        const material = new Nodes_1.MeshStandardNodeMaterial();
        super('Standard Material', 1, material);
        this.setWidth(300);
        const color = new flow_module_1.LabelElement('color').setInput(3);
        const opacity = new flow_module_1.LabelElement('opacity').setInput(1);
        const metalness = new flow_module_1.LabelElement('metalness').setInput(1);
        const roughness = new flow_module_1.LabelElement('roughness').setInput(1);
        const emissive = new flow_module_1.LabelElement('emissive').setInput(3);
        const normal = new flow_module_1.LabelElement('normal').setInput(3);
        const position = new flow_module_1.LabelElement('position').setInput(3);
        color.add(new flow_module_1.ColorInput(material.color.getHex()).onChange((input) => {
            material.color.setHex(input.getValue());
        }));
        opacity.add(new flow_module_1.SliderInput(material.opacity, 0, 1).onChange((input) => {
            material.opacity = input.getValue();
            this.updateTransparent();
        }));
        metalness.add(new flow_module_1.SliderInput(material.metalness, 0, 1).onChange((input) => {
            material.metalness = input.getValue();
        }));
        roughness.add(new flow_module_1.SliderInput(material.roughness, 0, 1).onChange((input) => {
            material.roughness = input.getValue();
        }));
        color.onConnect(() => this.update(), true);
        opacity.onConnect(() => this.update(), true);
        metalness.onConnect(() => this.update(), true);
        roughness.onConnect(() => this.update(), true);
        emissive.onConnect(() => this.update(), true);
        normal.onConnect(() => this.update(), true);
        position.onConnect(() => this.update(), true);
        this.add(color).add(opacity).add(metalness).add(roughness).add(emissive).add(normal).add(position);
        this.color = color;
        this.opacity = opacity;
        this.metalness = metalness;
        this.roughness = roughness;
        this.emissive = emissive;
        this.normal = normal;
        this.position = position;
        this.material = material;
        this.update();
    }
    update() {
        const { material, color, opacity, emissive, roughness, metalness, normal, position } = this;
        color.setEnabledInputs(!color.getLinkedObject());
        opacity.setEnabledInputs(!opacity.getLinkedObject());
        roughness.setEnabledInputs(!roughness.getLinkedObject());
        metalness.setEnabledInputs(!metalness.getLinkedObject());
        material.colorNode = color.getLinkedObject();
        material.opacityNode = opacity.getLinkedObject();
        material.metalnessNode = metalness.getLinkedObject();
        material.roughnessNode = roughness.getLinkedObject();
        material.emissiveNode = emissive.getLinkedObject();
        material.normalNode = normal.getLinkedObject();
        material.positionNode = position.getLinkedObject();
        material.dispose();
        this.updateTransparent();
        // TODO: Fix on NodeMaterial System
        material.customProgramCacheKey = () => {
            return THREE.MathUtils.generateUUID();
        };
    }
    updateTransparent() {
        const { material, opacity } = this;
        material.transparent = opacity.getLinkedObject() || material.opacity < 1 ? true : false;
        opacity.setIcon(material.transparent ? 'ti ti-layers-intersect' : 'ti ti-layers-subtract');
    }
}
exports.StandardMaterialEditor = StandardMaterialEditor;
