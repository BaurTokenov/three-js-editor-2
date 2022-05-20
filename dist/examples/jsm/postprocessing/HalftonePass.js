"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HalftonePass = void 0;
const three_1 = require("three");
const Pass_1 = require("./Pass");
const HalftoneShader_1 = require("../shaders/HalftoneShader");
/**
 * RGB Halftone pass for three.js effects composer. Requires HalftoneShader.
 */
class HalftonePass extends Pass_1.Pass {
    constructor(width, height, params) {
        super();
        if (HalftoneShader_1.HalftoneShader === undefined) {
            console.error('THREE.HalftonePass requires HalftoneShader');
        }
        this.uniforms = three_1.UniformsUtils.clone(HalftoneShader_1.HalftoneShader.uniforms);
        this.material = new three_1.ShaderMaterial({
            uniforms: this.uniforms,
            fragmentShader: HalftoneShader_1.HalftoneShader.fragmentShader,
            vertexShader: HalftoneShader_1.HalftoneShader.vertexShader,
        });
        // set params
        this.uniforms.width.value = width;
        this.uniforms.height.value = height;
        for (const key in params) {
            if (params.hasOwnProperty(key) && this.uniforms.hasOwnProperty(key)) {
                this.uniforms[key].value = params[key];
            }
        }
        this.fsQuad = new Pass_1.FullScreenQuad(this.material);
    }
    render(renderer, writeBuffer, readBuffer /*, deltaTime, maskActive*/) {
        this.material.uniforms['tDiffuse'].value = readBuffer.texture;
        if (this.renderToScreen) {
            renderer.setRenderTarget(null);
            this.fsQuad.render(renderer);
        }
        else {
            renderer.setRenderTarget(writeBuffer);
            if (this.clear)
                renderer.clear();
            this.fsQuad.render(renderer);
        }
    }
    setSize(width, height) {
        this.uniforms.width.value = width;
        this.uniforms.height.value = height;
    }
}
exports.HalftonePass = HalftonePass;
