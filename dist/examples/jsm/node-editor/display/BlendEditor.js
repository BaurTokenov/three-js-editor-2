"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlendEditor = void 0;
const flow_module_1 = require("../../libs/flow.module");
const BaseNode_1 = require("../core/BaseNode");
const Nodes_1 = require("three-nodes/Nodes");
const NULL_VALUE = new Nodes_1.UniformNode(0);
const ONE_VALUE = new Nodes_1.UniformNode(1);
class BlendEditor extends BaseNode_1.BaseNode {
    constructor() {
        const node = new Nodes_1.MathNode(Nodes_1.MathNode.MIX, NULL_VALUE, NULL_VALUE, ONE_VALUE);
        super('Blend', 3, node, 200);
        const aElement = new flow_module_1.LabelElement('Base').setInput(3);
        const bElement = new flow_module_1.LabelElement('Blend').setInput(3);
        const cElement = new flow_module_1.LabelElement('Opacity').setInput(1);
        aElement.onConnect(() => {
            node.aNode = aElement.getLinkedObject() || NULL_VALUE;
        });
        bElement.onConnect(() => {
            node.bNode = bElement.getLinkedObject() || NULL_VALUE;
        });
        cElement.onConnect(() => {
            node.cNode = cElement.getLinkedObject() || ONE_VALUE;
        });
        this.add(aElement).add(bElement).add(cElement);
    }
}
exports.BlendEditor = BlendEditor;
