"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BufferNode_1 = __importDefault(require("./BufferNode"));
class StorageBufferNode extends BufferNode_1.default {
    constructor(value, bufferType, bufferCount = 0) {
        super(value, bufferType, bufferCount);
    }
    getInputType( /*builder*/) {
        return 'storageBuffer';
    }
}
StorageBufferNode.prototype.isStorageBufferNode = true;
exports.default = StorageBufferNode;
