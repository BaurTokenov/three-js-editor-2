"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ShaderNodeBaseElements_1 = require("../../shadernode/ShaderNodeBaseElements");
// Moving Frostbite to Physically Based Rendering 3.0 - page 12, listing 2
// https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
const V_GGX_SmithCorrelated = new ShaderNodeBaseElements_1.ShaderNode((inputs) => {
    const { alpha, dotNL, dotNV } = inputs;
    const a2 = ShaderNodeBaseElements_1.pow2(alpha);
    const gv = ShaderNodeBaseElements_1.mul(dotNL, ShaderNodeBaseElements_1.sqrt(ShaderNodeBaseElements_1.add(a2, ShaderNodeBaseElements_1.mul(ShaderNodeBaseElements_1.sub(1.0, a2), ShaderNodeBaseElements_1.pow2(dotNV)))));
    const gl = ShaderNodeBaseElements_1.mul(dotNV, ShaderNodeBaseElements_1.sqrt(ShaderNodeBaseElements_1.add(a2, ShaderNodeBaseElements_1.mul(ShaderNodeBaseElements_1.sub(1.0, a2), ShaderNodeBaseElements_1.pow2(dotNL)))));
    return ShaderNodeBaseElements_1.div(0.5, ShaderNodeBaseElements_1.max(ShaderNodeBaseElements_1.add(gv, gl), ShaderNodeBaseElements_1.EPSILON));
}); // validated
exports.default = V_GGX_SmithCorrelated;
