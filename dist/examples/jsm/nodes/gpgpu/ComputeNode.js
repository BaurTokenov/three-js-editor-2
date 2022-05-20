"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = __importDefault(require("../core/Node"));
const constants_1 = require("../core/constants");
class ComputeNode extends Node_1.default {
    constructor(computeNode, count, workgroupSize = [64]) {
        super('void');
        this.computeNode = computeNode;
        this.count = count;
        this.workgroupSize = workgroupSize;
        this.dispatchCount = 0;
        this.updateType = constants_1.NodeUpdateType.Object;
        this.updateDispatchCount();
    }
    updateDispatchCount() {
        const { count, workgroupSize } = this;
        let size = workgroupSize[0];
        for (let i = 1; i < workgroupSize.length; i += 1)
            size *= workgroupSize[i];
        this.dispatchCount = Math.ceil(count / size);
    }
    update({ renderer }) {
        renderer.compute(this);
    }
    generate(builder) {
        const { shaderStage } = builder;
        if (shaderStage === 'compute') {
            const snippet = this.computeNode.build(builder, 'void');
            if (snippet !== '') {
                builder.addFlowCode(snippet);
            }
        }
    }
}
ComputeNode.prototype.isComputeNode = true;
exports.default = ComputeNode;
