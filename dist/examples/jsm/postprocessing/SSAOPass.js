"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SSAOPass = void 0;
const three_1 = require("three");
const Pass_1 = require("./Pass");
const SimplexNoise_1 = require("../math/SimplexNoise");
const SSAOShader_1 = require("../shaders/SSAOShader");
const SSAOShader_2 = require("../shaders/SSAOShader");
const SSAOShader_3 = require("../shaders/SSAOShader");
const CopyShader_1 = require("../shaders/CopyShader");
class SSAOPass extends Pass_1.Pass {
    constructor(scene, camera, width, height) {
        super();
        this.width = width !== undefined ? width : 512;
        this.height = height !== undefined ? height : 512;
        this.clear = true;
        this.camera = camera;
        this.scene = scene;
        this.kernelRadius = 8;
        this.kernelSize = 32;
        this.kernel = [];
        this.noiseTexture = null;
        this.output = 0;
        this.minDistance = 0.005;
        this.maxDistance = 0.1;
        this._visibilityCache = new Map();
        //
        this.generateSampleKernel();
        this.generateRandomKernelRotations();
        // beauty render target
        const depthTexture = new three_1.DepthTexture();
        depthTexture.format = three_1.DepthStencilFormat;
        depthTexture.type = three_1.UnsignedInt248Type;
        this.beautyRenderTarget = new three_1.WebGLRenderTarget(this.width, this.height);
        // normal render target with depth buffer
        this.normalRenderTarget = new three_1.WebGLRenderTarget(this.width, this.height, {
            minFilter: three_1.NearestFilter,
            magFilter: three_1.NearestFilter,
            depthTexture: depthTexture,
        });
        // ssao render target
        this.ssaoRenderTarget = new three_1.WebGLRenderTarget(this.width, this.height);
        this.blurRenderTarget = this.ssaoRenderTarget.clone();
        // ssao material
        if (SSAOShader_1.SSAOShader === undefined) {
            console.error('THREE.SSAOPass: The pass relies on SSAOShader.');
        }
        this.ssaoMaterial = new three_1.ShaderMaterial({
            defines: Object.assign({}, SSAOShader_1.SSAOShader.defines),
            uniforms: three_1.UniformsUtils.clone(SSAOShader_1.SSAOShader.uniforms),
            vertexShader: SSAOShader_1.SSAOShader.vertexShader,
            fragmentShader: SSAOShader_1.SSAOShader.fragmentShader,
            blending: three_1.NoBlending,
        });
        this.ssaoMaterial.uniforms['tDiffuse'].value = this.beautyRenderTarget.texture;
        this.ssaoMaterial.uniforms['tNormal'].value = this.normalRenderTarget.texture;
        this.ssaoMaterial.uniforms['tDepth'].value = this.normalRenderTarget.depthTexture;
        this.ssaoMaterial.uniforms['tNoise'].value = this.noiseTexture;
        this.ssaoMaterial.uniforms['kernel'].value = this.kernel;
        this.ssaoMaterial.uniforms['cameraNear'].value = this.camera.near;
        this.ssaoMaterial.uniforms['cameraFar'].value = this.camera.far;
        this.ssaoMaterial.uniforms['resolution'].value.set(this.width, this.height);
        this.ssaoMaterial.uniforms['cameraProjectionMatrix'].value.copy(this.camera.projectionMatrix);
        this.ssaoMaterial.uniforms['cameraInverseProjectionMatrix'].value.copy(this.camera.projectionMatrixInverse);
        // normal material
        this.normalMaterial = new three_1.MeshNormalMaterial();
        this.normalMaterial.blending = three_1.NoBlending;
        // blur material
        this.blurMaterial = new three_1.ShaderMaterial({
            defines: Object.assign({}, SSAOShader_2.SSAOBlurShader.defines),
            uniforms: three_1.UniformsUtils.clone(SSAOShader_2.SSAOBlurShader.uniforms),
            vertexShader: SSAOShader_2.SSAOBlurShader.vertexShader,
            fragmentShader: SSAOShader_2.SSAOBlurShader.fragmentShader,
        });
        this.blurMaterial.uniforms['tDiffuse'].value = this.ssaoRenderTarget.texture;
        this.blurMaterial.uniforms['resolution'].value.set(this.width, this.height);
        // material for rendering the depth
        this.depthRenderMaterial = new three_1.ShaderMaterial({
            defines: Object.assign({}, SSAOShader_3.SSAODepthShader.defines),
            uniforms: three_1.UniformsUtils.clone(SSAOShader_3.SSAODepthShader.uniforms),
            vertexShader: SSAOShader_3.SSAODepthShader.vertexShader,
            fragmentShader: SSAOShader_3.SSAODepthShader.fragmentShader,
            blending: three_1.NoBlending,
        });
        this.depthRenderMaterial.uniforms['tDepth'].value = this.normalRenderTarget.depthTexture;
        this.depthRenderMaterial.uniforms['cameraNear'].value = this.camera.near;
        this.depthRenderMaterial.uniforms['cameraFar'].value = this.camera.far;
        // material for rendering the content of a render target
        this.copyMaterial = new three_1.ShaderMaterial({
            uniforms: three_1.UniformsUtils.clone(CopyShader_1.CopyShader.uniforms),
            vertexShader: CopyShader_1.CopyShader.vertexShader,
            fragmentShader: CopyShader_1.CopyShader.fragmentShader,
            transparent: true,
            depthTest: false,
            depthWrite: false,
            blendSrc: three_1.DstColorFactor,
            blendDst: three_1.ZeroFactor,
            blendEquation: three_1.AddEquation,
            blendSrcAlpha: three_1.DstAlphaFactor,
            blendDstAlpha: three_1.ZeroFactor,
            blendEquationAlpha: three_1.AddEquation,
        });
        this.fsQuad = new Pass_1.FullScreenQuad(null);
        this.originalClearColor = new three_1.Color();
    }
    dispose() {
        // dispose render targets
        this.beautyRenderTarget.dispose();
        this.normalRenderTarget.dispose();
        this.ssaoRenderTarget.dispose();
        this.blurRenderTarget.dispose();
        // dispose materials
        this.normalMaterial.dispose();
        this.blurMaterial.dispose();
        this.copyMaterial.dispose();
        this.depthRenderMaterial.dispose();
        // dipsose full screen quad
        this.fsQuad.dispose();
    }
    render(renderer, writeBuffer /*, readBuffer, deltaTime, maskActive */) {
        if (renderer.capabilities.isWebGL2 === false)
            this.noiseTexture.format = three_1.LuminanceFormat;
        // render beauty
        renderer.setRenderTarget(this.beautyRenderTarget);
        renderer.clear();
        renderer.render(this.scene, this.camera);
        // render normals and depth (honor only meshes, points and lines do not contribute to SSAO)
        this.overrideVisibility();
        this.renderOverride(renderer, this.normalMaterial, this.normalRenderTarget, 0x7777ff, 1.0);
        this.restoreVisibility();
        // render SSAO
        this.ssaoMaterial.uniforms['kernelRadius'].value = this.kernelRadius;
        this.ssaoMaterial.uniforms['minDistance'].value = this.minDistance;
        this.ssaoMaterial.uniforms['maxDistance'].value = this.maxDistance;
        this.renderPass(renderer, this.ssaoMaterial, this.ssaoRenderTarget);
        // render blur
        this.renderPass(renderer, this.blurMaterial, this.blurRenderTarget);
        // output result to screen
        switch (this.output) {
            case SSAOPass.OUTPUT.SSAO:
                this.copyMaterial.uniforms['tDiffuse'].value = this.ssaoRenderTarget.texture;
                this.copyMaterial.blending = three_1.NoBlending;
                this.renderPass(renderer, this.copyMaterial, this.renderToScreen ? null : writeBuffer);
                break;
            case SSAOPass.OUTPUT.Blur:
                this.copyMaterial.uniforms['tDiffuse'].value = this.blurRenderTarget.texture;
                this.copyMaterial.blending = three_1.NoBlending;
                this.renderPass(renderer, this.copyMaterial, this.renderToScreen ? null : writeBuffer);
                break;
            case SSAOPass.OUTPUT.Beauty:
                this.copyMaterial.uniforms['tDiffuse'].value = this.beautyRenderTarget.texture;
                this.copyMaterial.blending = three_1.NoBlending;
                this.renderPass(renderer, this.copyMaterial, this.renderToScreen ? null : writeBuffer);
                break;
            case SSAOPass.OUTPUT.Depth:
                this.renderPass(renderer, this.depthRenderMaterial, this.renderToScreen ? null : writeBuffer);
                break;
            case SSAOPass.OUTPUT.Normal:
                this.copyMaterial.uniforms['tDiffuse'].value = this.normalRenderTarget.texture;
                this.copyMaterial.blending = three_1.NoBlending;
                this.renderPass(renderer, this.copyMaterial, this.renderToScreen ? null : writeBuffer);
                break;
            case SSAOPass.OUTPUT.Default:
                this.copyMaterial.uniforms['tDiffuse'].value = this.beautyRenderTarget.texture;
                this.copyMaterial.blending = three_1.NoBlending;
                this.renderPass(renderer, this.copyMaterial, this.renderToScreen ? null : writeBuffer);
                this.copyMaterial.uniforms['tDiffuse'].value = this.blurRenderTarget.texture;
                this.copyMaterial.blending = three_1.CustomBlending;
                this.renderPass(renderer, this.copyMaterial, this.renderToScreen ? null : writeBuffer);
                break;
            default:
                console.warn('THREE.SSAOPass: Unknown output type.');
        }
    }
    renderPass(renderer, passMaterial, renderTarget, clearColor, clearAlpha) {
        // save original state
        renderer.getClearColor(this.originalClearColor);
        const originalClearAlpha = renderer.getClearAlpha();
        const originalAutoClear = renderer.autoClear;
        renderer.setRenderTarget(renderTarget);
        // setup pass state
        renderer.autoClear = false;
        if (clearColor !== undefined && clearColor !== null) {
            renderer.setClearColor(clearColor);
            renderer.setClearAlpha(clearAlpha || 0.0);
            renderer.clear();
        }
        this.fsQuad.material = passMaterial;
        this.fsQuad.render(renderer);
        // restore original state
        renderer.autoClear = originalAutoClear;
        renderer.setClearColor(this.originalClearColor);
        renderer.setClearAlpha(originalClearAlpha);
    }
    renderOverride(renderer, overrideMaterial, renderTarget, clearColor, clearAlpha) {
        renderer.getClearColor(this.originalClearColor);
        const originalClearAlpha = renderer.getClearAlpha();
        const originalAutoClear = renderer.autoClear;
        renderer.setRenderTarget(renderTarget);
        renderer.autoClear = false;
        clearColor = overrideMaterial.clearColor || clearColor;
        clearAlpha = overrideMaterial.clearAlpha || clearAlpha;
        if (clearColor !== undefined && clearColor !== null) {
            renderer.setClearColor(clearColor);
            renderer.setClearAlpha(clearAlpha || 0.0);
            renderer.clear();
        }
        this.scene.overrideMaterial = overrideMaterial;
        renderer.render(this.scene, this.camera);
        this.scene.overrideMaterial = null;
        // restore original state
        renderer.autoClear = originalAutoClear;
        renderer.setClearColor(this.originalClearColor);
        renderer.setClearAlpha(originalClearAlpha);
    }
    setSize(width, height) {
        this.width = width;
        this.height = height;
        this.beautyRenderTarget.setSize(width, height);
        this.ssaoRenderTarget.setSize(width, height);
        this.normalRenderTarget.setSize(width, height);
        this.blurRenderTarget.setSize(width, height);
        this.ssaoMaterial.uniforms['resolution'].value.set(width, height);
        this.ssaoMaterial.uniforms['cameraProjectionMatrix'].value.copy(this.camera.projectionMatrix);
        this.ssaoMaterial.uniforms['cameraInverseProjectionMatrix'].value.copy(this.camera.projectionMatrixInverse);
        this.blurMaterial.uniforms['resolution'].value.set(width, height);
    }
    generateSampleKernel() {
        const kernelSize = this.kernelSize;
        const kernel = this.kernel;
        for (let i = 0; i < kernelSize; i += 1) {
            const sample = new three_1.Vector3();
            sample.x = Math.random() * 2 - 1;
            sample.y = Math.random() * 2 - 1;
            sample.z = Math.random();
            sample.normalize();
            let scale = i / kernelSize;
            scale = three_1.MathUtils.lerp(0.1, 1, scale * scale);
            sample.multiplyScalar(scale);
            kernel.push(sample);
        }
    }
    generateRandomKernelRotations() {
        const width = 4, height = 4;
        if (SimplexNoise_1.SimplexNoise === undefined) {
            console.error('THREE.SSAOPass: The pass relies on SimplexNoise.');
        }
        const simplex = new SimplexNoise_1.SimplexNoise();
        const size = width * height;
        const data = new Float32Array(size);
        for (let i = 0; i < size; i += 1) {
            const x = Math.random() * 2 - 1;
            const y = Math.random() * 2 - 1;
            const z = 0;
            data[i] = simplex.noise3d(x, y, z);
        }
        this.noiseTexture = new three_1.DataTexture(data, width, height, three_1.RedFormat, three_1.FloatType);
        this.noiseTexture.wrapS = three_1.RepeatWrapping;
        this.noiseTexture.wrapT = three_1.RepeatWrapping;
        this.noiseTexture.needsUpdate = true;
    }
    overrideVisibility() {
        const scene = this.scene;
        const cache = this._visibilityCache;
        scene.traverse(function (object) {
            cache.set(object, object.visible);
            if (object.isPoints || object.isLine)
                object.visible = false;
        });
    }
    restoreVisibility() {
        const scene = this.scene;
        const cache = this._visibilityCache;
        scene.traverse(function (object) {
            const visible = cache.get(object);
            object.visible = visible;
        });
        cache.clear();
    }
}
exports.SSAOPass = SSAOPass;
SSAOPass.OUTPUT = {
    Default: 0,
    SSAO: 1,
    Blur: 2,
    Beauty: 3,
    Depth: 4,
    Normal: 5,
};
