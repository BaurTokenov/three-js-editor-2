"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TextureNode_1 = __importDefault(require("./TextureNode"));
const UniformNode_1 = __importDefault(require("../core/UniformNode"));
const ReflectNode_1 = __importDefault(require("./ReflectNode"));
class CubeTextureNode extends TextureNode_1.default {
    constructor(value, uvNode = null, levelNode = null) {
        super(value, uvNode, levelNode);
    }
    getInputType( /*builder*/) {
        return 'cubeTexture';
    }
    generate(builder, output) {
        const texture = this.value;
        const uvNode = this.uvNode || builder.context.uvNode || new ReflectNode_1.default();
        if (!texture || texture.isCubeTexture !== true) {
            throw new Error('CubeTextureNode: Need a three.js cube texture.');
        }
        const textureProperty = UniformNode_1.default.prototype.generate.call(this, builder, 'cubeTexture');
        if (output === 'sampler') {
            return textureProperty + '_sampler';
        }
        else if (builder.isReference(output)) {
            return textureProperty;
        }
        else {
            const nodeData = builder.getDataFromNode(this);
            let snippet = nodeData.snippet;
            if (builder.context.tempRead === false || snippet === undefined) {
                const uvSnippet = uvNode.build(builder, 'vec3');
                const levelNode = this.levelNode || builder.context.levelNode;
                if ((levelNode === null || levelNode === void 0 ? void 0 : levelNode.isNode) === true) {
                    const levelOutNode = builder.context.levelShaderNode
                        ? builder.context.levelShaderNode.call({ texture, levelNode }, builder)
                        : levelNode;
                    const levelSnippet = levelOutNode.build(builder, 'float');
                    snippet = builder.getCubeTextureLevel(textureProperty, uvSnippet, levelSnippet);
                }
                else {
                    snippet = builder.getCubeTexture(textureProperty, uvSnippet);
                }
                nodeData.snippet = snippet;
            }
            return builder.format(snippet, 'vec4', output);
        }
    }
}
CubeTextureNode.prototype.isCubeTextureNode = true;
exports.default = CubeTextureNode;
