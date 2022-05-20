"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BloomPass = void 0;
const three_1 = require("three");
const Pass_1 = require("./Pass");
const ConvolutionShader_1 = require("../shaders/ConvolutionShader");
class BloomPass extends Pass_1.Pass {
    constructor(strength = 1, kernelSize = 25, sigma = 4, resolution = 256) {
        super();
        // render targets
        this.renderTargetX = new three_1.WebGLRenderTarget(resolution, resolution);
        this.renderTargetX.texture.name = 'BloomPass.x';
        this.renderTargetY = new three_1.WebGLRenderTarget(resolution, resolution);
        this.renderTargetY.texture.name = 'BloomPass.y';
        // combine material
        this.combineUniforms = three_1.UniformsUtils.clone(CombineShader.uniforms);
        this.combineUniforms['strength'].value = strength;
        this.materialCombine = new three_1.ShaderMaterial({
            uniforms: this.combineUniforms,
            vertexShader: CombineShader.vertexShader,
            fragmentShader: CombineShader.fragmentShader,
            blending: three_1.AdditiveBlending,
            transparent: true,
        });
        // convolution material
        if (ConvolutionShader_1.ConvolutionShader === undefined)
            console.error('THREE.BloomPass relies on ConvolutionShader');
        const convolutionShader = ConvolutionShader_1.ConvolutionShader;
        this.convolutionUniforms = three_1.UniformsUtils.clone(convolutionShader.uniforms);
        this.convolutionUniforms['uImageIncrement'].value = BloomPass.blurX;
        this.convolutionUniforms['cKernel'].value = ConvolutionShader_1.ConvolutionShader.buildKernel(sigma);
        this.materialConvolution = new three_1.ShaderMaterial({
            uniforms: this.convolutionUniforms,
            vertexShader: convolutionShader.vertexShader,
            fragmentShader: convolutionShader.fragmentShader,
            defines: {
                KERNEL_SIZE_FLOAT: kernelSize.toFixed(1),
                KERNEL_SIZE_INT: kernelSize.toFixed(0),
            },
        });
        this.needsSwap = false;
        this.fsQuad = new Pass_1.FullScreenQuad(null);
    }
    render(renderer, writeBuffer, readBuffer, deltaTime, maskActive) {
        if (maskActive)
            renderer.state.buffers.stencil.setTest(false);
        // Render quad with blured scene into texture (convolution pass 1)
        this.fsQuad.material = this.materialConvolution;
        this.convolutionUniforms['tDiffuse'].value = readBuffer.texture;
        this.convolutionUniforms['uImageIncrement'].value = BloomPass.blurX;
        renderer.setRenderTarget(this.renderTargetX);
        renderer.clear();
        this.fsQuad.render(renderer);
        // Render quad with blured scene into texture (convolution pass 2)
        this.convolutionUniforms['tDiffuse'].value = this.renderTargetX.texture;
        this.convolutionUniforms['uImageIncrement'].value = BloomPass.blurY;
        renderer.setRenderTarget(this.renderTargetY);
        renderer.clear();
        this.fsQuad.render(renderer);
        // Render original scene with superimposed blur to texture
        this.fsQuad.material = this.materialCombine;
        this.combineUniforms['tDiffuse'].value = this.renderTargetY.texture;
        if (maskActive)
            renderer.state.buffers.stencil.setTest(true);
        renderer.setRenderTarget(readBuffer);
        if (this.clear)
            renderer.clear();
        this.fsQuad.render(renderer);
    }
}
exports.BloomPass = BloomPass;
const CombineShader = {
    uniforms: {
        tDiffuse: { value: null },
        strength: { value: 1.0 },
    },
    vertexShader: /* glsl */ `

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,
    fragmentShader: /* glsl */ `

		uniform float strength;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = strength * texel;

		}`,
};
BloomPass.blurX = new three_1.Vector2(0.001953125, 0.0);
BloomPass.blurY = new three_1.Vector2(0.0, 0.001953125);
