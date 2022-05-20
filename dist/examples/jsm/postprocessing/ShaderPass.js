"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShaderPass = void 0;
const three_1 = require("three");
const Pass_1 = require("./Pass");
class ShaderPass extends Pass_1.Pass {
    constructor(shader, textureID) {
        super();
        this.textureID = textureID !== undefined ? textureID : 'tDiffuse';
        if (shader instanceof three_1.ShaderMaterial) {
            this.uniforms = shader.uniforms;
            this.material = shader;
        }
        else if (shader) {
            this.uniforms = three_1.UniformsUtils.clone(shader.uniforms);
            this.material = new three_1.ShaderMaterial({
                defines: Object.assign({}, shader.defines),
                uniforms: this.uniforms,
                vertexShader: shader.vertexShader,
                fragmentShader: shader.fragmentShader,
            });
        }
        this.fsQuad = new Pass_1.FullScreenQuad(this.material);
    }
    render(renderer, writeBuffer, readBuffer /*, deltaTime, maskActive */) {
        if (this.uniforms[this.textureID]) {
            this.uniforms[this.textureID].value = readBuffer.texture;
        }
        this.fsQuad.material = this.material;
        if (this.renderToScreen) {
            renderer.setRenderTarget(null);
            this.fsQuad.render(renderer);
        }
        else {
            renderer.setRenderTarget(writeBuffer);
            // TODO: Avoid using autoClear properties, see https://github.com/mrdoob/three.js/pull/15571#issuecomment-465669600
            if (this.clear)
                renderer.clear(renderer.autoClearColor, renderer.autoClearDepth, renderer.autoClearStencil);
            this.fsQuad.render(renderer);
        }
    }
}
exports.ShaderPass = ShaderPass;
