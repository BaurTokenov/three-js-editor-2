"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SSRPass = void 0;
const three_1 = require("three");
const Pass_1 = require("./Pass");
const SSRShader_1 = require("../shaders/SSRShader");
const SSRShader_2 = require("../shaders/SSRShader");
const SSRShader_3 = require("../shaders/SSRShader");
const CopyShader_1 = require("../shaders/CopyShader");
class SSRPass extends Pass_1.Pass {
    constructor({ renderer, scene, camera, width, height, selects, bouncing = false, groundReflector }) {
        super();
        this.width = width !== undefined ? width : 512;
        this.height = height !== undefined ? height : 512;
        this.clear = true;
        this.renderer = renderer;
        this.scene = scene;
        this.camera = camera;
        this.groundReflector = groundReflector;
        this.opacity = SSRShader_1.SSRShader.uniforms.opacity.value;
        this.output = 0;
        this.maxDistance = SSRShader_1.SSRShader.uniforms.maxDistance.value;
        this.thickness = SSRShader_1.SSRShader.uniforms.thickness.value;
        this.tempColor = new three_1.Color();
        this._selects = selects;
        this.selective = Array.isArray(this._selects);
        Object.defineProperty(this, 'selects', {
            get() {
                return this._selects;
            },
            set(val) {
                if (this._selects === val)
                    return;
                this._selects = val;
                if (Array.isArray(val)) {
                    this.selective = true;
                    this.ssrMaterial.defines.SELECTIVE = true;
                    this.ssrMaterial.needsUpdate = true;
                }
                else {
                    this.selective = false;
                    this.ssrMaterial.defines.SELECTIVE = false;
                    this.ssrMaterial.needsUpdate = true;
                }
            },
        });
        this._bouncing = bouncing;
        Object.defineProperty(this, 'bouncing', {
            get() {
                return this._bouncing;
            },
            set(val) {
                if (this._bouncing === val)
                    return;
                this._bouncing = val;
                if (val) {
                    this.ssrMaterial.uniforms['tDiffuse'].value = this.prevRenderTarget.texture;
                }
                else {
                    this.ssrMaterial.uniforms['tDiffuse'].value = this.beautyRenderTarget.texture;
                }
            },
        });
        this.blur = true;
        this._distanceAttenuation = SSRShader_1.SSRShader.defines.DISTANCE_ATTENUATION;
        Object.defineProperty(this, 'distanceAttenuation', {
            get() {
                return this._distanceAttenuation;
            },
            set(val) {
                if (this._distanceAttenuation === val)
                    return;
                this._distanceAttenuation = val;
                this.ssrMaterial.defines.DISTANCE_ATTENUATION = val;
                this.ssrMaterial.needsUpdate = true;
            },
        });
        this._fresnel = SSRShader_1.SSRShader.defines.FRESNEL;
        Object.defineProperty(this, 'fresnel', {
            get() {
                return this._fresnel;
            },
            set(val) {
                if (this._fresnel === val)
                    return;
                this._fresnel = val;
                this.ssrMaterial.defines.FRESNEL = val;
                this.ssrMaterial.needsUpdate = true;
            },
        });
        this._infiniteThick = SSRShader_1.SSRShader.defines.INFINITE_THICK;
        Object.defineProperty(this, 'infiniteThick', {
            get() {
                return this._infiniteThick;
            },
            set(val) {
                if (this._infiniteThick === val)
                    return;
                this._infiniteThick = val;
                this.ssrMaterial.defines.INFINITE_THICK = val;
                this.ssrMaterial.needsUpdate = true;
            },
        });
        // beauty render target with depth buffer
        const depthTexture = new three_1.DepthTexture();
        depthTexture.type = three_1.UnsignedShortType;
        depthTexture.minFilter = three_1.NearestFilter;
        depthTexture.magFilter = three_1.NearestFilter;
        this.beautyRenderTarget = new three_1.WebGLRenderTarget(this.width, this.height, {
            minFilter: three_1.NearestFilter,
            magFilter: three_1.NearestFilter,
            depthTexture: depthTexture,
            depthBuffer: true,
        });
        //for bouncing
        this.prevRenderTarget = new three_1.WebGLRenderTarget(this.width, this.height, {
            minFilter: three_1.NearestFilter,
            magFilter: three_1.NearestFilter,
        });
        // normal render target
        this.normalRenderTarget = new three_1.WebGLRenderTarget(this.width, this.height, {
            minFilter: three_1.NearestFilter,
            magFilter: three_1.NearestFilter,
            type: three_1.HalfFloatType,
        });
        // metalness render target
        this.metalnessRenderTarget = new three_1.WebGLRenderTarget(this.width, this.height, {
            minFilter: three_1.NearestFilter,
            magFilter: three_1.NearestFilter,
        });
        // ssr render target
        this.ssrRenderTarget = new three_1.WebGLRenderTarget(this.width, this.height, {
            minFilter: three_1.NearestFilter,
            magFilter: three_1.NearestFilter,
        });
        this.blurRenderTarget = this.ssrRenderTarget.clone();
        this.blurRenderTarget2 = this.ssrRenderTarget.clone();
        // this.blurRenderTarget3 = this.ssrRenderTarget.clone();
        // ssr material
        if (SSRShader_1.SSRShader === undefined) {
            console.error('THREE.SSRPass: The pass relies on SSRShader.');
        }
        this.ssrMaterial = new three_1.ShaderMaterial({
            defines: Object.assign({}, SSRShader_1.SSRShader.defines, {
                MAX_STEP: Math.sqrt(this.width * this.width + this.height * this.height),
            }),
            uniforms: three_1.UniformsUtils.clone(SSRShader_1.SSRShader.uniforms),
            vertexShader: SSRShader_1.SSRShader.vertexShader,
            fragmentShader: SSRShader_1.SSRShader.fragmentShader,
            blending: three_1.NoBlending,
        });
        this.ssrMaterial.uniforms['tDiffuse'].value = this.beautyRenderTarget.texture;
        this.ssrMaterial.uniforms['tNormal'].value = this.normalRenderTarget.texture;
        this.ssrMaterial.defines.SELECTIVE = this.selective;
        this.ssrMaterial.needsUpdate = true;
        this.ssrMaterial.uniforms['tMetalness'].value = this.metalnessRenderTarget.texture;
        this.ssrMaterial.uniforms['tDepth'].value = this.beautyRenderTarget.depthTexture;
        this.ssrMaterial.uniforms['cameraNear'].value = this.camera.near;
        this.ssrMaterial.uniforms['cameraFar'].value = this.camera.far;
        this.ssrMaterial.uniforms['thickness'].value = this.thickness;
        this.ssrMaterial.uniforms['resolution'].value.set(this.width, this.height);
        this.ssrMaterial.uniforms['cameraProjectionMatrix'].value.copy(this.camera.projectionMatrix);
        this.ssrMaterial.uniforms['cameraInverseProjectionMatrix'].value.copy(this.camera.projectionMatrixInverse);
        // normal material
        this.normalMaterial = new three_1.MeshNormalMaterial();
        this.normalMaterial.blending = three_1.NoBlending;
        // metalnessOn material
        this.metalnessOnMaterial = new three_1.MeshBasicMaterial({
            color: 'white',
        });
        // metalnessOff material
        this.metalnessOffMaterial = new three_1.MeshBasicMaterial({
            color: 'black',
        });
        // blur material
        this.blurMaterial = new three_1.ShaderMaterial({
            defines: Object.assign({}, SSRShader_2.SSRBlurShader.defines),
            uniforms: three_1.UniformsUtils.clone(SSRShader_2.SSRBlurShader.uniforms),
            vertexShader: SSRShader_2.SSRBlurShader.vertexShader,
            fragmentShader: SSRShader_2.SSRBlurShader.fragmentShader,
        });
        this.blurMaterial.uniforms['tDiffuse'].value = this.ssrRenderTarget.texture;
        this.blurMaterial.uniforms['resolution'].value.set(this.width, this.height);
        // blur material 2
        this.blurMaterial2 = new three_1.ShaderMaterial({
            defines: Object.assign({}, SSRShader_2.SSRBlurShader.defines),
            uniforms: three_1.UniformsUtils.clone(SSRShader_2.SSRBlurShader.uniforms),
            vertexShader: SSRShader_2.SSRBlurShader.vertexShader,
            fragmentShader: SSRShader_2.SSRBlurShader.fragmentShader,
        });
        this.blurMaterial2.uniforms['tDiffuse'].value = this.blurRenderTarget.texture;
        this.blurMaterial2.uniforms['resolution'].value.set(this.width, this.height);
        // // blur material 3
        // this.blurMaterial3 = new ShaderMaterial({
        //   defines: Object.assign({}, SSRBlurShader.defines),
        //   uniforms: UniformsUtils.clone(SSRBlurShader.uniforms),
        //   vertexShader: SSRBlurShader.vertexShader,
        //   fragmentShader: SSRBlurShader.fragmentShader
        // });
        // this.blurMaterial3.uniforms['tDiffuse'].value = this.blurRenderTarget2.texture;
        // this.blurMaterial3.uniforms['resolution'].value.set(this.width, this.height);
        // material for rendering the depth
        this.depthRenderMaterial = new three_1.ShaderMaterial({
            defines: Object.assign({}, SSRShader_3.SSRDepthShader.defines),
            uniforms: three_1.UniformsUtils.clone(SSRShader_3.SSRDepthShader.uniforms),
            vertexShader: SSRShader_3.SSRDepthShader.vertexShader,
            fragmentShader: SSRShader_3.SSRDepthShader.fragmentShader,
            blending: three_1.NoBlending,
        });
        this.depthRenderMaterial.uniforms['tDepth'].value = this.beautyRenderTarget.depthTexture;
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
            blendSrc: three_1.SrcAlphaFactor,
            blendDst: three_1.OneMinusSrcAlphaFactor,
            blendEquation: three_1.AddEquation,
            blendSrcAlpha: three_1.SrcAlphaFactor,
            blendDstAlpha: three_1.OneMinusSrcAlphaFactor,
            blendEquationAlpha: three_1.AddEquation,
            // premultipliedAlpha:true,
        });
        this.fsQuad = new Pass_1.FullScreenQuad(null);
        this.originalClearColor = new three_1.Color();
    }
    dispose() {
        // dispose render targets
        this.beautyRenderTarget.dispose();
        this.prevRenderTarget.dispose();
        this.normalRenderTarget.dispose();
        this.metalnessRenderTarget.dispose();
        this.ssrRenderTarget.dispose();
        this.blurRenderTarget.dispose();
        this.blurRenderTarget2.dispose();
        // this.blurRenderTarget3.dispose();
        // dispose materials
        this.normalMaterial.dispose();
        this.metalnessOnMaterial.dispose();
        this.metalnessOffMaterial.dispose();
        this.blurMaterial.dispose();
        this.blurMaterial2.dispose();
        this.copyMaterial.dispose();
        this.depthRenderMaterial.dispose();
        // dipsose full screen quad
        this.fsQuad.dispose();
    }
    render(renderer, writeBuffer /*, readBuffer, deltaTime, maskActive */) {
        // render beauty and depth
        renderer.setRenderTarget(this.beautyRenderTarget);
        renderer.clear();
        if (this.groundReflector) {
            this.groundReflector.visible = false;
            this.groundReflector.doRender(this.renderer, this.scene, this.camera);
            this.groundReflector.visible = true;
        }
        renderer.render(this.scene, this.camera);
        if (this.groundReflector)
            this.groundReflector.visible = false;
        // render normals
        this.renderOverride(renderer, this.normalMaterial, this.normalRenderTarget, 0, 0);
        // render metalnesses
        if (this.selective) {
            this.renderMetalness(renderer, this.metalnessOnMaterial, this.metalnessRenderTarget, 0, 0);
        }
        // render SSR
        this.ssrMaterial.uniforms['opacity'].value = this.opacity;
        this.ssrMaterial.uniforms['maxDistance'].value = this.maxDistance;
        this.ssrMaterial.uniforms['thickness'].value = this.thickness;
        this.renderPass(renderer, this.ssrMaterial, this.ssrRenderTarget);
        // render blur
        if (this.blur) {
            this.renderPass(renderer, this.blurMaterial, this.blurRenderTarget);
            this.renderPass(renderer, this.blurMaterial2, this.blurRenderTarget2);
            // this.renderPass(renderer, this.blurMaterial3, this.blurRenderTarget3);
        }
        // output result to screen
        switch (this.output) {
            case SSRPass.OUTPUT.Default:
                if (this.bouncing) {
                    this.copyMaterial.uniforms['tDiffuse'].value = this.beautyRenderTarget.texture;
                    this.copyMaterial.blending = three_1.NoBlending;
                    this.renderPass(renderer, this.copyMaterial, this.prevRenderTarget);
                    if (this.blur)
                        this.copyMaterial.uniforms['tDiffuse'].value = this.blurRenderTarget2.texture;
                    else
                        this.copyMaterial.uniforms['tDiffuse'].value = this.ssrRenderTarget.texture;
                    this.copyMaterial.blending = three_1.NormalBlending;
                    this.renderPass(renderer, this.copyMaterial, this.prevRenderTarget);
                    this.copyMaterial.uniforms['tDiffuse'].value = this.prevRenderTarget.texture;
                    this.copyMaterial.blending = three_1.NoBlending;
                    this.renderPass(renderer, this.copyMaterial, this.renderToScreen ? null : writeBuffer);
                }
                else {
                    this.copyMaterial.uniforms['tDiffuse'].value = this.beautyRenderTarget.texture;
                    this.copyMaterial.blending = three_1.NoBlending;
                    this.renderPass(renderer, this.copyMaterial, this.renderToScreen ? null : writeBuffer);
                    if (this.blur)
                        this.copyMaterial.uniforms['tDiffuse'].value = this.blurRenderTarget2.texture;
                    else
                        this.copyMaterial.uniforms['tDiffuse'].value = this.ssrRenderTarget.texture;
                    this.copyMaterial.blending = three_1.NormalBlending;
                    this.renderPass(renderer, this.copyMaterial, this.renderToScreen ? null : writeBuffer);
                }
                break;
            case SSRPass.OUTPUT.SSR:
                if (this.blur)
                    this.copyMaterial.uniforms['tDiffuse'].value = this.blurRenderTarget2.texture;
                else
                    this.copyMaterial.uniforms['tDiffuse'].value = this.ssrRenderTarget.texture;
                this.copyMaterial.blending = three_1.NoBlending;
                this.renderPass(renderer, this.copyMaterial, this.renderToScreen ? null : writeBuffer);
                if (this.bouncing) {
                    if (this.blur)
                        this.copyMaterial.uniforms['tDiffuse'].value = this.blurRenderTarget2.texture;
                    else
                        this.copyMaterial.uniforms['tDiffuse'].value = this.beautyRenderTarget.texture;
                    this.copyMaterial.blending = three_1.NoBlending;
                    this.renderPass(renderer, this.copyMaterial, this.prevRenderTarget);
                    this.copyMaterial.uniforms['tDiffuse'].value = this.ssrRenderTarget.texture;
                    this.copyMaterial.blending = three_1.NormalBlending;
                    this.renderPass(renderer, this.copyMaterial, this.prevRenderTarget);
                }
                break;
            case SSRPass.OUTPUT.Beauty:
                this.copyMaterial.uniforms['tDiffuse'].value = this.beautyRenderTarget.texture;
                this.copyMaterial.blending = three_1.NoBlending;
                this.renderPass(renderer, this.copyMaterial, this.renderToScreen ? null : writeBuffer);
                break;
            case SSRPass.OUTPUT.Depth:
                this.renderPass(renderer, this.depthRenderMaterial, this.renderToScreen ? null : writeBuffer);
                break;
            case SSRPass.OUTPUT.Normal:
                this.copyMaterial.uniforms['tDiffuse'].value = this.normalRenderTarget.texture;
                this.copyMaterial.blending = three_1.NoBlending;
                this.renderPass(renderer, this.copyMaterial, this.renderToScreen ? null : writeBuffer);
                break;
            case SSRPass.OUTPUT.Metalness:
                this.copyMaterial.uniforms['tDiffuse'].value = this.metalnessRenderTarget.texture;
                this.copyMaterial.blending = three_1.NoBlending;
                this.renderPass(renderer, this.copyMaterial, this.renderToScreen ? null : writeBuffer);
                break;
            default:
                console.warn('THREE.SSRPass: Unknown output type.');
        }
    }
    renderPass(renderer, passMaterial, renderTarget, clearColor, clearAlpha) {
        // save original state
        this.originalClearColor.copy(renderer.getClearColor(this.tempColor));
        const originalClearAlpha = renderer.getClearAlpha(this.tempColor);
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
        this.originalClearColor.copy(renderer.getClearColor(this.tempColor));
        const originalClearAlpha = renderer.getClearAlpha(this.tempColor);
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
    renderMetalness(renderer, overrideMaterial, renderTarget, clearColor, clearAlpha) {
        this.originalClearColor.copy(renderer.getClearColor(this.tempColor));
        const originalClearAlpha = renderer.getClearAlpha(this.tempColor);
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
        this.scene.traverseVisible((child) => {
            child._SSRPassBackupMaterial = child.material;
            if (this._selects.includes(child)) {
                child.material = this.metalnessOnMaterial;
            }
            else {
                child.material = this.metalnessOffMaterial;
            }
        });
        renderer.render(this.scene, this.camera);
        this.scene.traverseVisible((child) => {
            child.material = child._SSRPassBackupMaterial;
        });
        // restore original state
        renderer.autoClear = originalAutoClear;
        renderer.setClearColor(this.originalClearColor);
        renderer.setClearAlpha(originalClearAlpha);
    }
    setSize(width, height) {
        this.width = width;
        this.height = height;
        this.ssrMaterial.defines.MAX_STEP = Math.sqrt(width * width + height * height);
        this.ssrMaterial.needsUpdate = true;
        this.beautyRenderTarget.setSize(width, height);
        this.prevRenderTarget.setSize(width, height);
        this.ssrRenderTarget.setSize(width, height);
        this.normalRenderTarget.setSize(width, height);
        this.metalnessRenderTarget.setSize(width, height);
        this.blurRenderTarget.setSize(width, height);
        this.blurRenderTarget2.setSize(width, height);
        // this.blurRenderTarget3.setSize(width, height);
        this.ssrMaterial.uniforms['resolution'].value.set(width, height);
        this.ssrMaterial.uniforms['cameraProjectionMatrix'].value.copy(this.camera.projectionMatrix);
        this.ssrMaterial.uniforms['cameraInverseProjectionMatrix'].value.copy(this.camera.projectionMatrixInverse);
        this.blurMaterial.uniforms['resolution'].value.set(width, height);
        this.blurMaterial2.uniforms['resolution'].value.set(width, height);
    }
}
exports.SSRPass = SSRPass;
SSRPass.OUTPUT = {
    Default: 0,
    SSR: 1,
    Beauty: 3,
    Depth: 4,
    Normal: 5,
    Metalness: 7,
};
