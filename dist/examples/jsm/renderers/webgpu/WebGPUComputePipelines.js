"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const WebGPUProgrammableStage_1 = __importDefault(require("./WebGPUProgrammableStage"));
class WebGPUComputePipelines {
    constructor(device, nodes) {
        this.device = device;
        this.nodes = nodes;
        this.pipelines = new WeakMap();
        this.stages = {
            compute: new WeakMap(),
        };
    }
    get(computeNode) {
        let pipeline = this.pipelines.get(computeNode);
        // @TODO: Reuse compute pipeline if possible, introduce WebGPUComputePipeline
        if (pipeline === undefined) {
            const device = this.device;
            // get shader
            const nodeBuilder = this.nodes.get(computeNode);
            const computeShader = nodeBuilder.computeShader;
            const shader = {
                computeShader,
            };
            // programmable stage
            let stageCompute = this.stages.compute.get(shader);
            if (stageCompute === undefined) {
                stageCompute = new WebGPUProgrammableStage_1.default(device, computeShader, 'compute');
                this.stages.compute.set(shader, stageCompute);
            }
            pipeline = device.createComputePipeline({
                compute: stageCompute.stage,
                layout: 'auto',
            });
            this.pipelines.set(computeNode, pipeline);
        }
        return pipeline;
    }
    dispose() {
        this.pipelines = new WeakMap();
        this.stages = {
            compute: new WeakMap(),
        };
    }
}
exports.default = WebGPUComputePipelines;
