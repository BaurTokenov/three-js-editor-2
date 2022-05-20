"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const WebGPUBuffer_1 = __importDefault(require("./WebGPUBuffer"));
const constants_1 = require("./constants");
class WebGPUUniformBuffer extends WebGPUBuffer_1.default {
    constructor(name, buffer = null) {
        super(name, constants_1.GPUBindingType.UniformBuffer, buffer);
        this.usage |= GPUBufferUsage.UNIFORM;
    }
}
WebGPUUniformBuffer.prototype.isUniformBuffer = true;
exports.default = WebGPUUniformBuffer;
