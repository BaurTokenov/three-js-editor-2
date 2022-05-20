"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebGPUSampledCubeTexture = exports.WebGPUSampled3DTexture = exports.WebGPUSampledArrayTexture = exports.WebGPUSampledTexture = void 0;
const WebGPUBinding_1 = __importDefault(require("./WebGPUBinding"));
const constants_1 = require("./constants");
class WebGPUSampledTexture extends WebGPUBinding_1.default {
    constructor(name, texture) {
        super(name);
        this.texture = texture;
        this.dimension = constants_1.GPUTextureViewDimension.TwoD;
        this.type = constants_1.GPUBindingType.SampledTexture;
        this.visibility = GPUShaderStage.FRAGMENT;
        this.textureGPU = null; // set by the renderer
    }
    getTexture() {
        return this.texture;
    }
}
exports.WebGPUSampledTexture = WebGPUSampledTexture;
WebGPUSampledTexture.prototype.isSampledTexture = true;
class WebGPUSampledArrayTexture extends WebGPUSampledTexture {
    constructor(name, texture) {
        super(name, texture);
        this.dimension = constants_1.GPUTextureViewDimension.TwoDArray;
    }
}
exports.WebGPUSampledArrayTexture = WebGPUSampledArrayTexture;
WebGPUSampledArrayTexture.prototype.isSampledArrayTexture = true;
class WebGPUSampled3DTexture extends WebGPUSampledTexture {
    constructor(name, texture) {
        super(name, texture);
        this.dimension = constants_1.GPUTextureViewDimension.ThreeD;
    }
}
exports.WebGPUSampled3DTexture = WebGPUSampled3DTexture;
WebGPUSampled3DTexture.prototype.isSampled3DTexture = true;
class WebGPUSampledCubeTexture extends WebGPUSampledTexture {
    constructor(name, texture) {
        super(name, texture);
        this.dimension = constants_1.GPUTextureViewDimension.Cube;
    }
}
exports.WebGPUSampledCubeTexture = WebGPUSampledCubeTexture;
WebGPUSampledCubeTexture.prototype.isSampledCubeTexture = true;
