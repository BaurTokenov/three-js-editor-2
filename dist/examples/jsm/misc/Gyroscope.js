"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gyroscope = void 0;
const three_1 = require("three");
const _translationObject = new three_1.Vector3();
const _quaternionObject = new three_1.Quaternion();
const _scaleObject = new three_1.Vector3();
const _translationWorld = new three_1.Vector3();
const _quaternionWorld = new three_1.Quaternion();
const _scaleWorld = new three_1.Vector3();
class Gyroscope extends three_1.Object3D {
    constructor() {
        super();
    }
    updateMatrixWorld(force) {
        this.matrixAutoUpdate && this.updateMatrix();
        // update matrixWorld
        if (this.matrixWorldNeedsUpdate || force) {
            if (this.parent !== null) {
                this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix);
                this.matrixWorld.decompose(_translationWorld, _quaternionWorld, _scaleWorld);
                this.matrix.decompose(_translationObject, _quaternionObject, _scaleObject);
                this.matrixWorld.compose(_translationWorld, _quaternionObject, _scaleWorld);
            }
            else {
                this.matrixWorld.copy(this.matrix);
            }
            this.matrixWorldNeedsUpdate = false;
            force = true;
        }
        // update children
        for (let i = 0, l = this.children.length; i < l; i++) {
            this.children[i].updateMatrixWorld(force);
        }
    }
}
exports.Gyroscope = Gyroscope;
