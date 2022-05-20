"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const THREE = __importStar(require("../../../build/three.module"));
let camera, scene, renderer, group;
function init(canvas, width, height, pixelRatio, path) {
    camera = new THREE.PerspectiveCamera(40, width / height, 1, 1000);
    camera.position.z = 200;
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x444466, 100, 400);
    scene.background = new THREE.Color(0x444466);
    group = new THREE.Group();
    scene.add(group);
    // we don't use ImageLoader since it has a DOM dependency (HTML5 image element)
    const loader = new THREE.ImageBitmapLoader().setPath(path);
    loader.setOptions({ imageOrientation: 'flipY' });
    loader.load('textures/matcaps/matcap-porcelain-white.jpg', function (imageBitmap) {
        const texture = new THREE.CanvasTexture(imageBitmap);
        const geometry = new THREE.IcosahedronGeometry(5, 8);
        const materials = [
            new THREE.MeshMatcapMaterial({ color: 0xaa24df, matcap: texture }),
            new THREE.MeshMatcapMaterial({ color: 0x605d90, matcap: texture }),
            new THREE.MeshMatcapMaterial({ color: 0xe04a3f, matcap: texture }),
            new THREE.MeshMatcapMaterial({ color: 0xe30456, matcap: texture }),
        ];
        for (let i = 0; i < 100; i += 1) {
            const material = materials[i % materials.length];
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.x = random() * 200 - 100;
            mesh.position.y = random() * 200 - 100;
            mesh.position.z = random() * 200 - 100;
            mesh.scale.setScalar(random() + 1);
            group.add(mesh);
        }
        renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas });
        renderer.setPixelRatio(pixelRatio);
        renderer.setSize(width, height, false);
        animate();
    });
}
function animate() {
    // group.rotation.x = Date.now() / 4000;
    group.rotation.y = -Date.now() / 4000;
    renderer.render(scene, camera);
    if (self.requestAnimationFrame) {
        self.requestAnimationFrame(animate);
    }
    else {
        // Firefox
    }
}
// PRNG
let seed = 1;
function random() {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}
exports.default = init;
