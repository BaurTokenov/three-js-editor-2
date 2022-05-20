"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStrideLength = exports.getVectorLength = exports.getFloatLength = void 0;
const constants_1 = require("./constants");
function getFloatLength(floatLength) {
    // ensure chunk size alignment (STD140 layout)
    return floatLength + ((constants_1.GPUChunkSize - (floatLength % constants_1.GPUChunkSize)) % constants_1.GPUChunkSize);
}
exports.getFloatLength = getFloatLength;
function getVectorLength(count, vectorLength = 4) {
    const strideLength = getStrideLength(vectorLength);
    const floatLength = strideLength * count;
    return getFloatLength(floatLength);
}
exports.getVectorLength = getVectorLength;
function getStrideLength(vectorLength) {
    const strideLength = 4;
    return vectorLength + ((strideLength - (vectorLength % strideLength)) % strideLength);
}
exports.getStrideLength = getStrideLength;
