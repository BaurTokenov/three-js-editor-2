"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = __importDefault(require("./Node"));
class PropertyNode extends Node_1.default {
    constructor(name = null, nodeType = 'vec4') {
        super(nodeType);
        this.name = name;
    }
    getHash(builder) {
        return this.name || super.getHash(builder);
    }
    generate(builder) {
        const nodeVary = builder.getVarFromNode(this, this.getNodeType(builder));
        const name = this.name;
        if (name !== null) {
            nodeVary.name = name;
        }
        return builder.getPropertyName(nodeVary);
    }
}
exports.default = PropertyNode;
