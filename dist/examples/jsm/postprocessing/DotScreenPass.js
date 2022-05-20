"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DotScreenPass = void 0;
const three_1 = require("three");
const Pass_1 = require("./Pass");
const DotScreenShader_1 = require("../shaders/DotScreenShader");
class DotScreenPass extends Pass_1.Pass {
    constructor(center, angle, scale) {
        super();
        if (DotScreenShader_1.DotScreenShader === undefined)
            console.error('THREE.DotScreenPass relies on DotScreenShader');
        const shader = DotScreenShader_1.DotScreenShader;
        this.uniforms = three_1.UniformsUtils.clone(shader.uniforms);
        if (center !== undefined)
            this.uniforms['center'].value.copy(center);
        if (angle !== undefined)
            this.uniforms['angle'].value = angle;
        if (scale !== undefined)
            this.uniforms['scale'].value = scale;
        this.material = new three_1.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: shader.vertexShader,
            fragmentShader: shader.fragmentShader,
        });
        this.fsQuad = new Pass_1.FullScreenQuad(this.material);
    }
    render(renderer, writeBuffer, readBuffer /*, deltaTime, maskActive */) {
        this.uniforms['tDiffuse'].value = readBuffer.texture;
        this.uniforms['tSize'].value.set(readBuffer.width, readBuffer.height);
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
}
exports.DotScreenPass = DotScreenPass;
