"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperatorEditor = void 0;
const flow_module_1 = require("../../libs/flow.module");
const Nodes_1 = require("three-nodes/Nodes");
const BaseNode_1 = require("../core/BaseNode");
class OperatorEditor extends BaseNode_1.BaseNode {
    constructor() {
        const NULL_VALUE = new Nodes_1.UniformNode(0);
        const node = new Nodes_1.OperatorNode('+', NULL_VALUE, NULL_VALUE);
        super('Operator', 1, node, 150);
        const opInput = new flow_module_1.SelectInput([
            { name: 'Addition ( + )', value: '+' },
            { name: 'Subtraction ( - )', value: '-' },
            { name: 'Multiplication ( * )', value: '*' },
            { name: 'Division ( / )', value: '/' },
        ], '+');
        opInput.onChange((data) => {
            node.op = data.getValue();
            this.invalidate();
        });
        const aElement = new flow_module_1.LabelElement('A').setInput(3);
        const bElement = new flow_module_1.LabelElement('B').setInput(3);
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
        this.add(new flow_module_1.Element().add(opInput)).add(aElement).add(bElement);
    }
}
exports.OperatorEditor = OperatorEditor;
