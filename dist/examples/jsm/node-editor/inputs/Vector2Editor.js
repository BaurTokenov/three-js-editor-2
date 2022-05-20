"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector2Editor = void 0;
const flow_module_1 = require("../../libs/flow.module");
const BaseNode_1 = require("../core/BaseNode");
const three_1 = require("three");
const Nodes_1 = require("three-nodes/Nodes");
class Vector2Editor extends BaseNode_1.BaseNode {
    constructor() {
        const node = new Nodes_1.UniformNode(new three_1.Vector2());
        super('Vector 2', 2, node);
        const onUpdate = () => {
            node.value.x = fieldX.getValue();
            node.value.y = fieldY.getValue();
        };
        const fieldX = new flow_module_1.NumberInput().setTagColor('red').onChange(onUpdate);
        const fieldY = new flow_module_1.NumberInput().setTagColor('green').onChange(onUpdate);
        this.add(new flow_module_1.LabelElement('XY').add(fieldX).add(fieldY));
    }
}
exports.Vector2Editor = Vector2Editor;
