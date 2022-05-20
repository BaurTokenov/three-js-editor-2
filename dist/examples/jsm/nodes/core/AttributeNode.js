"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = __importDefault(require("./Node"));
const VaryNode_1 = __importDefault(require("./VaryNode"));
class AttributeNode extends Node_1.default {
    constructor(attributeName, nodeType = null) {
        super(nodeType);
        this._attributeName = attributeName;
    }
    getHash(builder) {
        return this.getAttributeName(builder);
    }
    getNodeType(builder) {
        let nodeType = super.getNodeType(builder);
        if (nodeType === null) {
            const attributeName = this.getAttributeName(builder);
            const attribute = builder.geometry.getAttribute(attributeName);
            nodeType = builder.getTypeFromLength(attribute.itemSize);
        }
        return nodeType;
    }
    setAttributeName(attributeName) {
        this._attributeName = attributeName;
        return this;
    }
    getAttributeName( /*builder*/) {
        return this._attributeName;
    }
    generate(builder) {
        const attribute = builder.getAttribute(this.getAttributeName(builder), this.getNodeType(builder));
        if (builder.isShaderStage('vertex')) {
            return attribute.name;
        }
        else {
            const nodeVary = new VaryNode_1.default(this);
            return nodeVary.build(builder, attribute.type);
        }
    }
}
exports.default = AttributeNode;
