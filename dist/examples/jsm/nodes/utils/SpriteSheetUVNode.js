"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = __importDefault(require("../core/Node"));
const ConstNode_1 = __importDefault(require("../core/ConstNode"));
const UVNode_1 = __importDefault(require("../accessors/UVNode"));
const MathNode_1 = __importDefault(require("../math/MathNode"));
const OperatorNode_1 = __importDefault(require("../math/OperatorNode"));
const SplitNode_1 = __importDefault(require("../utils/SplitNode"));
const JoinNode_1 = __importDefault(require("../utils/JoinNode"));
class SpriteSheetUVNode extends Node_1.default {
    constructor(countNode, uvNode = new UVNode_1.default(), frameNode = new ConstNode_1.default(0)) {
        super('vec2');
        this.countNode = countNode;
        this.uvNode = uvNode;
        this.frameNode = frameNode;
    }
    generate(builder) {
        const count = this.countNode;
        const uv = this.uvNode;
        const frame = this.frameNode;
        const one = new ConstNode_1.default(1);
        const width = new SplitNode_1.default(count, 'x');
        const height = new SplitNode_1.default(count, 'y');
        const total = new OperatorNode_1.default('*', width, height);
        const roundFrame = new MathNode_1.default(MathNode_1.default.FLOOR, new MathNode_1.default(MathNode_1.default.MOD, frame, total));
        const frameNum = new OperatorNode_1.default('+', roundFrame, one);
        const cell = new MathNode_1.default(MathNode_1.default.MOD, roundFrame, width);
        const row = new MathNode_1.default(MathNode_1.default.CEIL, new OperatorNode_1.default('/', frameNum, width));
        const rowInv = new OperatorNode_1.default('-', height, row);
        const scale = new OperatorNode_1.default('/', one, count);
        const uvFrameOffset = new JoinNode_1.default([
            new OperatorNode_1.default('*', cell, new SplitNode_1.default(scale, 'x')),
            new OperatorNode_1.default('*', rowInv, new SplitNode_1.default(scale, 'y')),
        ]);
        const uvScale = new OperatorNode_1.default('*', uv, scale);
        const uvFrame = new OperatorNode_1.default('+', uvScale, uvFrameOffset);
        return uvFrame.build(builder, this.getNodeType(builder));
    }
}
exports.default = SpriteSheetUVNode;
