"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InputNode_1 = __importDefault(require("./InputNode"));
class UniformNode extends InputNode_1.default {
    getUniformHash(builder) {
        return this.getHash(builder);
    }
    generate(builder, output) {
        const type = this.getNodeType(builder);
        const hash = this.getUniformHash(builder);
        let sharedNode = builder.getNodeFromHash(hash);
        if (sharedNode === undefined) {
            builder.setHashNode(this, hash);
            sharedNode = this;
        }
        const sharedNodeType = sharedNode.getInputType(builder);
        const nodeUniform = builder.getUniformFromNode(sharedNode, builder.shaderStage, sharedNodeType);
        const propertyName = builder.getPropertyName(nodeUniform);
        return builder.format(propertyName, type, output);
    }
}
UniformNode.prototype.isUniformNode = true;
exports.default = UniformNode;
