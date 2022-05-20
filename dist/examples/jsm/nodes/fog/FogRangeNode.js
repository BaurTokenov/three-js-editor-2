"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FogNode_1 = __importDefault(require("./FogNode"));
const ShaderNodeBaseElements_1 = require("../shadernode/ShaderNodeBaseElements");
class FogRangeNode extends FogNode_1.default {
    constructor(colorNode, nearNode, farNode) {
        super(colorNode);
        this.nearNode = nearNode;
        this.farNode = farNode;
    }
    generate(builder) {
        this.factorNode = ShaderNodeBaseElements_1.smoothstep(this.nearNode, this.farNode, ShaderNodeBaseElements_1.negate(ShaderNodeBaseElements_1.positionView.z));
        return super.generate(builder);
    }
}
FogRangeNode.prototype.isFogRangeNode = true;
exports.default = FogRangeNode;
