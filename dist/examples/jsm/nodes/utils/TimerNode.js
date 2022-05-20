"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UniformNode_1 = __importDefault(require("../core/UniformNode"));
const constants_1 = require("../core/constants");
class TimerNode extends UniformNode_1.default {
    constructor(scope = TimerNode.LOCAL, scale = 1) {
        super(0);
        this.scope = scope;
        this.scale = scale;
        this.updateType = constants_1.NodeUpdateType.Frame;
    }
    update(frame) {
        const scope = this.scope;
        const scale = this.scale;
        if (scope === TimerNode.LOCAL) {
            this.value += frame.deltaTime * scale;
        }
        else if (scope === TimerNode.DELTA) {
            this.value = frame.deltaTime * scale;
        }
        else {
            // global
            this.value = frame.time * scale;
        }
    }
    serialize(data) {
        super.serialize(data);
        data.scope = this.scope;
        data.scale = this.scale;
    }
    deserialize(data) {
        super.deserialize(data);
        this.scope = data.scope;
        this.scale = data.scale;
    }
}
TimerNode.LOCAL = 'local';
TimerNode.GLOBAL = 'global';
TimerNode.DELTA = 'delta';
exports.default = TimerNode;
