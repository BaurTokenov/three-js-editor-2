"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NormalMapEditor = void 0;
const flow_module_1 = require("../../libs/flow.module");
const BaseNode_1 = require("../core/BaseNode");
const Nodes_1 = require("three-nodes/Nodes");
const three_1 = require("three");
const nullValue = new Nodes_1.ConstNode(0);
class NormalMapEditor extends BaseNode_1.BaseNode {
    constructor() {
        const node = new Nodes_1.NormalMapNode(nullValue);
        super('Normal Map', 3, node, 175);
        const source = new flow_module_1.LabelElement('Source').setInput(3).onConnect(() => {
            node.node = source.getLinkedObject() || nullValue;
            this.invalidate();
        });
        const scale = new flow_module_1.LabelElement('Scale').setInput(3).onConnect(() => {
            node.scaleNode = scale.getLinkedObject();
            this.invalidate();
        });
        const optionsField = new flow_module_1.SelectInput([
            { name: 'Tangent Space', value: three_1.TangentSpaceNormalMap },
            { name: 'Object Space', value: three_1.ObjectSpaceNormalMap },
        ], three_1.TangentSpaceNormalMap).onChange(() => {
            node.normalMapType = Number(optionsField.getValue());
            this.invalidate();
        });
        this.add(new flow_module_1.Element().add(optionsField)).add(source).add(scale);
    }
}
exports.NormalMapEditor = NormalMapEditor;
