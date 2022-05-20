"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TempNode_1 = __importDefault(require("../core/TempNode"));
const ShaderNodeBaseElements_1 = require("../shadernode/ShaderNodeBaseElements");
class MatcapUVNode extends TempNode_1.default {
    constructor() {
        super('vec2');
    }
    generate(builder) {
        const x = ShaderNodeBaseElements_1.normalize(ShaderNodeBaseElements_1.vec3(ShaderNodeBaseElements_1.positionViewDirection.z, 0, ShaderNodeBaseElements_1.negate(ShaderNodeBaseElements_1.positionViewDirection.x)));
        const y = ShaderNodeBaseElements_1.cross(ShaderNodeBaseElements_1.positionViewDirection, x);
        const uv = ShaderNodeBaseElements_1.add(ShaderNodeBaseElements_1.mul(ShaderNodeBaseElements_1.vec2(ShaderNodeBaseElements_1.dot(x, ShaderNodeBaseElements_1.transformedNormalView), ShaderNodeBaseElements_1.dot(y, ShaderNodeBaseElements_1.transformedNormalView)), 0.495), 0.5);
        return uv.build(builder, this.getNodeType(builder));
    }
}
exports.default = MatcapUVNode;
