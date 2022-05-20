"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParallaxBarrierEffect = void 0;
const three_1 = require("three");
class ParallaxBarrierEffect {
    constructor(renderer) {
        const _camera = new three_1.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        const _scene = new three_1.Scene();
        const _stereo = new three_1.StereoCamera();
        const _params = { minFilter: three_1.LinearFilter, magFilter: three_1.NearestFilter, format: three_1.RGBAFormat };
        const _renderTargetL = new three_1.WebGLRenderTarget(512, 512, _params);
        const _renderTargetR = new three_1.WebGLRenderTarget(512, 512, _params);
        const _material = new three_1.ShaderMaterial({
            uniforms: {
                'mapLeft': { value: _renderTargetL.texture },
                'mapRight': { value: _renderTargetR.texture }
            },
            vertexShader: [
                'varying vec2 vUv;',
                'void main() {',
                '	vUv = vec2( uv.x, uv.y );',
                '	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
                '}'
            ].join('\n'),
            fragmentShader: [
                'uniform sampler2D mapLeft;',
                'uniform sampler2D mapRight;',
                'varying vec2 vUv;',
                'void main() {',
                '	vec2 uv = vUv;',
                '	if ( ( mod( gl_FragCoord.y, 2.0 ) ) > 1.00 ) {',
                '		gl_FragColor = texture2D( mapLeft, uv );',
                '	} else {',
                '		gl_FragColor = texture2D( mapRight, uv );',
                '	}',
                '}'
            ].join('\n')
        });
        const mesh = new three_1.Mesh(new three_1.PlaneGeometry(2, 2), _material);
        _scene.add(mesh);
        this.setSize = function (width, height) {
            renderer.setSize(width, height);
            const pixelRatio = renderer.getPixelRatio();
            _renderTargetL.setSize(width * pixelRatio, height * pixelRatio);
            _renderTargetR.setSize(width * pixelRatio, height * pixelRatio);
        };
        this.render = function (scene, camera) {
            scene.updateMatrixWorld();
            if (camera.parent === null)
                camera.updateMatrixWorld();
            _stereo.update(camera);
            renderer.setRenderTarget(_renderTargetL);
            renderer.clear();
            renderer.render(scene, _stereo.cameraL);
            renderer.setRenderTarget(_renderTargetR);
            renderer.clear();
            renderer.render(scene, _stereo.cameraR);
            renderer.setRenderTarget(null);
            renderer.render(_scene, _camera);
        };
    }
}
exports.ParallaxBarrierEffect = ParallaxBarrierEffect;
