"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const WebGPUBinding_1 = __importDefault(require("./WebGPUBinding"));
const constants_1 = require("./constants");
class WebGPUSampler extends WebGPUBinding_1.default {
    constructor(name, texture) {
        super(name);
        this.texture = texture;
        this.type = constants_1.GPUBindingType.Sampler;
        this.visibility = GPUShaderStage.FRAGMENT;
        this.samplerGPU = null; // set by the renderer
    }
    getTexture() {
        return this.texture;
    }
}
WebGPUSampler.prototype.isSampler = true;
exports.default = WebGPUSampler;
