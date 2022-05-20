"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = __importDefault(require("./Node"));
class BypassNode extends Node_1.default {
    constructor(returnNode, callNode) {
        super();
        this.outputNode = returnNode;
        this.callNode = callNode;
    }
    getNodeType(builder) {
        return this.outputNode.getNodeType(builder);
    }
    generate(builder, output) {
        const snippet = this.callNode.build(builder, 'void');
        if (snippet !== '') {
            builder.addFlowCode(snippet);
        }
        return this.outputNode.build(builder, output);
    }
}
BypassNode.prototype.isBypassNode = true;
exports.default = BypassNode;
