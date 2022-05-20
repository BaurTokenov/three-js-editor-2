"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DotEditor = void 0;
const flow_module_1 = require("../../libs/flow.module");
const BaseNode_1 = require("../core/BaseNode");
const Nodes_1 = require("three-nodes/Nodes");
const NULL_VALUE = new Nodes_1.UniformNode(0);
class DotEditor extends BaseNode_1.BaseNode {
    constructor() {
        const node = new Nodes_1.MathNode(Nodes_1.MathNode.DOT, NULL_VALUE, NULL_VALUE);
        super('Dot Product', 1, node, 175);
        const aElement = new flow_module_1.LabelElement('A').setInput(3);
        const bElement = new flow_module_1.LabelElement('B').setInput(3);
        aElement.onConnect(() => {
            node.aNode = aElement.getLinkedObject() || NULL_VALUE;
        });
        bElement.onConnect(() => {
            node.bNode = bElement.getLinkedObject() || NULL_VALUE;
        });
        this.add(aElement).add(bElement);
    }
}
exports.DotEditor = DotEditor;
