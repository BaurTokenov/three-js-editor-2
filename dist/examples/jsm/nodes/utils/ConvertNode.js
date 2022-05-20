"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = __importDefault(require("../core/Node"));
class ConvertNode extends Node_1.default {
    constructor(node, convertTo) {
        super();
        this.node = node;
        this.convertTo = convertTo;
    }
    getNodeType( /*builder*/) {
        return this.convertTo;
    }
    generate(builder) {
        const convertTo = this.convertTo;
        const node = this.node;
        if (builder.isReference(convertTo) === false) {
            const nodeSnippet = node.build(builder, convertTo);
            return builder.format(nodeSnippet, this.getNodeType(builder), convertTo);
        }
        else {
            return node.build(builder, convertTo);
        }
    }
}
exports.default = ConvertNode;
