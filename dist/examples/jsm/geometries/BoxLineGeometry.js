"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoxLineGeometry = void 0;
const three_1 = require("three");
class BoxLineGeometry extends three_1.BufferGeometry {
    constructor(width = 1, height = 1, depth = 1, widthSegments = 1, heightSegments = 1, depthSegments = 1) {
        super();
        widthSegments = Math.floor(widthSegments);
        heightSegments = Math.floor(heightSegments);
        depthSegments = Math.floor(depthSegments);
        const widthHalf = width / 2;
        const heightHalf = height / 2;
        const depthHalf = depth / 2;
        const segmentWidth = width / widthSegments;
        const segmentHeight = height / heightSegments;
        const segmentDepth = depth / depthSegments;
        const vertices = [];
        let x = -widthHalf;
        let y = -heightHalf;
        let z = -depthHalf;
        for (let i = 0; i <= widthSegments; i++) {
            vertices.push(x, -heightHalf, -depthHalf, x, heightHalf, -depthHalf);
            vertices.push(x, heightHalf, -depthHalf, x, heightHalf, depthHalf);
            vertices.push(x, heightHalf, depthHalf, x, -heightHalf, depthHalf);
            vertices.push(x, -heightHalf, depthHalf, x, -heightHalf, -depthHalf);
            x += segmentWidth;
        }
        for (let i = 0; i <= heightSegments; i++) {
            vertices.push(-widthHalf, y, -depthHalf, widthHalf, y, -depthHalf);
            vertices.push(widthHalf, y, -depthHalf, widthHalf, y, depthHalf);
            vertices.push(widthHalf, y, depthHalf, -widthHalf, y, depthHalf);
            vertices.push(-widthHalf, y, depthHalf, -widthHalf, y, -depthHalf);
            y += segmentHeight;
        }
        for (let i = 0; i <= depthSegments; i++) {
            vertices.push(-widthHalf, -heightHalf, z, -widthHalf, heightHalf, z);
            vertices.push(-widthHalf, heightHalf, z, widthHalf, heightHalf, z);
            vertices.push(widthHalf, heightHalf, z, widthHalf, -heightHalf, z);
            vertices.push(widthHalf, -heightHalf, z, -widthHalf, -heightHalf, z);
            z += segmentDepth;
        }
        this.setAttribute('position', new three_1.Float32BufferAttribute(vertices, 3));
    }
}
exports.BoxLineGeometry = BoxLineGeometry;
