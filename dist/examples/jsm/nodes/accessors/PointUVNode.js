"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = __importDefault(require("../core/Node"));
class PointUVNode extends Node_1.default {
    constructor() {
        super('vec2');
    }
    generate( /*builder*/) {
        return 'vec2( gl_PointCoord.x, 1.0 - gl_PointCoord.y )';
    }
}
PointUVNode.prototype.isPointUVNode = true;
exports.default = PointUVNode;
