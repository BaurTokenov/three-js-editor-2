"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ShaderNodeBaseElements_1 = require("../../shadernode/ShaderNodeBaseElements");
// Microfacet Models for Refraction through Rough Surfaces - equation (33)
// http://graphicrants.blogspot.com/2013/08/specular-brdf-reference.html
// alpha is "roughness squared" in Disney’s reparameterization
const D_GGX = new ShaderNodeBaseElements_1.ShaderNode((inputs) => {
    const { alpha, dotNH } = inputs;
    const a2 = ShaderNodeBaseElements_1.pow2(alpha);
    const denom = ShaderNodeBaseElements_1.add(ShaderNodeBaseElements_1.mul(ShaderNodeBaseElements_1.pow2(dotNH), ShaderNodeBaseElements_1.sub(a2, 1.0)), 1.0); // avoid alpha = 0 with dotNH = 1
    return ShaderNodeBaseElements_1.mul(1 / Math.PI, ShaderNodeBaseElements_1.div(a2, ShaderNodeBaseElements_1.pow2(denom)));
}); // validated
exports.default = D_GGX;
