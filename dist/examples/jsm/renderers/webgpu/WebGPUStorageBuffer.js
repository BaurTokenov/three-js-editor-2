"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const WebGPUBuffer_1 = __importDefault(require("./WebGPUBuffer"));
const constants_1 = require("./constants");
class WebGPUStorageBuffer extends WebGPUBuffer_1.default {
    constructor(name, attribute) {
        super(name, constants_1.GPUBindingType.StorageBuffer, attribute.array);
        this.usage |= GPUBufferUsage.VERTEX | GPUBufferUsage.STORAGE;
        this.attribute = attribute;
    }
}
WebGPUStorageBuffer.prototype.isStorageBuffer = true;
exports.default = WebGPUStorageBuffer;
