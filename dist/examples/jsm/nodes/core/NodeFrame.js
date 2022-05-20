"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
class NodeFrame {
    constructor() {
        this.time = 0;
        this.deltaTime = 0;
        this.frameId = 0;
        this.startTime = null;
        this.updateMap = new WeakMap();
        this.renderer = null;
        this.material = null;
        this.camera = null;
        this.object = null;
    }
    updateNode(node) {
        if (node.updateType === constants_1.NodeUpdateType.Frame) {
            if (this.updateMap.get(node) !== this.frameId) {
                this.updateMap.set(node, this.frameId);
                node.update(this);
            }
        }
        else if (node.updateType === constants_1.NodeUpdateType.Object) {
            node.update(this);
        }
    }
    update() {
        this.frameId++;
        if (this.lastTime === undefined)
            this.lastTime = performance.now();
        this.deltaTime = (performance.now() - this.lastTime) / 1000;
        this.lastTime = performance.now();
        this.time += this.deltaTime;
    }
}
exports.default = NodeFrame;
