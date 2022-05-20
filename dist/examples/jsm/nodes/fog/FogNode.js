"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = __importDefault(require("../core/Node"));
const MathNode_1 = __importDefault(require("../math/MathNode"));
class FogNode extends Node_1.default {
    constructor(colorNode, factorNode) {
        super('float');
        this.colorNode = colorNode;
        this.factorNode = factorNode;
    }
    mix(outputNode) {
        return new MathNode_1.default(MathNode_1.default.MIX, outputNode, this.colorNode, this);
    }
    generate(builder) {
        return this.factorNode.build(builder, 'float');
    }
}
FogNode.prototype.isFogNode = true;
exports.default = FogNode;
