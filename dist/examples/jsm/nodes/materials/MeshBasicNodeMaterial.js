"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NodeMaterial_1 = __importDefault(require("./NodeMaterial"));
const three_1 = require("three");
const defaultValues = new three_1.MeshBasicMaterial();
class MeshBasicNodeMaterial extends NodeMaterial_1.default {
    constructor(parameters) {
        super();
        this.lights = true;
        this.colorNode = null;
        this.opacityNode = null;
        this.alphaTestNode = null;
        this.lightNode = null;
        this.positionNode = null;
        this.setDefaultValues(defaultValues);
        this.setValues(parameters);
    }
    copy(source) {
        this.colorNode = source.colorNode;
        this.opacityNode = source.opacityNode;
        this.alphaTestNode = source.alphaTestNode;
        this.lightNode = source.lightNode;
        this.positionNode = source.positionNode;
        return super.copy(source);
    }
}
MeshBasicNodeMaterial.prototype.isMeshBasicNodeMaterial = true;
exports.default = MeshBasicNodeMaterial;
