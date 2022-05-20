"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PowerEditor = void 0;
const flow_module_1 = require("../../libs/flow.module");
const BaseNode_1 = require("../core/BaseNode");
const Nodes_1 = require("three-nodes/Nodes");
class PowerEditor extends BaseNode_1.BaseNode {
    constructor() {
        const NULL_VALUE = new Nodes_1.UniformNode(0);
        const node = new Nodes_1.MathNode(Nodes_1.MathNode.POW, NULL_VALUE, NULL_VALUE);
        super('Power', 1, node, 175);
        const aElement = new flow_module_1.LabelElement('A').setInput(1);
        const bElement = new flow_module_1.LabelElement('B').setInput(1);
        aElement
            .add(new flow_module_1.NumberInput().onChange((field) => {
            node.aNode.value = field.getValue();
        }))
            .onConnect((elmt) => {
            elmt.setEnabledInputs(!elmt.getLinkedObject());
            node.aNode = elmt.getLinkedObject() || NULL_VALUE;
        });
        bElement
            .add(new flow_module_1.NumberInput().onChange((field) => {
            node.bNode.value = field.getValue();
        }))
            .onConnect((elmt) => {
            elmt.setEnabledInputs(!elmt.getLinkedObject());
            node.bNode = elmt.getLinkedObject() || NULL_VALUE;
        });
        this.add(aElement).add(bElement);
    }
}
exports.PowerEditor = PowerEditor;
