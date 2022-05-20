"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InputNode_1 = __importDefault(require("./InputNode"));
class ConstNode extends InputNode_1.default {
    generateConst(builder) {
        return builder.getConst(this.getNodeType(builder), this.value);
    }
    generate(builder, output) {
        const type = this.getNodeType(builder);
        return builder.format(this.generateConst(builder), type, output);
    }
}
ConstNode.prototype.isConstNode = true;
exports.default = ConstNode;
