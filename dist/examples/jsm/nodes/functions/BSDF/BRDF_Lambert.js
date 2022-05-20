"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ShaderNodeBaseElements_1 = require("../../shadernode/ShaderNodeBaseElements");
const BRDF_Lambert = new ShaderNodeBaseElements_1.ShaderNode((inputs) => {
    return ShaderNodeBaseElements_1.mul(1 / Math.PI, inputs.diffuseColor); // punctual light
}); // validated
exports.default = BRDF_Lambert;
