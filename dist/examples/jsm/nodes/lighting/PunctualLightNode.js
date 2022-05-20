"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AnalyticLightNode_1 = __importDefault(require("./AnalyticLightNode"));
const LightsNode_1 = __importDefault(require("./LightsNode"));
const Object3DNode_1 = __importDefault(require("../accessors/Object3DNode"));
const getDistanceAttenuation_1 = __importDefault(require("../functions/light/getDistanceAttenuation"));
const ShaderNodeElements_1 = require("../shadernode/ShaderNodeElements");
const three_1 = require("three");
class PunctualLightNode extends AnalyticLightNode_1.default {
    constructor(light = null) {
        super(light);
        this.cutoffDistanceNode = ShaderNodeElements_1.uniform(0);
        this.decayExponentNode = ShaderNodeElements_1.uniform(0);
    }
    update(frame) {
        const { light } = this;
        super.update(frame);
        this.cutoffDistanceNode.value = light.distance;
        this.decayExponentNode.value = light.decay;
    }
    generate(builder) {
        const { colorNode, cutoffDistanceNode, decayExponentNode } = this;
        const lightPositionViewNode = new Object3DNode_1.default(Object3DNode_1.default.VIEW_POSITION, this.light);
        const lVector = ShaderNodeElements_1.sub(lightPositionViewNode, ShaderNodeElements_1.positionView);
        const lightDirection = ShaderNodeElements_1.normalize(lVector);
        const lightDistance = ShaderNodeElements_1.length(lVector);
        const lightAttenuation = getDistanceAttenuation_1.default.call({
            lightDistance,
            cutoffDistance: cutoffDistanceNode,
            decayExponent: decayExponentNode,
        });
        const lightColor = ShaderNodeElements_1.mul(colorNode, lightAttenuation);
        const lightingModelFunctionNode = builder.context.lightingModelNode;
        const reflectedLight = builder.context.reflectedLight;
        if (lightingModelFunctionNode === null || lightingModelFunctionNode === void 0 ? void 0 : lightingModelFunctionNode.direct) {
            lightingModelFunctionNode.direct.call({
                lightDirection,
                lightColor,
                reflectedLight,
            }, builder);
        }
    }
}
LightsNode_1.default.setReference(three_1.PointLight, PunctualLightNode);
exports.default = PunctualLightNode;
