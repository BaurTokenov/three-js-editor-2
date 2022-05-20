"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector3Editor = void 0;
const flow_module_1 = require("../../libs/flow.module");
const BaseNode_1 = require("../core/BaseNode");
const three_1 = require("three");
const Nodes_1 = require("three-nodes/Nodes");
class Vector3Editor extends BaseNode_1.BaseNode {
    constructor() {
        const node = new Nodes_1.UniformNode(new three_1.Vector3());
        super('Vector 3', 3, node, 325);
        const onUpdate = () => {
            node.value.x = fieldX.getValue();
            node.value.y = fieldY.getValue();
            node.value.z = fieldZ.getValue();
        };
        const fieldX = new flow_module_1.NumberInput().setTagColor('red').onChange(onUpdate);
        const fieldY = new flow_module_1.NumberInput().setTagColor('green').onChange(onUpdate);
        const fieldZ = new flow_module_1.NumberInput().setTagColor('blue').onChange(onUpdate);
        this.add(new flow_module_1.LabelElement('XYZ').add(fieldX).add(fieldY).add(fieldZ));
    }
}
exports.Vector3Editor = Vector3Editor;
