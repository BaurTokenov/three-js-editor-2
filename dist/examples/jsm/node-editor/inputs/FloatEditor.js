"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloatEditor = void 0;
const flow_module_1 = require("../../libs/flow.module");
const BaseNode_1 = require("../core/BaseNode");
const Nodes_1 = require("three-nodes/Nodes");
class FloatEditor extends BaseNode_1.BaseNode {
    constructor() {
        const node = new Nodes_1.UniformNode(0);
        super('Float', 1, node, 150);
        const field = new flow_module_1.NumberInput().setTagColor('red').onChange(() => {
            node.value = field.getValue();
        });
        this.add(new flow_module_1.Element().add(field));
    }
}
exports.FloatEditor = FloatEditor;
