"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PositionEditor = void 0;
const flow_module_1 = require("../../libs/flow.module");
const BaseNode_1 = require("../core/BaseNode");
const Nodes_1 = require("three-nodes/Nodes");
class PositionEditor extends BaseNode_1.BaseNode {
    constructor() {
        const node = new Nodes_1.PositionNode();
        super('Position', 3, node, 200);
        const optionsField = new flow_module_1.SelectInput([
            { name: 'Local', value: Nodes_1.PositionNode.LOCAL },
            { name: 'World', value: Nodes_1.PositionNode.WORLD },
            { name: 'View', value: Nodes_1.PositionNode.VIEW },
            { name: 'View Direction', value: Nodes_1.PositionNode.VIEW_DIRECTION },
        ], Nodes_1.PositionNode.LOCAL).onChange(() => {
            node.scope = optionsField.getValue();
            this.invalidate();
        });
        this.add(new flow_module_1.Element().add(optionsField));
    }
}
exports.PositionEditor = PositionEditor;
