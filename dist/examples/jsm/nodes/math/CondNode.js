"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = __importDefault(require("../core/Node"));
const PropertyNode_1 = __importDefault(require("../core/PropertyNode"));
const ContextNode_1 = __importDefault(require("../core/ContextNode"));
class CondNode extends Node_1.default {
    constructor(condNode, ifNode, elseNode) {
        super();
        this.condNode = condNode;
        this.ifNode = ifNode;
        this.elseNode = elseNode;
    }
    getNodeType(builder) {
        const ifType = this.ifNode.getNodeType(builder);
        const elseType = this.elseNode.getNodeType(builder);
        if (builder.getTypeLength(elseType) > builder.getTypeLength(ifType)) {
            return elseType;
        }
        return ifType;
    }
    generate(builder) {
        const type = this.getNodeType(builder);
        const context = { tempWrite: false };
        const nodeProperty = new PropertyNode_1.default(null, type).build(builder);
        const nodeSnippet = new ContextNode_1.default(this.condNode /*, context*/).build(builder, 'bool'), ifSnippet = new ContextNode_1.default(this.ifNode, context).build(builder, type), elseSnippet = new ContextNode_1.default(this.elseNode, context).build(builder, type);
        builder.addFlowCode(`if ( ${nodeSnippet} ) {

\t\t${nodeProperty} = ${ifSnippet};

\t} else {

\t\t${nodeProperty} = ${elseSnippet};

\t}`);
        return nodeProperty;
    }
}
exports.default = CondNode;
