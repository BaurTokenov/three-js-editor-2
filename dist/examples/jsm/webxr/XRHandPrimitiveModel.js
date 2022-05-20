"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XRHandPrimitiveModel = void 0;
const three_1 = require("three");
const _matrix = new three_1.Matrix4();
const _vector = new three_1.Vector3();
class XRHandPrimitiveModel {
    constructor(handModel, controller, path, handedness, options) {
        this.controller = controller;
        this.handModel = handModel;
        this.envMap = null;
        let geometry;
        if (!options || !options.primitive || options.primitive === 'sphere') {
            geometry = new three_1.SphereGeometry(1, 10, 10);
        }
        else if (options.primitive === 'box') {
            geometry = new three_1.BoxGeometry(1, 1, 1);
        }
        const material = new three_1.MeshStandardMaterial();
        this.handMesh = new three_1.InstancedMesh(geometry, material, 30);
        this.handMesh.instanceMatrix.setUsage(three_1.DynamicDrawUsage); // will be updated every frame
        this.handMesh.castShadow = true;
        this.handMesh.receiveShadow = true;
        this.handModel.add(this.handMesh);
        this.joints = [
            'wrist',
            'thumb-metacarpal',
            'thumb-phalanx-proximal',
            'thumb-phalanx-distal',
            'thumb-tip',
            'index-finger-metacarpal',
            'index-finger-phalanx-proximal',
            'index-finger-phalanx-intermediate',
            'index-finger-phalanx-distal',
            'index-finger-tip',
            'middle-finger-metacarpal',
            'middle-finger-phalanx-proximal',
            'middle-finger-phalanx-intermediate',
            'middle-finger-phalanx-distal',
            'middle-finger-tip',
            'ring-finger-metacarpal',
            'ring-finger-phalanx-proximal',
            'ring-finger-phalanx-intermediate',
            'ring-finger-phalanx-distal',
            'ring-finger-tip',
            'pinky-finger-metacarpal',
            'pinky-finger-phalanx-proximal',
            'pinky-finger-phalanx-intermediate',
            'pinky-finger-phalanx-distal',
            'pinky-finger-tip'
        ];
    }
    updateMesh() {
        const defaultRadius = 0.008;
        const joints = this.controller.joints;
        let count = 0;
        for (let i = 0; i < this.joints.length; i++) {
            const joint = joints[this.joints[i]];
            if (joint.visible) {
                _vector.setScalar(joint.jointRadius || defaultRadius);
                _matrix.compose(joint.position, joint.quaternion, _vector);
                this.handMesh.setMatrixAt(i, _matrix);
                count++;
            }
        }
        this.handMesh.count = count;
        this.handMesh.instanceMatrix.needsUpdate = true;
    }
}
exports.XRHandPrimitiveModel = XRHandPrimitiveModel;
