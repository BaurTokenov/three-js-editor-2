"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorEditor = void 0;
const flow_module_1 = require("../../libs/flow.module");
const BaseNode_1 = require("../core/BaseNode");
const three_1 = require("three");
const Nodes_1 = require("three-nodes/Nodes");
class ColorEditor extends BaseNode_1.BaseNode {
    constructor() {
        const node = new Nodes_1.UniformNode(new three_1.Color());
        super('Color', 3, node);
        const updateFields = (editing) => {
            const value = node.value;
            const hexValue = value.getHex();
            const hexString = hexValue.toString(16).toUpperCase().padStart(6, '0');
            if (editing !== 'color') {
                field.setValue(hexValue, false);
            }
            if (editing !== 'hex') {
                hexField.setValue('#' + hexString, false);
            }
            if (editing !== 'rgb') {
                fieldR.setValue(value.r.toFixed(3), false);
                fieldG.setValue(value.g.toFixed(3), false);
                fieldB.setValue(value.b.toFixed(3), false);
            }
            fieldR.setTagColor(`#${hexString.slice(0, 2)}0000`);
            fieldG.setTagColor(`#00${hexString.slice(2, 4)}00`);
            fieldB.setTagColor(`#0000${hexString.slice(4, 6)}`);
        };
        const field = new flow_module_1.ColorInput(0xffffff).onChange(() => {
            node.value.setHex(field.getValue());
            updateFields('picker');
        });
        const hexField = new flow_module_1.StringInput().onChange(() => {
            const value = hexField.getValue();
            if (value.indexOf('#') === 0) {
                const hexStr = value.slice(1).padEnd(6, '0');
                node.value.setHex(parseInt(hexStr, 16));
                updateFields('hex');
            }
        });
        hexField.addEventListener('blur', () => {
            updateFields();
        });
        const onChangeRGB = () => {
            node.value.setRGB(fieldR.getValue(), fieldG.getValue(), fieldB.getValue());
            updateFields('rgb');
        };
        const fieldR = new flow_module_1.NumberInput(1, 0, 1).setTagColor('red').onChange(onChangeRGB);
        const fieldG = new flow_module_1.NumberInput(1, 0, 1).setTagColor('green').onChange(onChangeRGB);
        const fieldB = new flow_module_1.NumberInput(1, 0, 1).setTagColor('blue').onChange(onChangeRGB);
        this.add(new flow_module_1.Element().add(field).setSerializable(false))
            .add(new flow_module_1.LabelElement('Hex').add(hexField).setSerializable(false))
            .add(new flow_module_1.LabelElement('RGB').add(fieldR).add(fieldG).add(fieldB));
        updateFields();
    }
}
exports.ColorEditor = ColorEditor;
