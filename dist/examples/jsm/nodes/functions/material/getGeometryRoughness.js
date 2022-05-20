"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ShaderNodeBaseElements_1 = require("../../shadernode/ShaderNodeBaseElements");
const getGeometryRoughness = new ShaderNodeBaseElements_1.ShaderNode(() => {
    const dxy = ShaderNodeBaseElements_1.max(ShaderNodeBaseElements_1.abs(ShaderNodeBaseElements_1.dFdx(ShaderNodeBaseElements_1.normalGeometry)), ShaderNodeBaseElements_1.abs(ShaderNodeBaseElements_1.dFdy(ShaderNodeBaseElements_1.normalGeometry)));
    const geometryRoughness = ShaderNodeBaseElements_1.max(ShaderNodeBaseElements_1.max(dxy.x, dxy.y), dxy.z);
    return geometryRoughness;
});
exports.default = getGeometryRoughness;
