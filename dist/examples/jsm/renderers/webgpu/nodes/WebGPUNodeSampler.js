"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const WebGPUSampler_1 = __importDefault(require("../WebGPUSampler"));
class WebGPUNodeSampler extends WebGPUSampler_1.default {
    constructor(name, textureNode) {
        super(name, textureNode.value);
        this.textureNode = textureNode;
    }
    getTexture() {
        return this.textureNode.value;
    }
}
exports.default = WebGPUNodeSampler;
