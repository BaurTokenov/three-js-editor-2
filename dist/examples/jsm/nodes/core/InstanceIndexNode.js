"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = __importDefault(require("./Node"));
class InstanceIndexNode extends Node_1.default {
    constructor() {
        super('uint');
    }
    generate(builder) {
        return builder.getInstanceIndex();
    }
}
InstanceIndexNode.prototype.isInstanceIndexNode = true;
exports.default = InstanceIndexNode;
