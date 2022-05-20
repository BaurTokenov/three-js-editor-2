"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ContextNode_1 = __importDefault(require("three-nodes/core/ContextNode"));
const NormalNode_1 = __importDefault(require("three-nodes/accessors/NormalNode"));
const ExpressionNode_1 = __importDefault(require("three-nodes/core/ExpressionNode"));
const ConstNode_1 = __importDefault(require("three-nodes/core/ConstNode"));
class WebGLPhysicalContextNode extends ContextNode_1.default {
    constructor(scope, node) {
        super(node, 'vec3');
        this.scope = scope;
    }
    generate(builder, output) {
        const scope = this.scope;
        let roughness = null;
        if (scope === WebGLPhysicalContextNode.RADIANCE) {
            roughness = new ExpressionNode_1.default('roughnessFactor', 'float');
        }
        else if (scope === WebGLPhysicalContextNode.IRRADIANCE) {
            roughness = new ConstNode_1.default(1);
            this.context.uv = new NormalNode_1.default(NormalNode_1.default.WORLD);
        }
        this.context.roughness = roughness;
        return super.generate(builder, output);
    }
}
WebGLPhysicalContextNode.RADIANCE = 'radiance';
WebGLPhysicalContextNode.IRRADIANCE = 'irradiance';
exports.default = WebGLPhysicalContextNode;
