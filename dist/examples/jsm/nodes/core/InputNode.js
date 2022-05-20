"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = __importDefault(require("./Node"));
const NodeUtils_1 = require("./NodeUtils");
class InputNode extends Node_1.default {
    constructor(value, nodeType = null) {
        super(nodeType);
        this.value = value;
    }
    getNodeType( /*builder*/) {
        if (this.nodeType === null) {
            return NodeUtils_1.getValueType(this.value);
        }
        return this.nodeType;
    }
    getInputType(builder) {
        return this.getNodeType(builder);
    }
    serialize(data) {
        var _a, _b;
        super.serialize(data);
        data.value = ((_b = (_a = this.value) === null || _a === void 0 ? void 0 : _a.toArray) === null || _b === void 0 ? void 0 : _b.call(_a)) || this.value;
        data.valueType = NodeUtils_1.getValueType(this.value);
        data.nodeType = this.nodeType;
    }
    deserialize(data) {
        var _a, _b;
        super.deserialize(data);
        this.nodeType = data.nodeType;
        this.value = NodeUtils_1.getValueFromType(data.valueType);
        this.value = ((_b = (_a = this.value) === null || _a === void 0 ? void 0 : _a.fromArray) === null || _b === void 0 ? void 0 : _b.call(_a, data.value)) || data.value;
    }
    generate( /*builder, output*/) {
        console.warn('Abstract function.');
    }
}
InputNode.prototype.isInputNode = true;
exports.default = InputNode;
