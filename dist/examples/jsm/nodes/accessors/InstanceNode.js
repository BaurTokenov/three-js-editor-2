"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = __importDefault(require("../core/Node"));
const ShaderNodeBaseElements_1 = require("../shadernode/ShaderNodeBaseElements");
class InstanceNode extends Node_1.default {
    constructor(instanceMesh) {
        super('void');
        this.instanceMesh = instanceMesh;
        //
        const instanceBufferNode = ShaderNodeBaseElements_1.buffer(instanceMesh.instanceMatrix.array, 'mat4', instanceMesh.count);
        this.instanceMatrixNode = ShaderNodeBaseElements_1.temp(ShaderNodeBaseElements_1.element(instanceBufferNode, ShaderNodeBaseElements_1.instanceIndex)); // @TODO: a possible caching issue here?
    }
    generate(builder) {
        const { instanceMatrixNode } = this;
        // POSITION
        const instancePosition = ShaderNodeBaseElements_1.mul(instanceMatrixNode, ShaderNodeBaseElements_1.positionLocal).xyz;
        // NORMAL
        const m = ShaderNodeBaseElements_1.mat3(instanceMatrixNode[0].xyz, instanceMatrixNode[1].xyz, instanceMatrixNode[2].xyz);
        const transformedNormal = ShaderNodeBaseElements_1.div(ShaderNodeBaseElements_1.normalLocal, ShaderNodeBaseElements_1.vec3(ShaderNodeBaseElements_1.dot(m[0], m[0]), ShaderNodeBaseElements_1.dot(m[1], m[1]), ShaderNodeBaseElements_1.dot(m[2], m[2])));
        const instanceNormal = ShaderNodeBaseElements_1.mul(m, transformedNormal).xyz;
        // ASSIGNS
        ShaderNodeBaseElements_1.assign(ShaderNodeBaseElements_1.positionLocal, instancePosition).build(builder);
        ShaderNodeBaseElements_1.assign(ShaderNodeBaseElements_1.normalLocal, instanceNormal).build(builder);
    }
}
exports.default = InstanceNode;
