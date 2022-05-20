"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = __importDefault(require("./Node"));
const constants_1 = require("./constants");
class VaryNode extends Node_1.default {
    constructor(node, name = null) {
        super();
        this.node = node;
        this.name = name;
    }
    getHash(builder) {
        return this.name || super.getHash(builder);
    }
    getNodeType(builder) {
        // VaryNode is auto type
        return this.node.getNodeType(builder);
    }
    generate(builder) {
        const type = this.getNodeType(builder);
        const node = this.node;
        const name = this.name;
        const nodeVary = builder.getVaryFromNode(this, type);
        if (name !== null) {
            nodeVary.name = name;
        }
        const propertyName = builder.getPropertyName(nodeVary, constants_1.NodeShaderStage.Vertex);
        // force node run in vertex stage
        builder.flowNodeFromShaderStage(constants_1.NodeShaderStage.Vertex, node, type, propertyName);
        return builder.getPropertyName(nodeVary);
    }
}
exports.default = VaryNode;
