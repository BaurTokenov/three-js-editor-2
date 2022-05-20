"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UVEditor = void 0;
const flow_module_1 = require("../../libs/flow.module");
const BaseNode_1 = require("../core/BaseNode");
const Nodes_1 = require("three-nodes/Nodes");
class UVEditor extends BaseNode_1.BaseNode {
    constructor() {
        const node = new Nodes_1.UVNode();
        super('UV', 2, node, 200);
        const optionsField = new flow_module_1.SelectInput(['1', '2'], 0).onChange(() => {
            node.index = Number(optionsField.getValue());
            this.invalidate();
        });
        this.add(new flow_module_1.LabelElement('Channel').add(optionsField));
    }
}
exports.UVEditor = UVEditor;
