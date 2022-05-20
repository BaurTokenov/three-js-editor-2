"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const three_1 = require("three");
class WebGPUTextureRenderer {
    constructor(renderer, options = {}) {
        this.renderer = renderer;
        // @TODO: Consider to introduce WebGPURenderTarget or rename WebGLRenderTarget to just RenderTarget
        this.renderTarget = new three_1.WebGLRenderTarget(options);
    }
    getTexture() {
        return this.renderTarget.texture;
    }
    setSize(width, height) {
        this.renderTarget.setSize(width, height);
    }
    render(scene, camera) {
        const renderer = this.renderer;
        const renderTarget = this.renderTarget;
        renderer.setRenderTarget(renderTarget);
        renderer.render(scene, camera);
        renderer.setRenderTarget(null);
    }
}
exports.default = WebGPUTextureRenderer;
