"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = __importDefault(require("./Node"));
class ContextNode extends Node_1.default {
    constructor(node, context = {}) {
        super();
        this.node = node;
        this.context = context;
    }
    getNodeType(builder) {
        return this.node.getNodeType(builder);
    }
    generate(builder, output) {
        const previousContext = builder.getContext();
        builder.setContext(Object.assign(Object.assign({}, builder.context), this.context));
        const snippet = this.node.build(builder, output);
        builder.setContext(previousContext);
        return snippet;
    }
}
ContextNode.prototype.isContextNode = true;
exports.default = ContextNode;
