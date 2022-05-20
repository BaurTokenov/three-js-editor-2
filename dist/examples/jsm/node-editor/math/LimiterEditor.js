"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LimiterEditor = void 0;
const flow_module_1 = require("../../libs/flow.module");
const BaseNode_1 = require("../core/BaseNode");
const Nodes_1 = require("three-nodes/Nodes");
class LimiterEditor extends BaseNode_1.BaseNode {
    constructor() {
        const NULL_VALUE = new Nodes_1.UniformNode(0);
        const node = new Nodes_1.MathNode(Nodes_1.MathNode.MIN, NULL_VALUE, NULL_VALUE);
        super('Limiter', 1, node, 175);
        const methodInput = new flow_module_1.SelectInput([
            { name: 'Min', value: Nodes_1.MathNode.MIN },
            { name: 'Max', value: Nodes_1.MathNode.MAX },
            // { name: 'Clamp', value: MathNode.CLAMP }
            { name: 'Saturate', value: Nodes_1.MathNode.SATURATE },
        ], Nodes_1.MathNode.MIN);
        methodInput.onChange((data) => {
            node.method = data.getValue();
            bElement.setVisible(data.getValue() !== Nodes_1.MathNode.SATURATE);
            this.invalidate();
        });
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
        this.add(new flow_module_1.Element().add(methodInput)).add(aElement).add(bElement);
    }
}
exports.LimiterEditor = LimiterEditor;
