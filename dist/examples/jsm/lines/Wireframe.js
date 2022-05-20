"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wireframe = void 0;
const three_1 = require("three");
const LineSegmentsGeometry_1 = require("../lines/LineSegmentsGeometry");
const LineMaterial_1 = require("../lines/LineMaterial");
const _start = new three_1.Vector3();
const _end = new three_1.Vector3();
class Wireframe extends three_1.Mesh {
    constructor(geometry = new LineSegmentsGeometry_1.LineSegmentsGeometry(), material = new LineMaterial_1.LineMaterial({ color: Math.random() * 0xffffff })) {
        super(geometry, material);
        this.type = 'Wireframe';
    }
    // for backwards-compatibility, but could be a method of LineSegmentsGeometry...
    computeLineDistances() {
        const geometry = this.geometry;
        const instanceStart = geometry.attributes.instanceStart;
        const instanceEnd = geometry.attributes.instanceEnd;
        const lineDistances = new Float32Array(2 * instanceStart.count);
        for (let i = 0, j = 0, l = instanceStart.count; i < l; i += 1, j += 2) {
            _start.fromBufferAttribute(instanceStart, i);
            _end.fromBufferAttribute(instanceEnd, i);
            lineDistances[j] = j === 0 ? 0 : lineDistances[j - 1];
            lineDistances[j + 1] = lineDistances[j] + _start.distanceTo(_end);
        }
        const instanceDistanceBuffer = new three_1.InstancedInterleavedBuffer(lineDistances, 2, 1); // d0, d1
        geometry.setAttribute('instanceDistanceStart', new three_1.InterleavedBufferAttribute(instanceDistanceBuffer, 1, 0)); // d0
        geometry.setAttribute('instanceDistanceEnd', new three_1.InterleavedBufferAttribute(instanceDistanceBuffer, 1, 1)); // d1
        return this;
    }
}
exports.Wireframe = Wireframe;
Wireframe.prototype.isWireframe = true;
