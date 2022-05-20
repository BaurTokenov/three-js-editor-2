"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SavePass = void 0;
const three_1 = require("three");
const Pass_1 = require("./Pass");
const CopyShader_1 = require("../shaders/CopyShader");
class SavePass extends Pass_1.Pass {
    constructor(renderTarget) {
        super();
        if (CopyShader_1.CopyShader === undefined)
            console.error('THREE.SavePass relies on CopyShader');
        const shader = CopyShader_1.CopyShader;
        this.textureID = 'tDiffuse';
        this.uniforms = three_1.UniformsUtils.clone(shader.uniforms);
        this.material = new three_1.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: shader.vertexShader,
            fragmentShader: shader.fragmentShader,
        });
        this.renderTarget = renderTarget;
        if (this.renderTarget === undefined) {
            this.renderTarget = new three_1.WebGLRenderTarget(window.innerWidth, window.innerHeight);
            this.renderTarget.texture.name = 'SavePass.rt';
        }
        this.needsSwap = false;
        this.fsQuad = new Pass_1.FullScreenQuad(this.material);
    }
    render(renderer, writeBuffer, readBuffer /*, deltaTime, maskActive */) {
        if (this.uniforms[this.textureID]) {
            this.uniforms[this.textureID].value = readBuffer.texture;
        }
        renderer.setRenderTarget(this.renderTarget);
        if (this.clear)
            renderer.clear();
        this.fsQuad.render(renderer);
    }
}
exports.SavePass = SavePass;
