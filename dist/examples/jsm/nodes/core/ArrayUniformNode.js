"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UniformNode_1 = __importDefault(require("./UniformNode"));
class ArrayUniformNode extends UniformNode_1.default {
    constructor(nodes = []) {
        super();
        this.nodes = nodes;
    }
    getNodeType(builder) {
        return this.nodes[0].getNodeType(builder);
    }
}
ArrayUniformNode.prototype.isArrayUniformNode = true;
exports.default = ArrayUniformNode;
