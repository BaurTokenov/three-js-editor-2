"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimerEditor = void 0;
const flow_module_1 = require("../../libs/flow.module");
const BaseNode_1 = require("../core/BaseNode");
const Nodes_1 = require("three-nodes/Nodes");
class TimerEditor extends BaseNode_1.BaseNode {
    constructor() {
        const node = new Nodes_1.TimerNode();
        super('Timer', 1, node, 200);
        this.title.setIcon('ti ti-clock');
        const updateField = () => {
            field.setValue(node.value.toFixed(3));
        };
        const field = new flow_module_1.NumberInput().onChange(() => {
            node.value = field.getValue();
        });
        const scaleField = new flow_module_1.NumberInput(1).onChange(() => {
            node.scale = scaleField.getValue();
        });
        const moreElement = new flow_module_1.Element()
            .add(new flow_module_1.ButtonInput('Reset').onClick(() => {
            node.value = 0;
            updateField();
        }))
            .setSerializable(false);
        this.add(new flow_module_1.Element().add(field).setSerializable(false))
            .add(new flow_module_1.LabelElement('Speed').add(scaleField))
            .add(moreElement);
        // extends node
        node._update = node.update;
        node.update = function (...params) {
            this._update(...params);
            updateField();
        };
    }
}
exports.TimerEditor = TimerEditor;
