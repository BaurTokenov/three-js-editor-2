"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NormalEditor = void 0;
const flow_module_1 = require("../../libs/flow.module");
const BaseNode_1 = require("../core/BaseNode");
const Nodes_1 = require("three-nodes/Nodes");
class NormalEditor extends BaseNode_1.BaseNode {
    constructor() {
        const node = new Nodes_1.NormalNode();
        super('Normal', 3, node, 200);
        const optionsField = new flow_module_1.SelectInput([
            { name: 'Local', value: Nodes_1.NormalNode.LOCAL },
            { name: 'World', value: Nodes_1.NormalNode.WORLD },
            { name: 'View', value: Nodes_1.NormalNode.VIEW },
            { name: 'Geometry', value: Nodes_1.NormalNode.GEOMETRY },
        ], Nodes_1.NormalNode.LOCAL).onChange(() => {
            node.scope = optionsField.getValue();
            this.invalidate();
        });
        this.add(new flow_module_1.Element().add(optionsField));
    }
}
exports.NormalEditor = NormalEditor;
