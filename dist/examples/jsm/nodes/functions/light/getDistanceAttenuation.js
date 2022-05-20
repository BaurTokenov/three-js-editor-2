"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ShaderNodeBaseElements_1 = require("../../shadernode/ShaderNodeBaseElements");
const getDistanceAttenuation = new ShaderNodeBaseElements_1.ShaderNode((inputs) => {
    const { lightDistance, cutoffDistance, decayExponent } = inputs;
    // based upon Frostbite 3 Moving to Physically-based Rendering
    // page 32, equation 26: E[window1]
    // https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
    const distanceFalloff = ShaderNodeBaseElements_1.div(1.0, ShaderNodeBaseElements_1.max(ShaderNodeBaseElements_1.pow(lightDistance, decayExponent), 0.01));
    return ShaderNodeBaseElements_1.cond(ShaderNodeBaseElements_1.greaterThan(cutoffDistance, 0), ShaderNodeBaseElements_1.mul(distanceFalloff, ShaderNodeBaseElements_1.pow2(ShaderNodeBaseElements_1.saturate(ShaderNodeBaseElements_1.sub(1.0, ShaderNodeBaseElements_1.pow4(ShaderNodeBaseElements_1.div(lightDistance, cutoffDistance)))))), distanceFalloff);
}); // validated
exports.default = getDistanceAttenuation;
