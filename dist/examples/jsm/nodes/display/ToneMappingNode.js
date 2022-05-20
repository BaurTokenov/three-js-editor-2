"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinearToneMappingNode = void 0;
const Node_1 = __importDefault(require("../core/Node"));
const ShaderNodeBaseElements_1 = require("../shadernode/ShaderNodeBaseElements");
const three_1 = require("three");
// exposure only
exports.LinearToneMappingNode = new ShaderNodeBaseElements_1.ShaderNode(({ color, exposure }) => {
    return ShaderNodeBaseElements_1.mul(color, exposure);
});
class ToneMappingNode extends Node_1.default {
    constructor(toneMapping, exposureNode = ShaderNodeBaseElements_1.float(1), colorNode = null) {
        super('vec3');
        this.toneMapping = toneMapping;
        this.exposureNode = exposureNode;
        this.colorNode = colorNode;
    }
    generate(builder) {
        const type = this.getNodeType(builder);
        const colorNode = this.color || builder.context.color;
        const toneMapping = this.toneMapping;
        const toneMappingParams = { exposure: this.exposureNode, color: colorNode };
        if (toneMapping === three_1.LinearToneMapping) {
            return exports.LinearToneMappingNode.call(toneMappingParams).build(builder, type);
        }
        else {
            return this.colorNode.build(builder, type);
        }
    }
}
exports.default = ToneMappingNode;
