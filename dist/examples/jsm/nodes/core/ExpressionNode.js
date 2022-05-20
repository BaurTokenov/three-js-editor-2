"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TempNode_1 = __importDefault(require("./TempNode"));
class ExpressionNode extends TempNode_1.default {
    constructor(snipped = '', nodeType = 'void') {
        super(nodeType);
        this.snipped = snipped;
    }
    generate(builder) {
        const type = this.getNodeType(builder);
        const snipped = this.snipped;
        if (type === 'void') {
            builder.addFlowCode(snipped);
        }
        else {
            return `( ${snipped} )`;
        }
    }
}
exports.default = ExpressionNode;
