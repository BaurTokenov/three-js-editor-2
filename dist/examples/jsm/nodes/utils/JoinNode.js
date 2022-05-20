"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = __importDefault(require("../core/Node"));
class JoinNode extends Node_1.default {
    constructor(nodes = []) {
        super();
        this.nodes = nodes;
    }
    getNodeType(builder) {
        return builder.getTypeFromLength(this.nodes.reduce((count, cur) => count + builder.getTypeLength(cur.getNodeType(builder)), 0));
    }
    generate(builder) {
        const type = this.getNodeType(builder);
        const nodes = this.nodes;
        const snippetValues = [];
        for (let i = 0; i < nodes.length; i += 1) {
            const input = nodes[i];
            const inputSnippet = input.build(builder);
            snippetValues.push(inputSnippet);
        }
        return `${builder.getType(type)}( ${snippetValues.join(', ')} )`;
    }
}
exports.default = JoinNode;
