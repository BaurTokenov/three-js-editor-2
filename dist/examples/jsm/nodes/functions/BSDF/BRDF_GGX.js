"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const F_Schlick_1 = __importDefault(require("./F_Schlick"));
const V_GGX_SmithCorrelated_1 = __importDefault(require("./V_GGX_SmithCorrelated"));
const D_GGX_1 = __importDefault(require("./D_GGX"));
const ShaderNodeBaseElements_1 = require("../../shadernode/ShaderNodeBaseElements");
// GGX Distribution, Schlick Fresnel, GGX_SmithCorrelated Visibility
const BRDF_GGX = new ShaderNodeBaseElements_1.ShaderNode((inputs) => {
    const { lightDirection, f0, f90, roughness } = inputs;
    const alpha = ShaderNodeBaseElements_1.pow2(roughness); // UE4's roughness
    const halfDir = ShaderNodeBaseElements_1.normalize(ShaderNodeBaseElements_1.add(lightDirection, ShaderNodeBaseElements_1.positionViewDirection));
    const dotNL = ShaderNodeBaseElements_1.saturate(ShaderNodeBaseElements_1.dot(ShaderNodeBaseElements_1.transformedNormalView, lightDirection));
    //const dotNV = saturate( dot( transformedNormalView, positionViewDirection ) );
    const dotNH = ShaderNodeBaseElements_1.saturate(ShaderNodeBaseElements_1.dot(ShaderNodeBaseElements_1.transformedNormalView, halfDir));
    const dotVH = ShaderNodeBaseElements_1.saturate(ShaderNodeBaseElements_1.dot(ShaderNodeBaseElements_1.positionViewDirection, halfDir));
    const F = F_Schlick_1.default.call({ f0, f90, dotVH });
    const V = V_GGX_SmithCorrelated_1.default.call({ alpha, dotNL, dotNV: ShaderNodeBaseElements_1.dotNV });
    const D = D_GGX_1.default.call({ alpha, dotNH });
    return ShaderNodeBaseElements_1.mul(F, ShaderNodeBaseElements_1.mul(V, D));
}); // validated
exports.default = BRDF_GGX;
