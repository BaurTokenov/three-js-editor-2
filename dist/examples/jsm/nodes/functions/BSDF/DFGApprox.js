"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ShaderNodeElements_1 = require("../../shadernode/ShaderNodeElements");
// Analytical approximation of the DFG LUT, one half of the
// split-sum approximation used in indirect specular lighting.
// via 'environmentBRDF' from "Physically Based Shading on Mobile"
// https://www.unrealengine.com/blog/physically-based-shading-on-mobile
const DFGApprox = new ShaderNodeElements_1.ShaderNode((inputs) => {
    const { roughness } = inputs;
    const c0 = ShaderNodeElements_1.vec4(-1, -0.0275, -0.572, 0.022);
    const c1 = ShaderNodeElements_1.vec4(1, 0.0425, 1.04, -0.04);
    const r = ShaderNodeElements_1.add(ShaderNodeElements_1.mul(roughness, c0), c1);
    const a004 = ShaderNodeElements_1.add(ShaderNodeElements_1.mul(ShaderNodeElements_1.min(ShaderNodeElements_1.mul(r.x, r.x), ShaderNodeElements_1.exp2(ShaderNodeElements_1.mul(-9.28, ShaderNodeElements_1.dotNV))), r.x), r.y);
    const fab = ShaderNodeElements_1.add(ShaderNodeElements_1.mul(ShaderNodeElements_1.vec2(-1.04, 1.04), a004), r.zw);
    return fab;
});
exports.default = DFGApprox;
