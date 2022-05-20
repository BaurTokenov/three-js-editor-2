"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = __importDefault(require("../core/Node"));
const UniformNode_1 = __importDefault(require("../core/UniformNode"));
const constants_1 = require("../core/constants");
class ReferenceNode extends Node_1.default {
    constructor(property, uniformType, object = null) {
        super();
        this.property = property;
        this.uniformType = uniformType;
        this.object = object;
        this.node = null;
        this.updateType = constants_1.NodeUpdateType.Object;
        this.setNodeType(uniformType);
    }
    setNodeType(uniformType) {
        this.node = new UniformNode_1.default(null, uniformType);
        this.nodeType = uniformType;
        if (uniformType === 'color') {
            this.nodeType = 'vec3';
        }
        else if (uniformType === 'texture') {
            this.nodeType = 'vec4';
        }
    }
    getNodeType() {
        return this.uniformType;
    }
    update(frame) {
        const object = this.object !== null ? this.object : frame.object;
        const value = object[this.property];
        this.node.value = value;
    }
    generate(builder) {
        return this.node.build(builder, this.getNodeType(builder));
    }
}
exports.default = ReferenceNode;
