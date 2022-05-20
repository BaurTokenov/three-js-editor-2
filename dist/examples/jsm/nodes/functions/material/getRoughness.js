"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getGeometryRoughness_1 = __importDefault(require("./getGeometryRoughness"));
const ShaderNodeBaseElements_1 = require("../../shadernode/ShaderNodeBaseElements");
const getRoughness = new ShaderNodeBaseElements_1.ShaderNode((inputs) => {
    const { roughness } = inputs;
    const geometryRoughness = getGeometryRoughness_1.default.call();
    let roughnessFactor = ShaderNodeBaseElements_1.max(roughness, 0.0525); // 0.0525 corresponds to the base mip of a 256 cubemap.
    roughnessFactor = ShaderNodeBaseElements_1.add(roughnessFactor, geometryRoughness);
    roughnessFactor = ShaderNodeBaseElements_1.min(roughnessFactor, 1.0);
    return roughnessFactor;
});
exports.default = getRoughness;
