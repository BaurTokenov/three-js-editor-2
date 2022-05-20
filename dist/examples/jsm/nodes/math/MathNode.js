"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TempNode_1 = __importDefault(require("../core/TempNode"));
const ExpressionNode_1 = __importDefault(require("../core/ExpressionNode"));
const JoinNode_1 = __importDefault(require("../utils/JoinNode"));
const SplitNode_1 = __importDefault(require("../utils/SplitNode"));
const OperatorNode_1 = __importDefault(require("./OperatorNode"));
class MathNode extends TempNode_1.default {
    constructor(method, aNode, bNode = null, cNode = null) {
        super();
        this.method = method;
        this.aNode = aNode;
        this.bNode = bNode;
        this.cNode = cNode;
    }
    getInputType(builder) {
        const aType = this.aNode.getNodeType(builder);
        const bType = this.bNode ? this.bNode.getNodeType(builder) : null;
        const cType = this.cNode ? this.cNode.getNodeType(builder) : null;
        const aLen = builder.isMatrix(aType) ? 0 : builder.getTypeLength(aType);
        const bLen = builder.isMatrix(bType) ? 0 : builder.getTypeLength(bType);
        const cLen = builder.isMatrix(cType) ? 0 : builder.getTypeLength(cType);
        if (aLen > bLen && aLen > cLen) {
            return aType;
        }
        else if (bLen > cLen) {
            return bType;
        }
        else if (cLen > aLen) {
            return cType;
        }
        return aType;
    }
    getNodeType(builder) {
        const method = this.method;
        if (method === MathNode.LENGTH || method === MathNode.DISTANCE || method === MathNode.DOT) {
            return 'float';
        }
        else if (method === MathNode.CROSS) {
            return 'vec3';
        }
        else {
            return this.getInputType(builder);
        }
    }
    generate(builder, output) {
        const method = this.method;
        const type = this.getNodeType(builder);
        const inputType = this.getInputType(builder);
        const a = this.aNode;
        const b = this.bNode;
        const c = this.cNode;
        const isWebGL = builder.renderer.isWebGLRenderer === true;
        if (isWebGL && (method === MathNode.DFDX || method === MathNode.DFDY) && output === 'vec3') {
            // Workaround for Adreno 3XX dFd*( vec3 ) bug. See #9988
            return new JoinNode_1.default([
                new MathNode(method, new SplitNode_1.default(a, 'x')),
                new MathNode(method, new SplitNode_1.default(a, 'y')),
                new MathNode(method, new SplitNode_1.default(a, 'z')),
            ]).build(builder);
        }
        else if (method === MathNode.TRANSFORM_DIRECTION) {
            // dir can be either a direction vector or a normal vector
            // upper-left 3x3 of matrix is assumed to be orthogonal
            let tA = a;
            let tB = b;
            if (builder.isMatrix(tA.getNodeType(builder))) {
                tB = new ExpressionNode_1.default(`${builder.getType('vec4')}( ${tB.build(builder, 'vec3')}, 0.0 )`, 'vec4');
            }
            else {
                tA = new ExpressionNode_1.default(`${builder.getType('vec4')}( ${tA.build(builder, 'vec3')}, 0.0 )`, 'vec4');
            }
            const mulNode = new SplitNode_1.default(new OperatorNode_1.default('*', tA, tB), 'xyz');
            return new MathNode(MathNode.NORMALIZE, mulNode).build(builder);
        }
        else if (method === MathNode.SATURATE) {
            return builder.format(`clamp( ${a.build(builder, inputType)}, 0.0, 1.0 )`, type, output);
        }
        else if (method === MathNode.NEGATE) {
            return builder.format('( -' + a.build(builder, inputType) + ' )', type, output);
        }
        else if (method === MathNode.INVERT) {
            return builder.format('( 1.0 - ' + a.build(builder, inputType) + ' )', type, output);
        }
        else {
            const params = [];
            if (method === MathNode.CROSS) {
                params.push(a.build(builder, type), b.build(builder, type));
            }
            else if (method === MathNode.STEP) {
                params.push(a.build(builder, builder.getTypeLength(a.getNodeType(builder)) === 1 ? 'float' : inputType), b.build(builder, inputType));
            }
            else if ((isWebGL && (method === MathNode.MIN || method === MathNode.MAX)) || method === MathNode.MOD) {
                params.push(a.build(builder, inputType), b.build(builder, builder.getTypeLength(b.getNodeType(builder)) === 1 ? 'float' : inputType));
            }
            else if (method === MathNode.REFRACT) {
                params.push(a.build(builder, inputType), b.build(builder, inputType), c.build(builder, 'float'));
            }
            else if (method === MathNode.MIX) {
                params.push(a.build(builder, inputType), b.build(builder, inputType), c.build(builder, builder.getTypeLength(c.getNodeType(builder)) === 1 ? 'float' : inputType));
            }
            else {
                params.push(a.build(builder, inputType));
                if (c !== null) {
                    params.push(b.build(builder, inputType), c.build(builder, inputType));
                }
                else if (b !== null) {
                    params.push(b.build(builder, inputType));
                }
            }
            return builder.format(`${builder.getMethod(method)}( ${params.join(', ')} )`, type, output);
        }
    }
    serialize(data) {
        super.serialize(data);
        data.method = this.method;
    }
    deserialize(data) {
        super.deserialize(data);
        this.method = data.method;
    }
}
// 1 input
MathNode.RADIANS = 'radians';
MathNode.DEGREES = 'degrees';
MathNode.EXP = 'exp';
MathNode.EXP2 = 'exp2';
MathNode.LOG = 'log';
MathNode.LOG2 = 'log2';
MathNode.SQRT = 'sqrt';
MathNode.INVERSE_SQRT = 'inversesqrt';
MathNode.FLOOR = 'floor';
MathNode.CEIL = 'ceil';
MathNode.NORMALIZE = 'normalize';
MathNode.FRACT = 'fract';
MathNode.SIN = 'sin';
MathNode.COS = 'cos';
MathNode.TAN = 'tan';
MathNode.ASIN = 'asin';
MathNode.ACOS = 'acos';
MathNode.ATAN = 'atan';
MathNode.ABS = 'abs';
MathNode.SIGN = 'sign';
MathNode.LENGTH = 'length';
MathNode.NEGATE = 'negate';
MathNode.INVERT = 'invert';
MathNode.DFDX = 'dFdx';
MathNode.DFDY = 'dFdy';
MathNode.SATURATE = 'saturate';
MathNode.ROUND = 'round';
// 2 inputs
MathNode.MIN = 'min';
MathNode.MAX = 'max';
MathNode.MOD = 'mod';
MathNode.STEP = 'step';
MathNode.REFLECT = 'reflect';
MathNode.DISTANCE = 'distance';
MathNode.DOT = 'dot';
MathNode.CROSS = 'cross';
MathNode.POW = 'pow';
MathNode.TRANSFORM_DIRECTION = 'transformDirection';
// 3 inputs
MathNode.MIX = 'mix';
MathNode.CLAMP = 'clamp';
MathNode.REFRACT = 'refract';
MathNode.SMOOTHSTEP = 'smoothstep';
MathNode.FACEFORWARD = 'faceforward';
exports.default = MathNode;
