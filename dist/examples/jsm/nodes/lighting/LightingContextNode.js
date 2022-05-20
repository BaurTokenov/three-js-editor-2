"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ContextNode_1 = __importDefault(require("../core/ContextNode"));
const ShaderNodeBaseElements_1 = require("../shadernode/ShaderNodeBaseElements");
class LightingContextNode extends ContextNode_1.default {
    constructor(node, lightingModelNode = null) {
        super(node);
        this.lightingModelNode = lightingModelNode;
    }
    getNodeType( /*builder*/) {
        return 'vec3';
    }
    generate(builder) {
        const { context, lightingModelNode } = this;
        if (context.reflectedLight === undefined) {
            const directDiffuse = ShaderNodeBaseElements_1.temp(ShaderNodeBaseElements_1.vec3()), directSpecular = ShaderNodeBaseElements_1.temp(ShaderNodeBaseElements_1.vec3()), indirectDiffuse = ShaderNodeBaseElements_1.temp(ShaderNodeBaseElements_1.vec3()), indirectSpecular = ShaderNodeBaseElements_1.temp(ShaderNodeBaseElements_1.vec3());
            context.reflectedLight = {
                directDiffuse,
                directSpecular,
                indirectDiffuse,
                indirectSpecular,
                total: ShaderNodeBaseElements_1.add(directDiffuse, directSpecular, indirectDiffuse, indirectSpecular),
            };
            context.radiance = ShaderNodeBaseElements_1.temp(ShaderNodeBaseElements_1.vec3());
            context.irradiance = ShaderNodeBaseElements_1.temp(ShaderNodeBaseElements_1.vec3());
            context.iblIrradiance = ShaderNodeBaseElements_1.temp(ShaderNodeBaseElements_1.vec3());
            context.ambientOcclusion = ShaderNodeBaseElements_1.temp(ShaderNodeBaseElements_1.float(1));
        }
        context.lightingModelNode = lightingModelNode || context.lightingModelNode;
        const type = this.getNodeType(builder);
        super.generate(builder, type);
        if (lightingModelNode === null || lightingModelNode === void 0 ? void 0 : lightingModelNode.indirectDiffuse)
            lightingModelNode.indirectDiffuse.call(context);
        if (lightingModelNode === null || lightingModelNode === void 0 ? void 0 : lightingModelNode.indirectSpecular)
            lightingModelNode.indirectSpecular.call(context);
        if (lightingModelNode === null || lightingModelNode === void 0 ? void 0 : lightingModelNode.ambientOcclusion)
            lightingModelNode.ambientOcclusion.call(context);
        return context.reflectedLight.total.build(builder, type);
    }
}
exports.default = LightingContextNode;
