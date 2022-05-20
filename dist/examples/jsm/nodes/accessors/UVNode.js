"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AttributeNode_1 = __importDefault(require("../core/AttributeNode"));
class UVNode extends AttributeNode_1.default {
    constructor(index = 0) {
        super(null, 'vec2');
        this.index = index;
    }
    getAttributeName( /*builder*/) {
        const index = this.index;
        return 'uv' + (index > 0 ? index + 1 : '');
    }
    serialize(data) {
        super.serialize(data);
        data.index = this.index;
    }
    deserialize(data) {
        super.deserialize(data);
        this.index = data.index;
    }
}
UVNode.prototype.isUVNode = true;
exports.default = UVNode;
