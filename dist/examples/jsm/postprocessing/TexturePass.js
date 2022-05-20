"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TexturePass = void 0;
const three_1 = require("three");
const Pass_1 = require("./Pass");
const CopyShader_1 = require("../shaders/CopyShader");
class TexturePass extends Pass_1.Pass {
    constructor(map, opacity) {
        super();
        if (CopyShader_1.CopyShader === undefined)
            console.error('THREE.TexturePass relies on CopyShader');
        const shader = CopyShader_1.CopyShader;
        this.map = map;
        this.opacity = opacity !== undefined ? opacity : 1.0;
        this.uniforms = three_1.UniformsUtils.clone(shader.uniforms);
        this.material = new three_1.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: shader.vertexShader,
            fragmentShader: shader.fragmentShader,
            depthTest: false,
            depthWrite: false,
        });
        this.needsSwap = false;
        this.fsQuad = new Pass_1.FullScreenQuad(null);
    }
    render(renderer, writeBuffer, readBuffer /*, deltaTime, maskActive */) {
        const oldAutoClear = renderer.autoClear;
        renderer.autoClear = false;
        this.fsQuad.material = this.material;
        this.uniforms['opacity'].value = this.opacity;
        this.uniforms['tDiffuse'].value = this.map;
        this.material.transparent = this.opacity < 1.0;
        renderer.setRenderTarget(this.renderToScreen ? null : readBuffer);
        if (this.clear)
            renderer.clear();
        this.fsQuad.render(renderer);
        renderer.autoClear = oldAutoClear;
    }
}
exports.TexturePass = TexturePass;
