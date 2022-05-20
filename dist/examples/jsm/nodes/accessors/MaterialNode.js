"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = __importDefault(require("../core/Node"));
const OperatorNode_1 = __importDefault(require("../math/OperatorNode"));
const MaterialReferenceNode_1 = __importDefault(require("./MaterialReferenceNode"));
const TextureNode_1 = __importDefault(require("./TextureNode"));
const SplitNode_1 = __importDefault(require("../utils/SplitNode"));
class MaterialNode extends Node_1.default {
    constructor(scope = MaterialNode.COLOR) {
        super();
        this.scope = scope;
    }
    getNodeType(builder) {
        const scope = this.scope;
        const material = builder.context.material;
        if (scope === MaterialNode.COLOR) {
            return material.map !== null ? 'vec4' : 'vec3';
        }
        else if (scope === MaterialNode.OPACITY) {
            return 'float';
        }
        else if (scope === MaterialNode.EMISSIVE) {
            return 'vec3';
        }
        else if (scope === MaterialNode.ROUGHNESS || scope === MaterialNode.METALNESS) {
            return 'float';
        }
    }
    generate(builder, output) {
        var _a, _b, _c, _d, _e;
        const material = builder.context.material;
        const scope = this.scope;
        let node = null;
        if (scope === MaterialNode.ALPHA_TEST) {
            node = new MaterialReferenceNode_1.default('alphaTest', 'float');
        }
        else if (scope === MaterialNode.COLOR) {
            const colorNode = new MaterialReferenceNode_1.default('color', 'color');
            if (((_a = material.map) === null || _a === void 0 ? void 0 : _a.isTexture) === true) {
                //new MaterialReferenceNode( 'map', 'texture' )
                const map = new TextureNode_1.default(material.map);
                node = new OperatorNode_1.default('*', colorNode, map);
            }
            else {
                node = colorNode;
            }
        }
        else if (scope === MaterialNode.OPACITY) {
            const opacityNode = new MaterialReferenceNode_1.default('opacity', 'float');
            if (((_b = material.alphaMap) === null || _b === void 0 ? void 0 : _b.isTexture) === true) {
                node = new OperatorNode_1.default('*', opacityNode, new MaterialReferenceNode_1.default('alphaMap', 'texture'));
            }
            else {
                node = opacityNode;
            }
        }
        else if (scope === MaterialNode.ROUGHNESS) {
            const roughnessNode = new MaterialReferenceNode_1.default('roughness', 'float');
            if (((_c = material.roughnessMap) === null || _c === void 0 ? void 0 : _c.isTexture) === true) {
                node = new OperatorNode_1.default('*', roughnessNode, new SplitNode_1.default(new TextureNode_1.default(material.roughnessMap), 'g'));
            }
            else {
                node = roughnessNode;
            }
        }
        else if (scope === MaterialNode.METALNESS) {
            const metalnessNode = new MaterialReferenceNode_1.default('metalness', 'float');
            if (((_d = material.metalnessMap) === null || _d === void 0 ? void 0 : _d.isTexture) === true) {
                node = new OperatorNode_1.default('*', metalnessNode, new SplitNode_1.default(new TextureNode_1.default(material.metalnessMap), 'b'));
            }
            else {
                node = metalnessNode;
            }
        }
        else if (scope === MaterialNode.EMISSIVE) {
            const emissiveNode = new MaterialReferenceNode_1.default('emissive', 'color');
            if (((_e = material.emissiveMap) === null || _e === void 0 ? void 0 : _e.isTexture) === true) {
                node = new OperatorNode_1.default('*', emissiveNode, new TextureNode_1.default(material.emissiveMap));
            }
            else {
                node = emissiveNode;
            }
        }
        else {
            const outputType = this.getNodeType(builder);
            node = new MaterialReferenceNode_1.default(scope, outputType);
        }
        return node.build(builder, output);
    }
}
MaterialNode.ALPHA_TEST = 'alphaTest';
MaterialNode.COLOR = 'color';
MaterialNode.OPACITY = 'opacity';
MaterialNode.ROUGHNESS = 'roughness';
MaterialNode.METALNESS = 'metalness';
MaterialNode.EMISSIVE = 'emissive';
exports.default = MaterialNode;
