"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SplitEditor = void 0;
const flow_module_1 = require("../../libs/flow.module");
const BaseNode_1 = require("../core/BaseNode");
const Nodes_1 = require("three-nodes/Nodes");
const NULL_VALUE = new Nodes_1.UniformNode(0);
class SplitEditor extends BaseNode_1.BaseNode {
    constructor() {
        const node = new Nodes_1.SplitNode(NULL_VALUE, 'x');
        super('Split', 1, node, 175);
        const componentsField = new flow_module_1.SelectInput([
            { name: 'X | R', value: 'x' },
            { name: 'Y | G', value: 'y' },
            { name: 'Z | B', value: 'z' },
            { name: 'W | A', value: 'w' },
        ], node.components).onChange(() => {
            node.components = componentsField.getValue();
            this.invalidate();
        });
        const componentsElement = new flow_module_1.Element()
            .add(componentsField)
            .setInput(1)
            .onConnect(() => {
            node.node = componentsElement.getLinkedObject() || NULL_VALUE;
        });
        this.add(componentsElement);
    }
}
exports.SplitEditor = SplitEditor;
