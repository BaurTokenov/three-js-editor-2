"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ReferenceNode_1 = __importDefault(require("./ReferenceNode"));
class MaterialReferenceNode extends ReferenceNode_1.default {
    constructor(property, inputType, material = null) {
        super(property, inputType, material);
        this.material = material;
    }
    update(frame) {
        this.object = this.material !== null ? this.material : frame.material;
        super.update(frame);
    }
}
exports.default = MaterialReferenceNode;
