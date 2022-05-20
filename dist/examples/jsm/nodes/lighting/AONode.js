"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LightingNode_1 = __importDefault(require("./LightingNode"));
const ShaderNodeElements_1 = require("../shadernode/ShaderNodeElements");
class AONode extends LightingNode_1.default {
    constructor(aoNode = null) {
        super();
        this.aoNode = aoNode;
    }
    generate(builder) {
        const aoIntensity = 1;
        const aoNode = ShaderNodeElements_1.add(ShaderNodeElements_1.mul(ShaderNodeElements_1.sub(ShaderNodeElements_1.float(this.aoNode), 1.0), aoIntensity), 1.0);
        builder.context.ambientOcclusion.mul(aoNode);
    }
}
exports.default = AONode;
