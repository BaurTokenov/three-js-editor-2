"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvertEditor = void 0;
const flow_module_1 = require("../../libs/flow.module");
const BaseNode_1 = require("../core/BaseNode");
const Nodes_1 = require("three-nodes/Nodes");
const DEFAULT_VALUE = new Nodes_1.UniformNode(0);
class InvertEditor extends BaseNode_1.BaseNode {
    constructor() {
        const node = new Nodes_1.MathNode(Nodes_1.MathNode.INVERT, DEFAULT_VALUE);
        super('Invert / Negate', 1, node, 175);
        const optionsField = new flow_module_1.SelectInput([
            { name: 'Invert ( 1 - Source )', value: Nodes_1.MathNode.INVERT },
            { name: 'Negate ( - Source )', value: Nodes_1.MathNode.NEGATE },
        ], Nodes_1.MathNode.INVERT).onChange(() => {
            node.method = optionsField.getValue();
            this.invalidate();
        });
        const input = new flow_module_1.LabelElement('Source').setInput(1);
        input.onConnect(() => {
            node.aNode = input.getLinkedObject() || DEFAULT_VALUE;
        });
        this.add(new flow_module_1.LabelElement('Method').add(optionsField)).add(input);
    }
}
exports.InvertEditor = InvertEditor;
