"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = __importDefault(require("../core/Node"));
const CameraNode_1 = __importDefault(require("../accessors/CameraNode"));
const ModelNode_1 = __importDefault(require("../accessors/ModelNode"));
const OperatorNode_1 = __importDefault(require("../math/OperatorNode"));
const PositionNode_1 = __importDefault(require("../accessors/PositionNode"));
class ModelViewProjectionNode extends Node_1.default {
    constructor(position = new PositionNode_1.default()) {
        super('vec4');
        this.position = position;
    }
    generate(builder) {
        const position = this.position;
        const mvpMatrix = new OperatorNode_1.default('*', new CameraNode_1.default(CameraNode_1.default.PROJECTION_MATRIX), new ModelNode_1.default(ModelNode_1.default.VIEW_MATRIX));
        const mvpNode = new OperatorNode_1.default('*', mvpMatrix, position);
        return mvpNode.build(builder);
    }
}
exports.default = ModelViewProjectionNode;
