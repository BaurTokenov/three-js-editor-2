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
exports.PointsMaterialEditor = void 0;
const flow_module_1 = require("../../libs/flow.module");
const BaseNode_1 = require("../core/BaseNode");
const Nodes_1 = require("three-nodes/Nodes");
const THREE = __importStar(require("three"));
class PointsMaterialEditor extends BaseNode_1.BaseNode {
    constructor() {
        const material = new Nodes_1.PointsNodeMaterial();
        super('Points Material', 1, material);
        this.setWidth(300);
        const color = new flow_module_1.LabelElement('color').setInput(3);
        const opacity = new flow_module_1.LabelElement('opacity').setInput(1);
        const size = new flow_module_1.LabelElement('size').setInput(1);
        const position = new flow_module_1.LabelElement('position').setInput(3);
        const sizeAttenuation = new flow_module_1.LabelElement('Size Attenuation');
        color.add(new flow_module_1.ColorInput(material.color.getHex()).onChange((input) => {
            material.color.setHex(input.getValue());
        }));
        opacity.add(new flow_module_1.SliderInput(material.opacity, 0, 1).onChange((input) => {
            material.opacity = input.getValue();
            this.updateTransparent();
        }));
        sizeAttenuation.add(new flow_module_1.ToggleInput(material.sizeAttenuation).onClick((input) => {
            material.sizeAttenuation = input.getValue();
            material.dispose();
        }));
        color.onConnect(() => this.update(), true);
        opacity.onConnect(() => this.update(), true);
        size.onConnect(() => this.update(), true);
        position.onConnect(() => this.update(), true);
        this.add(color).add(opacity).add(size).add(position).add(sizeAttenuation);
        this.color = color;
        this.opacity = opacity;
        this.size = size;
        this.position = position;
        this.sizeAttenuation = sizeAttenuation;
        this.material = material;
        this.update();
    }
    update() {
        const { material, color, opacity, size, position } = this;
        color.setEnabledInputs(!color.getLinkedObject());
        opacity.setEnabledInputs(!opacity.getLinkedObject());
        material.colorNode = color.getLinkedObject();
        material.opacityNode = opacity.getLinkedObject() || null;
        material.sizeNode = size.getLinkedObject() || null;
        material.positionNode = position.getLinkedObject() || null;
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
exports.PointsMaterialEditor = PointsMaterialEditor;
