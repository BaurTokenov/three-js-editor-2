"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const three_1 = require("three");
class NodeMaterialLoader extends three_1.MaterialLoader {
    constructor(manager) {
        super(manager);
        this.nodes = {};
    }
    parse(json) {
        const material = super.parse(json);
        const nodes = this.nodes;
        const inputNodes = json.inputNodes;
        for (const property in inputNodes) {
            const uuid = inputNodes[property];
            material[property] = nodes[uuid];
        }
        return material;
    }
    setNodes(value) {
        this.nodes = value;
        return this;
    }
}
exports.default = NodeMaterialLoader;
