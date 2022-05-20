"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = __importDefault(require("../core/Node"));
const TimerNode_1 = __importDefault(require("./TimerNode"));
const ShaderNodeBaseElements_1 = require("../shadernode/ShaderNodeBaseElements");
class OscNode extends Node_1.default {
    constructor(method = OscNode.SINE, timeNode = new TimerNode_1.default()) {
        super();
        this.method = method;
        this.timeNode = timeNode;
    }
    getNodeType(builder) {
        return this.timeNode.getNodeType(builder);
    }
    generate(builder) {
        const method = this.method;
        const timeNode = this.timeNode;
        let outputNode = null;
        if (method === OscNode.SINE) {
            outputNode = ShaderNodeBaseElements_1.add(ShaderNodeBaseElements_1.mul(ShaderNodeBaseElements_1.sin(ShaderNodeBaseElements_1.mul(ShaderNodeBaseElements_1.add(timeNode, 0.75), Math.PI * 2)), 0.5), 0.5);
        }
        else if (method === OscNode.SQUARE) {
            outputNode = ShaderNodeBaseElements_1.round(ShaderNodeBaseElements_1.fract(timeNode));
        }
        else if (method === OscNode.TRIANGLE) {
            outputNode = ShaderNodeBaseElements_1.abs(ShaderNodeBaseElements_1.sub(1, ShaderNodeBaseElements_1.mul(ShaderNodeBaseElements_1.fract(ShaderNodeBaseElements_1.add(timeNode, 0.5)), 2)));
        }
        else if (method === OscNode.SAWTOOTH) {
            outputNode = ShaderNodeBaseElements_1.fract(timeNode);
        }
        return outputNode.build(builder);
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
OscNode.SINE = 'sine';
OscNode.SQUARE = 'square';
OscNode.TRIANGLE = 'triangle';
OscNode.SAWTOOTH = 'sawtooth';
exports.default = OscNode;
