"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlitchPass = void 0;
const three_1 = require("three");
const Pass_1 = require("./Pass");
const DigitalGlitch_1 = require("../shaders/DigitalGlitch");
class GlitchPass extends Pass_1.Pass {
    constructor(dt_size = 64) {
        super();
        if (DigitalGlitch_1.DigitalGlitch === undefined)
            console.error('THREE.GlitchPass relies on DigitalGlitch');
        const shader = DigitalGlitch_1.DigitalGlitch;
        this.uniforms = three_1.UniformsUtils.clone(shader.uniforms);
        this.uniforms['tDisp'].value = this.generateHeightmap(dt_size);
        this.material = new three_1.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: shader.vertexShader,
            fragmentShader: shader.fragmentShader,
        });
        this.fsQuad = new Pass_1.FullScreenQuad(this.material);
        this.goWild = false;
        this.curF = 0;
        this.generateTrigger();
    }
    render(renderer, writeBuffer, readBuffer /*, deltaTime, maskActive */) {
        if (renderer.capabilities.isWebGL2 === false)
            this.uniforms['tDisp'].value.format = three_1.LuminanceFormat;
        this.uniforms['tDiffuse'].value = readBuffer.texture;
        this.uniforms['seed'].value = Math.random(); //default seeding
        this.uniforms['byp'].value = 0;
        if (this.curF % this.randX == 0 || this.goWild == true) {
            this.uniforms['amount'].value = Math.random() / 30;
            this.uniforms['angle'].value = three_1.MathUtils.randFloat(-Math.PI, Math.PI);
            this.uniforms['seed_x'].value = three_1.MathUtils.randFloat(-1, 1);
            this.uniforms['seed_y'].value = three_1.MathUtils.randFloat(-1, 1);
            this.uniforms['distortion_x'].value = three_1.MathUtils.randFloat(0, 1);
            this.uniforms['distortion_y'].value = three_1.MathUtils.randFloat(0, 1);
            this.curF = 0;
            this.generateTrigger();
        }
        else if (this.curF % this.randX < this.randX / 5) {
            this.uniforms['amount'].value = Math.random() / 90;
            this.uniforms['angle'].value = three_1.MathUtils.randFloat(-Math.PI, Math.PI);
            this.uniforms['distortion_x'].value = three_1.MathUtils.randFloat(0, 1);
            this.uniforms['distortion_y'].value = three_1.MathUtils.randFloat(0, 1);
            this.uniforms['seed_x'].value = three_1.MathUtils.randFloat(-0.3, 0.3);
            this.uniforms['seed_y'].value = three_1.MathUtils.randFloat(-0.3, 0.3);
        }
        else if (this.goWild == false) {
            this.uniforms['byp'].value = 1;
        }
        this.curF++;
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
    generateTrigger() {
        this.randX = three_1.MathUtils.randInt(120, 240);
    }
    generateHeightmap(dt_size) {
        const data_arr = new Float32Array(dt_size * dt_size);
        const length = dt_size * dt_size;
        for (let i = 0; i < length; i += 1) {
            const val = three_1.MathUtils.randFloat(0, 1);
            data_arr[i] = val;
        }
        const texture = new three_1.DataTexture(data_arr, dt_size, dt_size, three_1.RedFormat, three_1.FloatType);
        texture.needsUpdate = true;
        return texture;
    }
}
exports.GlitchPass = GlitchPass;
