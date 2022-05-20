"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = __importDefault(require("../core/Node"));
const ShaderNodeBaseElements_1 = require("../shadernode/ShaderNodeBaseElements");
const constants_1 = require("../core/constants");
const Skinning = new ShaderNodeBaseElements_1.ShaderNode((inputs, builder) => {
    const { index, weight, bindMatrix, bindMatrixInverse, boneMatrices } = inputs;
    const boneMatX = ShaderNodeBaseElements_1.element(boneMatrices, index.x);
    const boneMatY = ShaderNodeBaseElements_1.element(boneMatrices, index.y);
    const boneMatZ = ShaderNodeBaseElements_1.element(boneMatrices, index.z);
    const boneMatW = ShaderNodeBaseElements_1.element(boneMatrices, index.w);
    // POSITION
    const skinVertex = ShaderNodeBaseElements_1.mul(bindMatrix, ShaderNodeBaseElements_1.positionLocal);
    const skinned = ShaderNodeBaseElements_1.add(ShaderNodeBaseElements_1.mul(ShaderNodeBaseElements_1.mul(boneMatX, skinVertex), weight.x), ShaderNodeBaseElements_1.mul(ShaderNodeBaseElements_1.mul(boneMatY, skinVertex), weight.y), ShaderNodeBaseElements_1.mul(ShaderNodeBaseElements_1.mul(boneMatZ, skinVertex), weight.z), ShaderNodeBaseElements_1.mul(ShaderNodeBaseElements_1.mul(boneMatW, skinVertex), weight.w));
    const skinPosition = ShaderNodeBaseElements_1.mul(bindMatrixInverse, skinned).xyz;
    // NORMAL
    let skinMatrix = ShaderNodeBaseElements_1.add(ShaderNodeBaseElements_1.mul(weight.x, boneMatX), ShaderNodeBaseElements_1.mul(weight.y, boneMatY), ShaderNodeBaseElements_1.mul(weight.z, boneMatZ), ShaderNodeBaseElements_1.mul(weight.w, boneMatW));
    skinMatrix = ShaderNodeBaseElements_1.mul(ShaderNodeBaseElements_1.mul(bindMatrixInverse, skinMatrix), bindMatrix);
    const skinNormal = ShaderNodeBaseElements_1.transformDirection(skinMatrix, ShaderNodeBaseElements_1.normalLocal).xyz;
    // ASSIGNS
    ShaderNodeBaseElements_1.assign(ShaderNodeBaseElements_1.positionLocal, skinPosition).build(builder);
    ShaderNodeBaseElements_1.assign(ShaderNodeBaseElements_1.normalLocal, skinNormal).build(builder);
});
class SkinningNode extends Node_1.default {
    constructor(skinnedMesh) {
        super('void');
        this.skinnedMesh = skinnedMesh;
        this.updateType = constants_1.NodeUpdateType.Object;
        //
        this.skinIndexNode = ShaderNodeBaseElements_1.attribute('skinIndex', 'uvec4');
        this.skinWeightNode = ShaderNodeBaseElements_1.attribute('skinWeight', 'vec4');
        this.bindMatrixNode = ShaderNodeBaseElements_1.uniform(ShaderNodeBaseElements_1.mat4(skinnedMesh.bindMatrix));
        this.bindMatrixInverseNode = ShaderNodeBaseElements_1.uniform(ShaderNodeBaseElements_1.mat4(skinnedMesh.bindMatrixInverse));
        this.boneMatricesNode = ShaderNodeBaseElements_1.buffer(skinnedMesh.skeleton.boneMatrices, 'mat4', skinnedMesh.skeleton.bones.length);
    }
    generate(builder) {
        Skinning.call({
            index: this.skinIndexNode,
            weight: this.skinWeightNode,
            bindMatrix: this.bindMatrixNode,
            bindMatrixInverse: this.bindMatrixInverseNode,
            boneMatrices: this.boneMatricesNode,
        }, builder);
    }
    update() {
        this.skinnedMesh.skeleton.update();
    }
}
exports.default = SkinningNode;
