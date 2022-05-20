"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VertexTangentsHelper = void 0;
const three_1 = require("three");
const _v1 = new three_1.Vector3();
const _v2 = new three_1.Vector3();
class VertexTangentsHelper extends three_1.LineSegments {
    constructor(object, size = 1, color = 0x00ffff) {
        const geometry = new three_1.BufferGeometry();
        const nTangents = object.geometry.attributes.tangent.count;
        const positions = new three_1.Float32BufferAttribute(nTangents * 2 * 3, 3);
        geometry.setAttribute('position', positions);
        super(geometry, new three_1.LineBasicMaterial({ color, toneMapped: false }));
        this.object = object;
        this.size = size;
        this.type = 'VertexTangentsHelper';
        //
        this.matrixAutoUpdate = false;
        this.update();
    }
    update() {
        this.object.updateMatrixWorld(true);
        const matrixWorld = this.object.matrixWorld;
        const position = this.geometry.attributes.position;
        //
        const objGeometry = this.object.geometry;
        const objPos = objGeometry.attributes.position;
        const objTan = objGeometry.attributes.tangent;
        let idx = 0;
        // for simplicity, ignore index and drawcalls, and render every tangent
        for (let j = 0, jl = objPos.count; j < jl; j++) {
            _v1.fromBufferAttribute(objPos, j).applyMatrix4(matrixWorld);
            _v2.fromBufferAttribute(objTan, j);
            _v2.transformDirection(matrixWorld).multiplyScalar(this.size).add(_v1);
            position.setXYZ(idx, _v1.x, _v1.y, _v1.z);
            idx = idx + 1;
            position.setXYZ(idx, _v2.x, _v2.y, _v2.z);
            idx = idx + 1;
        }
        position.needsUpdate = true;
    }
}
exports.VertexTangentsHelper = VertexTangentsHelper;
