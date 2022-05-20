"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AfterimagePass = void 0;
const three_1 = require("three");
const Pass_1 = require("./Pass");
const AfterimageShader_1 = require("../shaders/AfterimageShader");
class AfterimagePass extends Pass_1.Pass {
    constructor(damp = 0.96) {
        super();
        if (AfterimageShader_1.AfterimageShader === undefined)
            console.error('THREE.AfterimagePass relies on AfterimageShader');
        this.shader = AfterimageShader_1.AfterimageShader;
        this.uniforms = three_1.UniformsUtils.clone(this.shader.uniforms);
        this.uniforms['damp'].value = damp;
        this.textureComp = new three_1.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
            magFilter: three_1.NearestFilter,
        });
        this.textureOld = new three_1.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
            magFilter: three_1.NearestFilter,
        });
        this.shaderMaterial = new three_1.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: this.shader.vertexShader,
            fragmentShader: this.shader.fragmentShader,
        });
        this.compFsQuad = new Pass_1.FullScreenQuad(this.shaderMaterial);
        const material = new three_1.MeshBasicMaterial();
        this.copyFsQuad = new Pass_1.FullScreenQuad(material);
    }
    render(renderer, writeBuffer, readBuffer /*, deltaTime, maskActive*/) {
        this.uniforms['tOld'].value = this.textureOld.texture;
        this.uniforms['tNew'].value = readBuffer.texture;
        renderer.setRenderTarget(this.textureComp);
        this.compFsQuad.render(renderer);
        this.copyFsQuad.material.map = this.textureComp.texture;
        if (this.renderToScreen) {
            renderer.setRenderTarget(null);
            this.copyFsQuad.render(renderer);
        }
        else {
            renderer.setRenderTarget(writeBuffer);
            if (this.clear)
                renderer.clear();
            this.copyFsQuad.render(renderer);
        }
        // Swap buffers.
        const temp = this.textureOld;
        this.textureOld = this.textureComp;
        this.textureComp = temp;
        // Now textureOld contains the latest image, ready for the next frame.
    }
    setSize(width, height) {
        this.textureComp.setSize(width, height);
        this.textureOld.setSize(width, height);
    }
}
exports.AfterimagePass = AfterimagePass;
