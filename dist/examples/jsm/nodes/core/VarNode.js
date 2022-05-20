"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = __importDefault(require("./Node"));
const OperatorNode_1 = __importDefault(require("../math/OperatorNode"));
class VarNode extends Node_1.default {
    constructor(node, name = null) {
        super();
        this.node = node;
        this.name = name;
    }
    op(op, ...params) {
        this.node = new OperatorNode_1.default(op, this.node, ...params);
        return this;
    }
    assign(...params) {
        return this.op('=', ...params);
    }
    add(...params) {
        return this.op('+', ...params);
    }
    sub(...params) {
        return this.op('-', ...params);
    }
    mul(...params) {
        return this.op('*', ...params);
    }
    div(...params) {
        return this.op('/', ...params);
    }
    getHash(builder) {
        return this.name || super.getHash(builder);
    }
    getNodeType(builder) {
        return this.node.getNodeType(builder);
    }
    generate(builder) {
        const node = this.node;
        const name = this.name;
        if (name === null && node.isTempNode === true) {
            return node.build(builder);
        }
        const type = builder.getVectorType(this.getNodeType(builder));
        const snippet = node.build(builder, type);
        const nodeVar = builder.getVarFromNode(this, type);
        if (name !== null) {
            nodeVar.name = name;
        }
        const propertyName = builder.getPropertyName(nodeVar);
        builder.addFlowCode(`${propertyName} = ${snippet}`);
        return propertyName;
    }
}
exports.default = VarNode;
