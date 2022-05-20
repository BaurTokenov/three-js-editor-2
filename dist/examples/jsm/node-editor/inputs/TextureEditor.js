"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextureEditor = void 0;
const flow_module_1 = require("../../libs/flow.module");
const BaseNode_1 = require("../core/BaseNode");
const Nodes_1 = require("three-nodes/Nodes");
const three_1 = require("three");
const fileTexture = new WeakMap();
const fileURL = new WeakMap();
const textureLoader = new three_1.TextureLoader();
const defaultTexture = new three_1.Texture();
const defaultUV = new Nodes_1.UVNode();
const getTexture = (file) => {
    let texture = fileTexture.get(file);
    if (texture === undefined || file.getURL() !== fileURL.get(file)) {
        const url = file.getURL();
        if (texture !== undefined) {
            texture.dispose();
        }
        texture = textureLoader.load(url);
        fileTexture.set(file, texture);
        fileURL.set(file, url);
    }
    return texture;
};
class TextureEditor extends BaseNode_1.BaseNode {
    constructor() {
        const node = new Nodes_1.TextureNode(defaultTexture);
        super('Texture', 4, node, 250);
        this.texture = null;
        this._initFile();
        this._initParams();
        this.onValidElement = () => { };
    }
    _initFile() {
        const fileElement = new flow_module_1.LabelElement('File').setInputColor('aqua').setInput(1);
        fileElement
            .onValid((source, target, stage) => {
            const object = target.getObject();
            if (object && object.isDataFile !== true) {
                if (stage === 'dragged') {
                    const name = target.node.getName();
                    this.editor.tips.error(`"${name}" is not a File.`);
                }
                return false;
            }
        })
            .onConnect(() => {
            const file = fileElement.getLinkedObject();
            const node = this.value;
            this.texture = file ? getTexture(file) : null;
            node.value = this.texture || defaultTexture;
            this.update();
        }, true);
        this.add(fileElement);
    }
    _initParams() {
        const uvField = new flow_module_1.LabelElement('UV').setInput(2);
        uvField.onValid(BaseNode_1.onNodeValidElement).onConnect(() => {
            const node = this.value;
            node.uvNode = uvField.getLinkedObject() || defaultUV;
        });
        this.wrapSInput = new flow_module_1.SelectInput([
            { name: 'Repeat Wrapping', value: three_1.RepeatWrapping },
            { name: 'Clamp To Edge Wrapping', value: three_1.ClampToEdgeWrapping },
            { name: 'Mirrored Repeat Wrapping', value: three_1.MirroredRepeatWrapping },
        ], three_1.RepeatWrapping).onChange(() => {
            this.update();
        });
        this.wrapTInput = new flow_module_1.SelectInput([
            { name: 'Repeat Wrapping', value: three_1.RepeatWrapping },
            { name: 'Clamp To Edge Wrapping', value: three_1.ClampToEdgeWrapping },
            { name: 'Mirrored Repeat Wrapping', value: three_1.MirroredRepeatWrapping },
        ], three_1.RepeatWrapping).onChange(() => {
            this.update();
        });
        this.flipYInput = new flow_module_1.ToggleInput(false).onChange(() => {
            this.update();
        });
        this.add(uvField)
            .add(new flow_module_1.LabelElement('Wrap S').add(this.wrapSInput))
            .add(new flow_module_1.LabelElement('Wrap T').add(this.wrapTInput))
            .add(new flow_module_1.LabelElement('Flip Y').add(this.flipYInput));
    }
    update() {
        const texture = this.texture;
        if (texture) {
            texture.wrapS = Number(this.wrapSInput.getValue());
            texture.wrapT = Number(this.wrapTInput.getValue());
            texture.flipY = this.flipYInput.getValue();
            texture.dispose();
            this.invalidate();
        }
    }
}
exports.TextureEditor = TextureEditor;
