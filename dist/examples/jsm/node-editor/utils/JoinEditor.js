"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoinEditor = void 0;
const flow_module_1 = require("../../libs/flow.module");
const BaseNode_1 = require("../core/BaseNode");
const Nodes_1 = require("three-nodes/Nodes");
const NULL_VALUE = new Nodes_1.UniformNode(0);
class JoinEditor extends BaseNode_1.BaseNode {
    constructor() {
        const node = new Nodes_1.JoinNode();
        super('Join', 1, node, 175);
        const update = () => {
            const values = [
                xElement.getLinkedObject(),
                yElement.getLinkedObject(),
                zElement.getLinkedObject(),
                wElement.getLinkedObject(),
            ];
            let length = 1;
            if (values[3] !== null)
                length = 4;
            else if (values[2] !== null)
                length = 3;
            else if (values[1] !== null)
                length = 2;
            const nodes = [];
            for (let i = 0; i < length; i += 1) {
                nodes.push(values[i] || NULL_VALUE);
            }
            node.nodes = nodes;
            this.invalidate();
        };
        const xElement = new flow_module_1.LabelElement('X | R').setInput(1).onConnect(update);
        const yElement = new flow_module_1.LabelElement('Y | G').setInput(1).onConnect(update);
        const zElement = new flow_module_1.LabelElement('Z | B').setInput(1).onConnect(update);
        const wElement = new flow_module_1.LabelElement('W | A').setInput(1).onConnect(update);
        this.add(xElement).add(yElement).add(zElement).add(wElement);
        update();
    }
}
exports.JoinEditor = JoinEditor;
