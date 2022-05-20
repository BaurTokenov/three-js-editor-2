"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const WebGPUNodeBuilder_1 = __importDefault(require("./WebGPUNodeBuilder"));
const NodeFrame_1 = __importDefault(require("three-nodes/core/NodeFrame"));
class WebGPUNodes {
    constructor(renderer, properties) {
        this.renderer = renderer;
        this.properties = properties;
        this.nodeFrame = new NodeFrame_1.default();
    }
    get(object) {
        const objectProperties = this.properties.get(object);
        let nodeBuilder = objectProperties.nodeBuilder;
        if (nodeBuilder === undefined) {
            const scene = objectProperties.scene;
            const lightsNode = objectProperties.lightsNode;
            nodeBuilder = new WebGPUNodeBuilder_1.default(object, this.renderer);
            nodeBuilder.lightsNode = lightsNode;
            nodeBuilder.fogNode = scene === null || scene === void 0 ? void 0 : scene.fogNode;
            nodeBuilder.scene = scene;
            nodeBuilder.build();
            objectProperties.nodeBuilder = nodeBuilder;
        }
        return nodeBuilder;
    }
    remove(object) {
        const objectProperties = this.properties.get(object);
        delete objectProperties.nodeBuilder;
    }
    updateFrame() {
        this.nodeFrame.update();
    }
    update(object, camera) {
        const renderer = this.renderer;
        const material = object.material;
        const nodeBuilder = this.get(object);
        const nodeFrame = this.nodeFrame;
        nodeFrame.object = object;
        nodeFrame.camera = camera;
        nodeFrame.renderer = renderer;
        nodeFrame.material = material;
        for (const node of nodeBuilder.updateNodes) {
            nodeFrame.updateNode(node);
        }
    }
    dispose() {
        this.nodeFrame = new NodeFrame_1.default();
    }
}
exports.default = WebGPUNodes;
