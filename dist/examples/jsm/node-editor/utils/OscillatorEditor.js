"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OscillatorEditor = void 0;
const flow_module_1 = require("../../libs/flow.module");
const BaseNode_1 = require("../core/BaseNode");
const Nodes_1 = require("three-nodes/Nodes");
const NULL_VALUE = new Nodes_1.UniformNode(0);
class OscillatorEditor extends BaseNode_1.BaseNode {
    constructor() {
        const node = new Nodes_1.OscNode(Nodes_1.OscNode.SINE, NULL_VALUE);
        super('Oscillator', 1, node, 175);
        const methodInput = new flow_module_1.SelectInput([
            { name: 'Sine', value: Nodes_1.OscNode.SINE },
            { name: 'Square', value: Nodes_1.OscNode.SQUARE },
            { name: 'Triangle', value: Nodes_1.OscNode.TRIANGLE },
            { name: 'Sawtooth', value: Nodes_1.OscNode.SAWTOOTH },
        ], Nodes_1.OscNode.SINE);
        methodInput.onChange(() => {
            node.method = methodInput.getValue();
            this.invalidate();
        });
        const timeElement = new flow_module_1.LabelElement('Time').setInput(1);
        timeElement.onConnect(() => {
            node.timeNode = timeElement.getLinkedObject() || NULL_VALUE;
        });
        this.add(new flow_module_1.Element().add(methodInput)).add(timeElement);
    }
}
exports.OscillatorEditor = OscillatorEditor;
