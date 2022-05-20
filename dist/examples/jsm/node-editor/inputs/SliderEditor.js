"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SliderEditor = void 0;
const flow_module_1 = require("../../libs/flow.module");
const BaseNode_1 = require("../core/BaseNode");
const Nodes_1 = require("three-nodes/Nodes");
class SliderEditor extends BaseNode_1.BaseNode {
    constructor() {
        const node = new Nodes_1.UniformNode(0);
        super('Slider', 1, node);
        this.collapse = true;
        const field = new flow_module_1.SliderInput(0, 0, 1).onChange(() => {
            node.value = field.getValue();
        });
        const updateRange = () => {
            const min = minInput.getValue();
            const max = maxInput.getValue();
            if (min <= max) {
                field.setRange(min, max);
            }
            else {
                maxInput.setValue(min);
            }
        };
        const minInput = new flow_module_1.NumberInput().onChange(updateRange);
        const maxInput = new flow_module_1.NumberInput(1).onChange(updateRange);
        const minElement = new flow_module_1.LabelElement('Min.').add(minInput).setVisible(false);
        const maxElement = new flow_module_1.LabelElement('Max.').add(maxInput).setVisible(false);
        const moreElement = new flow_module_1.Element()
            .add(new flow_module_1.ButtonInput('More').onClick(() => {
            minElement.setVisible(true);
            maxElement.setVisible(true);
            moreElement.setVisible(false);
        }))
            .setSerializable(false);
        this.add(new flow_module_1.Element().add(field)).add(minElement).add(maxElement).add(moreElement);
        this.onBlur(() => {
            minElement.setVisible(false);
            maxElement.setVisible(false);
            moreElement.setVisible(true);
        });
    }
}
exports.SliderEditor = SliderEditor;
