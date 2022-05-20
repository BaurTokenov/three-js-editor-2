"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckerEditor = void 0;
const flow_module_1 = require("../../libs/flow.module");
const BaseNode_1 = require("../core/BaseNode");
const Nodes_1 = require("three-nodes/Nodes");
const defaultUV = new Nodes_1.UVNode();
class CheckerEditor extends BaseNode_1.BaseNode {
    constructor() {
        const node = new Nodes_1.CheckerNode(defaultUV);
        super('Checker', 1, node, 200);
        const field = new flow_module_1.LabelElement('UV').setInput(2);
        field.onConnect(() => {
            node.uvNode = field.getLinkedObject() || defaultUV;
        });
        this.add(field);
    }
}
exports.CheckerEditor = CheckerEditor;
