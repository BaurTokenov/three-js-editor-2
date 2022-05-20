"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LightingNode_1 = __importDefault(require("./LightingNode"));
const constants_1 = require("../core/constants");
const ShaderNodeElements_1 = require("../shadernode/ShaderNodeElements");
const three_1 = require("three");
class AnalyticLightNode extends LightingNode_1.default {
    constructor(light = null) {
        super();
        this.updateType = constants_1.NodeUpdateType.Object;
        this.light = light;
        this.colorNode = ShaderNodeElements_1.uniform(new three_1.Color());
    }
    getHash( /*builder*/) {
        return this.light.uuid;
    }
    update( /*frame*/) {
        const { light } = this;
        this.colorNode.value.copy(light.color).multiplyScalar(light.intensity);
    }
}
exports.default = AnalyticLightNode;
