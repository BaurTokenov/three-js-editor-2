"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrigonometryEditor = void 0;
const flow_module_1 = require("../../libs/flow.module");
const BaseNode_1 = require("../core/BaseNode");
const three_1 = require("three");
const Nodes_1 = require("three-nodes/Nodes");
const DEFAULT_VALUE = new Nodes_1.UniformNode(new three_1.Vector3());
class TrigonometryEditor extends BaseNode_1.BaseNode {
    constructor() {
        const node = new Nodes_1.MathNode(Nodes_1.MathNode.SIN, DEFAULT_VALUE);
        super('Trigonometry', 1, node, 175);
        const optionsField = new flow_module_1.SelectInput([
            { name: 'Sin', value: Nodes_1.MathNode.SIN },
            { name: 'Cos', value: Nodes_1.MathNode.COS },
            { name: 'Tan', value: Nodes_1.MathNode.TAN },
            { name: 'asin', value: Nodes_1.MathNode.ASIN },
            { name: 'acos', value: Nodes_1.MathNode.ACOS },
            { name: 'atan', value: Nodes_1.MathNode.ATAN },
        ], Nodes_1.MathNode.SIN).onChange(() => {
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
exports.TrigonometryEditor = TrigonometryEditor;
