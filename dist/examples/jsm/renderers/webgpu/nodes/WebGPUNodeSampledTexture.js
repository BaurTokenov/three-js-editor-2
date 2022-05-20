"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebGPUNodeSampledCubeTexture = exports.WebGPUNodeSampledTexture = void 0;
const WebGPUSampledTexture_1 = require("../WebGPUSampledTexture");
class WebGPUNodeSampledTexture extends WebGPUSampledTexture_1.WebGPUSampledTexture {
    constructor(name, textureNode) {
        super(name, textureNode.value);
        this.textureNode = textureNode;
    }
    getTexture() {
        return this.textureNode.value;
    }
}
exports.WebGPUNodeSampledTexture = WebGPUNodeSampledTexture;
class WebGPUNodeSampledCubeTexture extends WebGPUSampledTexture_1.WebGPUSampledCubeTexture {
    constructor(name, textureNode) {
        super(name, textureNode.value);
        this.textureNode = textureNode;
    }
    getTexture() {
        return this.textureNode.value;
    }
}
exports.WebGPUNodeSampledCubeTexture = WebGPUNodeSampledCubeTexture;
