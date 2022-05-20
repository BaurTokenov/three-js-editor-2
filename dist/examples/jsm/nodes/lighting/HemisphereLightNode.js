"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AnalyticLightNode_1 = __importDefault(require("./AnalyticLightNode"));
const LightsNode_1 = __importDefault(require("./LightsNode"));
const Object3DNode_1 = __importDefault(require("../accessors/Object3DNode"));
const ShaderNodeElements_1 = require("../shadernode/ShaderNodeElements");
const three_1 = require("three");
class HemisphereLightNode extends AnalyticLightNode_1.default {
    constructor(light = null) {
        super(light);
        this.lightPositionNode = new Object3DNode_1.default(Object3DNode_1.default.POSITION);
        this.lightDirectionNode = ShaderNodeElements_1.normalize(this.lightPositionNode);
        this.groundColorNode = ShaderNodeElements_1.uniform(new three_1.Color());
    }
    update(frame) {
        const { light } = this;
        super.update(frame);
        this.lightPositionNode.object3d = light;
        this.groundColorNode.value.copy(light.groundColor).multiplyScalar(light.intensity);
    }
    generate(builder) {
        const { colorNode, groundColorNode, lightDirectionNode } = this;
        const dotNL = ShaderNodeElements_1.dot(ShaderNodeElements_1.normalView, lightDirectionNode);
        const hemiDiffuseWeight = ShaderNodeElements_1.add(ShaderNodeElements_1.mul(0.5, dotNL), 0.5);
        const irradiance = ShaderNodeElements_1.mix(groundColorNode, colorNode, hemiDiffuseWeight);
        builder.context.irradiance.add(irradiance);
    }
}
LightsNode_1.default.setReference(three_1.HemisphereLight, HemisphereLightNode);
exports.default = HemisphereLightNode;
