"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilmPass = void 0;
const three_1 = require("three");
const Pass_1 = require("./Pass");
const FilmShader_1 = require("../shaders/FilmShader");
class FilmPass extends Pass_1.Pass {
    constructor(noiseIntensity, scanlinesIntensity, scanlinesCount, grayscale) {
        super();
        if (FilmShader_1.FilmShader === undefined)
            console.error('THREE.FilmPass relies on FilmShader');
        const shader = FilmShader_1.FilmShader;
        this.uniforms = three_1.UniformsUtils.clone(shader.uniforms);
        this.material = new three_1.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: shader.vertexShader,
            fragmentShader: shader.fragmentShader,
        });
        if (grayscale !== undefined)
            this.uniforms.grayscale.value = grayscale;
        if (noiseIntensity !== undefined)
            this.uniforms.nIntensity.value = noiseIntensity;
        if (scanlinesIntensity !== undefined)
            this.uniforms.sIntensity.value = scanlinesIntensity;
        if (scanlinesCount !== undefined)
            this.uniforms.sCount.value = scanlinesCount;
        this.fsQuad = new Pass_1.FullScreenQuad(this.material);
    }
    render(renderer, writeBuffer, readBuffer, deltaTime /*, maskActive */) {
        this.uniforms['tDiffuse'].value = readBuffer.texture;
        this.uniforms['time'].value += deltaTime;
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
exports.FilmPass = FilmPass;
