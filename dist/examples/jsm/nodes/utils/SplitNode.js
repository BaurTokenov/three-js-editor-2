"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = __importDefault(require("../core/Node"));
const NodeBuilder_1 = require("../core/NodeBuilder");
class SplitNode extends Node_1.default {
    constructor(node, components = 'x') {
        super();
        this.node = node;
        this.components = components;
    }
    getVectorLength() {
        let vectorLength = this.components.length;
        for (const c of this.components) {
            vectorLength = Math.max(NodeBuilder_1.vector.indexOf(c) + 1, vectorLength);
        }
        return vectorLength;
    }
    getNodeType(builder) {
        return builder.getTypeFromLength(this.components.length);
    }
    generate(builder) {
        const node = this.node;
        const nodeTypeLength = builder.getTypeLength(node.getNodeType(builder));
        if (nodeTypeLength > 1) {
            let type = null;
            const componentsLength = this.getVectorLength();
            if (componentsLength >= nodeTypeLength) {
                // need expand the input node
                type = builder.getTypeFromLength(this.getVectorLength());
            }
            const nodeSnippet = node.build(builder, type);
            return `${nodeSnippet}.${this.components}`;
        }
        else {
            // ignore components if node is a float
            return node.build(builder);
        }
    }
    serialize(data) {
        super.serialize(data);
        data.components = this.components;
    }
    deserialize(data) {
        super.deserialize(data);
        this.components = data.components;
    }
}
exports.default = SplitNode;
