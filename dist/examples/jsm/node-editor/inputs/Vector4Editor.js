"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector4Editor = void 0;
const flow_module_1 = require("../../libs/flow.module");
const BaseNode_1 = require("../core/BaseNode");
const three_1 = require("three");
const Nodes_1 = require("three-nodes/Nodes");
class Vector4Editor extends BaseNode_1.BaseNode {
    constructor() {
        const node = new Nodes_1.UniformNode(new three_1.Vector4());
        super('Vector 4', 4, node, 350);
        const onUpdate = () => {
            node.value.x = fieldX.getValue();
            node.value.y = fieldY.getValue();
            node.value.z = fieldZ.getValue();
            node.value.w = fieldW.getValue();
        };
        const fieldX = new flow_module_1.NumberInput().setTagColor('red').onChange(onUpdate);
        const fieldY = new flow_module_1.NumberInput().setTagColor('green').onChange(onUpdate);
        const fieldZ = new flow_module_1.NumberInput().setTagColor('blue').onChange(onUpdate);
        const fieldW = new flow_module_1.NumberInput(1).setTagColor('white').onChange(onUpdate);
        this.add(new flow_module_1.LabelElement('XYZW').add(fieldX).add(fieldY).add(fieldZ).add(fieldW));
    }
}
exports.Vector4Editor = Vector4Editor;
