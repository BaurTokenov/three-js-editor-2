"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = __importDefault(require("../core/Node"));
const ShaderNodeBaseElements_1 = require("../shadernode/ShaderNodeBaseElements");
const checkerShaderNode = new ShaderNodeBaseElements_1.ShaderNode((inputs) => {
    const uv = ShaderNodeBaseElements_1.mul(inputs.uv, 2.0);
    const cx = ShaderNodeBaseElements_1.floor(uv.x);
    const cy = ShaderNodeBaseElements_1.floor(uv.y);
    const result = ShaderNodeBaseElements_1.mod(ShaderNodeBaseElements_1.add(cx, cy), 2.0);
    return ShaderNodeBaseElements_1.sign(result);
});
class CheckerNode extends Node_1.default {
    constructor(uvNode = ShaderNodeBaseElements_1.uv()) {
        super('float');
        this.uvNode = uvNode;
    }
    generate(builder) {
        return checkerShaderNode.call({ uv: this.uvNode }).build(builder);
    }
}
exports.default = CheckerNode;
