"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinearTosRGB = exports.LinearToLinear = void 0;
const Node_1 = __importDefault(require("../core/Node"));
const ShaderNodeBaseElements_1 = require("../shadernode/ShaderNodeBaseElements");
const three_1 = require("three");
exports.LinearToLinear = new ShaderNodeBaseElements_1.ShaderNode((inputs) => {
    return inputs.value;
});
exports.LinearTosRGB = new ShaderNodeBaseElements_1.ShaderNode((inputs) => {
    const { value } = inputs;
    const rgb = value.rgb;
    const a = ShaderNodeBaseElements_1.sub(ShaderNodeBaseElements_1.mul(ShaderNodeBaseElements_1.pow(value.rgb, ShaderNodeBaseElements_1.vec3(0.41666)), 1.055), ShaderNodeBaseElements_1.vec3(0.055));
    const b = ShaderNodeBaseElements_1.mul(rgb, 12.92);
    const factor = ShaderNodeBaseElements_1.vec3(ShaderNodeBaseElements_1.lessThanEqual(rgb, ShaderNodeBaseElements_1.vec3(0.0031308)));
    const rgbResult = ShaderNodeBaseElements_1.mix(a, b, factor);
    return ShaderNodeBaseElements_1.vec4(rgbResult, value.a);
});
const EncodingLib = {
    LinearToLinear: exports.LinearToLinear,
    LinearTosRGB: exports.LinearTosRGB,
};
class ColorSpaceNode extends Node_1.default {
    constructor(method, node) {
        super('vec4');
        this.method = method;
        this.node = node;
    }
    fromEncoding(encoding) {
        let method = null;
        if (encoding === three_1.LinearEncoding) {
            method = 'Linear';
        }
        else if (encoding === three_1.sRGBEncoding) {
            method = 'sRGB';
        }
        this.method = 'LinearTo' + method;
        return this;
    }
    generate(builder) {
        const type = this.getNodeType(builder);
        const method = this.method;
        const node = this.node;
        if (method !== ColorSpaceNode.LINEAR_TO_LINEAR) {
            const encodingFunctionNode = EncodingLib[method];
            return encodingFunctionNode
                .call({
                value: node,
            })
                .build(builder, type);
        }
        else {
            return node.build(builder, type);
        }
    }
}
ColorSpaceNode.LINEAR_TO_LINEAR = 'LinearToLinear';
ColorSpaceNode.LINEAR_TO_SRGB = 'LinearTosRGB';
exports.default = ColorSpaceNode;
