"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = __importDefault(require("../core/Node"));
const ShaderNodeBaseElements_1 = require("../shadernode/ShaderNodeBaseElements");
class ReflectNode extends Node_1.default {
    constructor(scope = ReflectNode.CUBE) {
        super('vec3');
        this.scope = scope;
    }
    getHash( /*builder*/) {
        return `reflect-${this.scope}`;
    }
    generate(builder) {
        const scope = this.scope;
        if (scope === ReflectNode.VECTOR) {
            const reflectView = ShaderNodeBaseElements_1.reflect(ShaderNodeBaseElements_1.negate(ShaderNodeBaseElements_1.positionViewDirection), ShaderNodeBaseElements_1.transformedNormalView);
            const reflectVec = ShaderNodeBaseElements_1.transformDirection(reflectView, ShaderNodeBaseElements_1.cameraViewMatrix);
            return reflectVec.build(builder);
        }
        else if (scope === ReflectNode.CUBE) {
            const reflectVec = ShaderNodeBaseElements_1.nodeObject(new ReflectNode(ReflectNode.VECTOR));
            const cubeUV = ShaderNodeBaseElements_1.vec3(ShaderNodeBaseElements_1.negate(reflectVec.x), reflectVec.yz);
            return cubeUV.build(builder);
        }
    }
    serialize(data) {
        super.serialize(data);
        data.scope = this.scope;
    }
    deserialize(data) {
        super.deserialize(data);
        this.scope = data.scope;
    }
}
ReflectNode.VECTOR = 'vector';
ReflectNode.CUBE = 'cube';
exports.default = ReflectNode;
