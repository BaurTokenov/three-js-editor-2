"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LightsNode_1 = __importDefault(require("three-nodes/lighting/LightsNode"));
class WebGPURenderState {
    constructor() {
        this.lightsNode = new LightsNode_1.default();
        this.lightsArray = [];
    }
    init() {
        this.lightsArray.length = 0;
    }
    pushLight(light) {
        this.lightsArray.push(light);
    }
    getLightsNode() {
        return this.lightsNode.fromLights(this.lightsArray);
    }
}
class WebGPURenderStates {
    constructor() {
        this.renderStates = new WeakMap();
    }
    get(scene, camera) {
        const renderStates = this.renderStates;
        let renderState = renderStates.get(scene);
        if (renderState === undefined) {
            renderState = new WebGPURenderState();
            renderStates.set(scene, renderState);
        }
        return renderState;
    }
    dispose() {
        this.renderStates = new WeakMap();
    }
}
exports.default = WebGPURenderStates;
