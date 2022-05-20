"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createText = void 0;
const THREE = __importStar(require("three"));
function createText(message, height) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    let metrics = null;
    const textHeight = 100;
    context.font = 'normal ' + textHeight + 'px Arial';
    metrics = context.measureText(message);
    const textWidth = metrics.width;
    canvas.width = textWidth;
    canvas.height = textHeight;
    context.font = 'normal ' + textHeight + 'px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillStyle = '#ffffff';
    context.fillText(message, textWidth / 2, textHeight / 2);
    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        map: texture,
        transparent: true,
    });
    const geometry = new THREE.PlaneGeometry((height * textWidth) / textHeight, height);
    const plane = new THREE.Mesh(geometry, material);
    return plane;
}
exports.createText = createText;
