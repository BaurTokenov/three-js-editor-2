"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Object3DNode_1 = __importDefault(require("./Object3DNode"));
class ModelNode extends Object3DNode_1.default {
    constructor(scope = ModelNode.VIEW_MATRIX) {
        super(scope);
    }
    update(frame) {
        this.object3d = frame.object;
        super.update(frame);
    }
}
exports.default = ModelNode;
