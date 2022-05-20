"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UniformNode_1 = __importDefault(require("../core/UniformNode"));
class BufferNode extends UniformNode_1.default {
    constructor(value, bufferType, bufferCount = 0) {
        super(value, bufferType);
        this.bufferType = bufferType;
        this.bufferCount = bufferCount;
    }
    getInputType( /*builder*/) {
        return 'buffer';
    }
}
BufferNode.prototype.isBufferNode = true;
exports.default = BufferNode;
