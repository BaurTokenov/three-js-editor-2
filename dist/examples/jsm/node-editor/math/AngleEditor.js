"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AngleEditor = void 0;
const flow_module_1 = require("../../libs/flow.module");
const BaseNode_1 = require("../core/BaseNode");
const three_1 = require("three");
const Nodes_1 = require("three-nodes/Nodes");
const DEFAULT_VALUE = new Nodes_1.UniformNode(new three_1.Vector3());
class AngleEditor extends BaseNode_1.BaseNode {
    constructor() {
        const node = new Nodes_1.MathNode(Nodes_1.MathNode.SIN, DEFAULT_VALUE);
        super('Angle', 1, node, 175);
        const optionsField = new flow_module_1.SelectInput([
            { name: 'Degrees to Radians', value: Nodes_1.MathNode.RAD },
            { name: 'Radians to Degrees', value: Nodes_1.MathNode.DEG },
        ], Nodes_1.MathNode.RAD).onChange(() => {
            node.method = optionsField.getValue();
            this.invalidate();
        });
        const input = new flow_module_1.LabelElement('A').setInput(1);
        input.onConnect(() => {
            node.aNode = input.getLinkedObject() || DEFAULT_VALUE;
        });
        this.add(new flow_module_1.Element().add(optionsField)).add(input);
    }
}
exports.AngleEditor = AngleEditor;
