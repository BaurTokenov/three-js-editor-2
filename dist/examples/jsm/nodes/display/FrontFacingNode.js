"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = __importDefault(require("../core/Node"));
class FrontFacingNode extends Node_1.default {
    constructor() {
        super('bool');
    }
    generate(builder) {
        return builder.getFrontFacing();
    }
}
FrontFacingNode.prototype.isFrontFacingNode = true;
exports.default = FrontFacingNode;
