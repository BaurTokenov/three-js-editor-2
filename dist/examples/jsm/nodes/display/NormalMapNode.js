"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TempNode_1 = __importDefault(require("../core/TempNode"));
const ModelNode_1 = __importDefault(require("../accessors/ModelNode"));
const ShaderNodeBaseElements_1 = require("../shadernode/ShaderNodeBaseElements");
const three_1 = require("three");
// Normal Mapping Without Precomputed Tangents
// http://www.thetenthplanet.de/archives/1180
const perturbNormal2ArbNode = new ShaderNodeBaseElements_1.ShaderNode((inputs) => {
    const { eye_pos, surf_norm, mapN, uv } = inputs;
    const q0 = ShaderNodeBaseElements_1.dFdx(eye_pos.xyz);
    const q1 = ShaderNodeBaseElements_1.dFdy(eye_pos.xyz);
    const st0 = ShaderNodeBaseElements_1.dFdx(uv.st);
    const st1 = ShaderNodeBaseElements_1.dFdy(uv.st);
    const N = surf_norm; // normalized
    const q1perp = ShaderNodeBaseElements_1.cross(q1, N);
    const q0perp = ShaderNodeBaseElements_1.cross(N, q0);
    const T = ShaderNodeBaseElements_1.add(ShaderNodeBaseElements_1.mul(q1perp, st0.x), ShaderNodeBaseElements_1.mul(q0perp, st1.x));
    const B = ShaderNodeBaseElements_1.add(ShaderNodeBaseElements_1.mul(q1perp, st0.y), ShaderNodeBaseElements_1.mul(q0perp, st1.y));
    const det = ShaderNodeBaseElements_1.max(ShaderNodeBaseElements_1.dot(T, T), ShaderNodeBaseElements_1.dot(B, B));
    const scale = ShaderNodeBaseElements_1.cond(ShaderNodeBaseElements_1.equal(det, 0), 0, ShaderNodeBaseElements_1.mul(ShaderNodeBaseElements_1.faceDirection, ShaderNodeBaseElements_1.inversesqrt(det)));
    return ShaderNodeBaseElements_1.normalize(ShaderNodeBaseElements_1.add(ShaderNodeBaseElements_1.mul(T, ShaderNodeBaseElements_1.mul(mapN.x, scale)), ShaderNodeBaseElements_1.mul(B, ShaderNodeBaseElements_1.mul(mapN.y, scale)), ShaderNodeBaseElements_1.mul(N, mapN.z)));
});
class NormalMapNode extends TempNode_1.default {
    constructor(node, scaleNode = null) {
        super('vec3');
        this.node = node;
        this.scaleNode = scaleNode;
        this.normalMapType = three_1.TangentSpaceNormalMap;
    }
    generate(builder) {
        const type = this.getNodeType(builder);
        const { normalMapType, scaleNode } = this;
        const normalOP = ShaderNodeBaseElements_1.mul(this.node, 2.0);
        let normalMap = ShaderNodeBaseElements_1.sub(normalOP, 1.0);
        if (scaleNode !== null) {
            const normalMapScale = ShaderNodeBaseElements_1.mul(normalMap.xy, scaleNode);
            normalMap = ShaderNodeBaseElements_1.vec3(normalMapScale, normalMap.z);
        }
        if (normalMapType === three_1.ObjectSpaceNormalMap) {
            const vertexNormalNode = ShaderNodeBaseElements_1.mul(new ModelNode_1.default(ModelNode_1.default.NORMAL_MATRIX), normalMap);
            const normal = ShaderNodeBaseElements_1.normalize(vertexNormalNode);
            return normal.build(builder, type);
        }
        else if (normalMapType === three_1.TangentSpaceNormalMap) {
            const perturbNormal2ArbCall = perturbNormal2ArbNode.call({
                eye_pos: ShaderNodeBaseElements_1.positionView,
                surf_norm: ShaderNodeBaseElements_1.normalView,
                mapN: normalMap,
                uv: ShaderNodeBaseElements_1.uv(),
            });
            return perturbNormal2ArbCall.build(builder, type);
        }
    }
}
exports.default = NormalMapNode;
