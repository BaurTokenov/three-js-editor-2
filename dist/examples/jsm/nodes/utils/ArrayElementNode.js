"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = __importDefault(require("../core/Node"));
class ArrayElementNode extends Node_1.default {
    constructor(node, indexNode) {
        super();
        this.node = node;
        this.indexNode = indexNode;
    }
    getNodeType(builder) {
        return this.node.getNodeType(builder);
    }
    generate(builder) {
        const nodeSnippet = this.node.build(builder);
        const indexSnippet = this.indexNode.build(builder, 'uint');
        return `${nodeSnippet}[ ${indexSnippet} ]`;
    }
}
exports.default = ArrayElementNode;
