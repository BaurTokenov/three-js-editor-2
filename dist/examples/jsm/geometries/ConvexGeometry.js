"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvexGeometry = void 0;
const three_1 = require("three");
const ConvexHull_1 = require("../math/ConvexHull");
class ConvexGeometry extends three_1.BufferGeometry {
    constructor(points = []) {
        super();
        // buffers
        const vertices = [];
        const normals = [];
        if (ConvexHull_1.ConvexHull === undefined) {
            console.error('THREE.ConvexBufferGeometry: ConvexBufferGeometry relies on ConvexHull');
        }
        const convexHull = new ConvexHull_1.ConvexHull().setFromPoints(points);
        // generate vertices and normals
        const faces = convexHull.faces;
        for (let i = 0; i < faces.length; i += 1) {
            const face = faces[i];
            let edge = face.edge;
            // we move along a doubly-connected edge list to access all face points (see HalfEdge docs)
            do {
                const point = edge.head().point;
                vertices.push(point.x, point.y, point.z);
                normals.push(face.normal.x, face.normal.y, face.normal.z);
                edge = edge.next;
            } while (edge !== face.edge);
        }
        // build geometry
        this.setAttribute('position', new three_1.Float32BufferAttribute(vertices, 3));
        this.setAttribute('normal', new three_1.Float32BufferAttribute(normals, 3));
    }
}
exports.ConvexGeometry = ConvexGeometry;
