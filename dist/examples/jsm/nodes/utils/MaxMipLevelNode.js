"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UniformNode_1 = __importDefault(require("../core/UniformNode"));
const constants_1 = require("../core/constants");
class MaxMipLevelNode extends UniformNode_1.default {
    constructor(texture) {
        super(0);
        this.texture = texture;
        this.updateType = constants_1.NodeUpdateType.Frame;
    }
    update() {
        const image = this.texture.images ? this.texture.images[0].image || this.texture.images[0] : this.texture.image;
        if ((image === null || image === void 0 ? void 0 : image.width) !== undefined) {
            const { width, height } = image;
            this.value = Math.log2(Math.max(width, height));
        }
    }
}
exports.default = MaxMipLevelNode;
