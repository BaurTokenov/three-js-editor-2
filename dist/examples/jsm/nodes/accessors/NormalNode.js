"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = __importDefault(require("../core/Node"));
const AttributeNode_1 = __importDefault(require("../core/AttributeNode"));
const VaryNode_1 = __importDefault(require("../core/VaryNode"));
const ModelNode_1 = __importDefault(require("../accessors/ModelNode"));
const CameraNode_1 = __importDefault(require("../accessors/CameraNode"));
const OperatorNode_1 = __importDefault(require("../math/OperatorNode"));
const MathNode_1 = __importDefault(require("../math/MathNode"));
class NormalNode extends Node_1.default {
    constructor(scope = NormalNode.LOCAL) {
        super('vec3');
        this.scope = scope;
    }
    getHash( /*builder*/) {
        return `normal-${this.scope}`;
    }
    generate(builder) {
        const scope = this.scope;
        let outputNode = null;
        if (scope === NormalNode.GEOMETRY) {
            outputNode = new AttributeNode_1.default('normal', 'vec3');
        }
        else if (scope === NormalNode.LOCAL) {
            outputNode = new VaryNode_1.default(new NormalNode(NormalNode.GEOMETRY));
        }
        else if (scope === NormalNode.VIEW) {
            const vertexNormalNode = new OperatorNode_1.default('*', new ModelNode_1.default(ModelNode_1.default.NORMAL_MATRIX), new NormalNode(NormalNode.LOCAL));
            outputNode = new MathNode_1.default(MathNode_1.default.NORMALIZE, new VaryNode_1.default(vertexNormalNode));
        }
        else if (scope === NormalNode.WORLD) {
            // To use INVERSE_TRANSFORM_DIRECTION only inverse the param order like this: MathNode( ..., Vector, Matrix );
            const vertexNormalNode = new MathNode_1.default(MathNode_1.default.TRANSFORM_DIRECTION, new NormalNode(NormalNode.VIEW), new CameraNode_1.default(CameraNode_1.default.VIEW_MATRIX));
            outputNode = new MathNode_1.default(MathNode_1.default.NORMALIZE, new VaryNode_1.default(vertexNormalNode));
        }
        return outputNode.build(builder);
    }
    serialize(data) {
        super.serialize(data);
        data.scope = this.scope;
    }
    deserialize(data) {
        super.deserialize(data);
        this.scope = data.scope;
    }
}
NormalNode.GEOMETRY = 'geometry';
NormalNode.LOCAL = 'local';
NormalNode.WORLD = 'world';
NormalNode.VIEW = 'view';
exports.default = NormalNode;
