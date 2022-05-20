"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scene_1 = __importDefault(require("./scene"));
self.onmessage = function (message) {
    const data = message.data;
    scene_1.default(data.drawingSurface, data.width, data.height, data.pixelRatio, data.path);
};
