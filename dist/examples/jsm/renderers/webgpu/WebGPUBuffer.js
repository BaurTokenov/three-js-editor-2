"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const WebGPUBinding_1 = __importDefault(require("./WebGPUBinding"));
const WebGPUBufferUtils_1 = require("./WebGPUBufferUtils");
class WebGPUBuffer extends WebGPUBinding_1.default {
    constructor(name, type, buffer = null) {
        super(name);
        this.bytesPerElement = Float32Array.BYTES_PER_ELEMENT;
        this.type = type;
        this.visibility = GPUShaderStage.VERTEX;
        this.usage = GPUBufferUsage.COPY_DST;
        this.buffer = buffer;
        this.bufferGPU = null; // set by the renderer
    }
    getByteLength() {
        return WebGPUBufferUtils_1.getFloatLength(this.buffer.byteLength);
    }
    getBuffer() {
        return this.buffer;
    }
    update() {
        return true;
    }
}
WebGPUBuffer.prototype.isBuffer = true;
exports.default = WebGPUBuffer;
