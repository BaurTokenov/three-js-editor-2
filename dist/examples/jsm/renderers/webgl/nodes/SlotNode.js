"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = __importDefault(require("three-nodes/core/Node"));
class SlotNode extends Node_1.default {
    constructor(node, name, nodeType) {
        super(nodeType);
        this.node = node;
        this.name = name;
    }
    generate(builder) {
        return this.node.build(builder, this.getNodeType(builder));
    }
}
exports.default = SlotNode;
