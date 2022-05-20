"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatcapUVEditor = void 0;
const BaseNode_1 = require("../core/BaseNode");
const Nodes_1 = require("three-nodes/Nodes");
class MatcapUVEditor extends BaseNode_1.BaseNode {
    constructor() {
        const node = new Nodes_1.MatcapUVNode();
        super('Matcap UV', 2, node, 200);
    }
}
exports.MatcapUVEditor = MatcapUVEditor;
