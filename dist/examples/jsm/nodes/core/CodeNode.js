"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = __importDefault(require("./Node"));
class CodeNode extends Node_1.default {
    constructor(code = '', nodeType = 'code') {
        super(nodeType);
        this.code = code;
        this._includes = [];
    }
    setIncludes(includes) {
        this._includes = includes;
        return this;
    }
    getIncludes( /*builder*/) {
        return this._includes;
    }
    generate(builder) {
        const includes = this.getIncludes(builder);
        for (const include of includes) {
            include.build(builder);
        }
        const nodeCode = builder.getCodeFromNode(this, this.getNodeType(builder));
        nodeCode.code = this.code;
        return nodeCode.code;
    }
}
CodeNode.prototype.isCodeNode = true;
exports.default = CodeNode;
