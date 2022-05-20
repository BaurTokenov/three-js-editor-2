"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NormalizeEditor = void 0;
const flow_module_1 = require("../../libs/flow.module");
const BaseNode_1 = require("../core/BaseNode");
const three_1 = require("three");
const Nodes_1 = require("three-nodes/Nodes");
const DEFAULT_VALUE = new Nodes_1.UniformNode(new three_1.Vector3());
class NormalizeEditor extends BaseNode_1.BaseNode {
    constructor() {
        const node = new Nodes_1.MathNode(Nodes_1.MathNode.NORMALIZE, DEFAULT_VALUE);
        super('Normalize', 3, node, 175);
        const input = new flow_module_1.LabelElement('A').setInput(3);
        input.onConnect(() => {
            node.aNode = input.getLinkedObject() || DEFAULT_VALUE;
        });
        this.add(input);
    }
}
exports.NormalizeEditor = NormalizeEditor;
