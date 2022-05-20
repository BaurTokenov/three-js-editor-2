"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CubeTexturePass = void 0;
const three_1 = require("three");
const Pass_1 = require("./Pass");
class CubeTexturePass extends Pass_1.Pass {
    constructor(camera, envMap, opacity = 1) {
        super();
        this.camera = camera;
        this.needsSwap = false;
        this.cubeShader = three_1.ShaderLib['cube'];
        this.cubeMesh = new three_1.Mesh(new three_1.BoxGeometry(10, 10, 10), new three_1.ShaderMaterial({
            uniforms: three_1.UniformsUtils.clone(this.cubeShader.uniforms),
            vertexShader: this.cubeShader.vertexShader,
            fragmentShader: this.cubeShader.fragmentShader,
            depthTest: false,
            depthWrite: false,
            side: three_1.BackSide,
        }));
        Object.defineProperty(this.cubeMesh.material, 'envMap', {
            get: function () {
                return this.uniforms.envMap.value;
            },
        });
        this.envMap = envMap;
        this.opacity = opacity;
        this.cubeScene = new three_1.Scene();
        this.cubeCamera = new three_1.PerspectiveCamera();
        this.cubeScene.add(this.cubeMesh);
    }
    render(renderer, writeBuffer, readBuffer /*, deltaTime, maskActive*/) {
        const oldAutoClear = renderer.autoClear;
        renderer.autoClear = false;
        this.cubeCamera.projectionMatrix.copy(this.camera.projectionMatrix);
        this.cubeCamera.quaternion.setFromRotationMatrix(this.camera.matrixWorld);
        this.cubeMesh.material.uniforms.envMap.value = this.envMap;
        this.cubeMesh.material.uniforms.flipEnvMap.value =
            this.envMap.isCubeTexture && this.envMap.isRenderTargetTexture === false ? -1 : 1;
        this.cubeMesh.material.uniforms.opacity.value = this.opacity;
        this.cubeMesh.material.transparent = this.opacity < 1.0;
        renderer.setRenderTarget(this.renderToScreen ? null : readBuffer);
        if (this.clear)
            renderer.clear();
        renderer.render(this.cubeScene, this.cubeCamera);
        renderer.autoClear = oldAutoClear;
    }
}
exports.CubeTexturePass = CubeTexturePass;
