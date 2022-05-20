"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ShaderNodeBaseElements_1 = require("../../shadernode/ShaderNodeBaseElements");
const F_Schlick = new ShaderNodeBaseElements_1.ShaderNode((inputs) => {
    const { f0, f90, dotVH } = inputs;
    // Original approximation by Christophe Schlick '94
    // float fresnel = pow( 1.0 - dotVH, 5.0 );
    // Optimized variant (presented by Epic at SIGGRAPH '13)
    // https://cdn2.unrealengine.com/Resources/files/2013SiggraphPresentationsNotes-26915738.pdf
    const fresnel = ShaderNodeBaseElements_1.exp2(ShaderNodeBaseElements_1.mul(ShaderNodeBaseElements_1.sub(ShaderNodeBaseElements_1.mul(-5.55473, dotVH), 6.98316), dotVH));
    return ShaderNodeBaseElements_1.add(ShaderNodeBaseElements_1.mul(f0, ShaderNodeBaseElements_1.sub(1.0, fresnel)), ShaderNodeBaseElements_1.mul(f90, fresnel));
}); // validated
exports.default = F_Schlick;
