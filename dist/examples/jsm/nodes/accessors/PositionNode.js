"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = __importDefault(require("../core/Node"));
const AttributeNode_1 = __importDefault(require("../core/AttributeNode"));
const VaryNode_1 = __importDefault(require("../core/VaryNode"));
const ModelNode_1 = __importDefault(require("../accessors/ModelNode"));
const MathNode_1 = __importDefault(require("../math/MathNode"));
const OperatorNode_1 = __importDefault(require("../math/OperatorNode"));
class PositionNode extends Node_1.default {
    constructor(scope = PositionNode.LOCAL) {
        super('vec3');
        this.scope = scope;
    }
    getHash( /*builder*/) {
        return `position-${this.scope}`;
    }
    generate(builder) {
        const scope = this.scope;
        let outputNode = null;
        if (scope === PositionNode.GEOMETRY) {
            outputNode = new AttributeNode_1.default('position', 'vec3');
        }
        else if (scope === PositionNode.LOCAL) {
            outputNode = new VaryNode_1.default(new PositionNode(PositionNode.GEOMETRY));
        }
        else if (scope === PositionNode.WORLD) {
            const vertexPositionNode = new MathNode_1.default(MathNode_1.default.TRANSFORM_DIRECTION, new ModelNode_1.default(ModelNode_1.default.WORLD_MATRIX), new PositionNode(PositionNode.LOCAL));
            outputNode = new VaryNode_1.default(vertexPositionNode);
        }
        else if (scope === PositionNode.VIEW) {
            const vertexPositionNode = new OperatorNode_1.default('*', new ModelNode_1.default(ModelNode_1.default.VIEW_MATRIX), new PositionNode(PositionNode.LOCAL));
            outputNode = new VaryNode_1.default(vertexPositionNode);
        }
        else if (scope === PositionNode.VIEW_DIRECTION) {
            const vertexPositionNode = new MathNode_1.default(MathNode_1.default.NEGATE, new PositionNode(PositionNode.VIEW));
            outputNode = new MathNode_1.default(MathNode_1.default.NORMALIZE, new VaryNode_1.default(vertexPositionNode));
        }
        return outputNode.build(builder, this.getNodeType(builder));
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
PositionNode.GEOMETRY = 'geometry';
PositionNode.LOCAL = 'local';
PositionNode.WORLD = 'world';
PositionNode.VIEW = 'view';
PositionNode.VIEW_DIRECTION = 'viewDirection';
exports.default = PositionNode;
