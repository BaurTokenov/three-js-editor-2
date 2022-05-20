"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeFrame = void 0;
const WebGLNodeBuilder_1 = require("./WebGLNodeBuilder");
const NodeFrame_1 = __importDefault(require("three-nodes/core/NodeFrame"));
const three_1 = require("three");
const builders = new WeakMap();
exports.nodeFrame = new NodeFrame_1.default();
three_1.Material.prototype.onBuild = function (object, parameters, renderer) {
    builders.set(this, new WebGLNodeBuilder_1.WebGLNodeBuilder(object, renderer, parameters).build());
};
three_1.Material.prototype.onBeforeRender = function (renderer, scene, camera, geometry, object) {
    const nodeBuilder = builders.get(this);
    if (nodeBuilder !== undefined) {
        exports.nodeFrame.material = this;
        exports.nodeFrame.camera = camera;
        exports.nodeFrame.object = object;
        exports.nodeFrame.renderer = renderer;
        const updateNodes = nodeBuilder.updateNodes;
        if (updateNodes.length > 0) {
            // force refresh material uniforms
            renderer.state.useProgram(null);
            //this.uniformsNeedUpdate = true;
            for (const node of updateNodes) {
                exports.nodeFrame.updateNode(node);
            }
        }
    }
};
