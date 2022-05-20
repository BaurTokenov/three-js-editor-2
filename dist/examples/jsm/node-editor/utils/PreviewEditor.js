"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreviewEditor = void 0;
const OrbitControls_1 = require("three-addons/controls/OrbitControls");
const ViewHelper_1 = require("three-addons/helpers/ViewHelper");
const flow_module_1 = require("../../libs/flow.module");
const BaseNode_1 = require("../core/BaseNode");
const Nodes_1 = require("three-nodes/Nodes");
const three_1 = require("three");
const nullValue = new Nodes_1.ConstNode(0);
const sceneDict = {};
const getScene = (name) => {
    let scene = sceneDict[name];
    if (scene === undefined) {
        scene = new three_1.Scene();
        if (name === 'box') {
            const box = new three_1.Mesh(new three_1.BoxGeometry(1.3, 1.3, 1.3));
            scene.add(box);
        }
        else if (name === 'sphere') {
            const sphere = new three_1.Mesh(new three_1.SphereGeometry(1, 32, 16));
            scene.add(sphere);
        }
        else if (name === 'plane' || name === 'sprite') {
            const plane = new three_1.Mesh(new three_1.PlaneGeometry(2, 2));
            scene.add(plane);
        }
        else if (name === 'torus') {
            const torus = new three_1.Mesh(new three_1.TorusKnotGeometry(0.7, 0.1, 100, 16));
            scene.add(torus);
        }
        sceneDict[name] = scene;
    }
    return scene;
};
class PreviewEditor extends BaseNode_1.BaseNode {
    constructor() {
        const width = 300;
        const height = 300;
        super('Preview', 0, null, height);
        const material = new Nodes_1.MeshBasicNodeMaterial();
        material.colorNode = nullValue;
        material.side = three_1.DoubleSide;
        material.transparent = true;
        const previewElement = new flow_module_1.Element();
        previewElement.dom.style['padding-top'] = 0;
        previewElement.dom.style['padding-bottom'] = 0;
        const sceneInput = new flow_module_1.SelectInput([
            { name: 'Box', value: 'box' },
            { name: 'Sphere', value: 'sphere' },
            { name: 'Plane', value: 'plane' },
            { name: 'Sprite', value: 'sprite' },
            { name: 'Torus', value: 'torus' },
        ], 'box');
        const inputElement = new flow_module_1.LabelElement('Input').setInput(4).onConnect(() => {
            material.colorNode = inputElement.getLinkedObject() || nullValue;
            material.dispose();
        }, true);
        const canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        previewElement.dom.append(canvas);
        previewElement.setHeight(height);
        const renderer = new three_1.WebGLRenderer({
            canvas,
            alpha: true,
        });
        renderer.autoClear = false;
        renderer.setSize(width, height, true);
        renderer.setPixelRatio(window.devicePixelRatio);
        const camera = new three_1.PerspectiveCamera(45, width / height, 0.1, 100);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        camera.position.set(-2, 2, 2);
        camera.lookAt(0, 0, 0);
        const controls = new OrbitControls_1.OrbitControls(camera, previewElement.dom);
        controls.enableKeys = false;
        controls.update();
        const viewHelper = new ViewHelper_1.ViewHelper(camera, previewElement.dom);
        this.sceneInput = sceneInput;
        this.viewHelper = viewHelper;
        this.material = material;
        this.camera = camera;
        this.renderer = renderer;
        this.add(inputElement).add(new flow_module_1.LabelElement('Object').add(sceneInput)).add(previewElement);
    }
    setEditor(editor) {
        super.setEditor(editor);
        this.updateAnimationRequest();
    }
    updateAnimationRequest() {
        if (this.editor !== null) {
            requestAnimationFrame(() => this.update());
        }
    }
    update() {
        const { viewHelper, material, renderer, camera, sceneInput } = this;
        this.updateAnimationRequest();
        const sceneName = sceneInput.getValue();
        const scene = getScene(sceneName);
        const mesh = scene.children[0];
        mesh.material = material;
        if (sceneName === 'sprite') {
            mesh.lookAt(camera.position);
        }
        renderer.clear();
        renderer.render(scene, camera);
        viewHelper.render(renderer);
    }
}
exports.PreviewEditor = PreviewEditor;
