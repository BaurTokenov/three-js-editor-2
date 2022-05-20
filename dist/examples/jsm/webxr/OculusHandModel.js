"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OculusHandModel = void 0;
const three_1 = require("three");
const XRHandMeshModel_1 = require("./XRHandMeshModel");
const TOUCH_RADIUS = 0.01;
const POINTING_JOINT = 'index-finger-tip';
class OculusHandModel extends three_1.Object3D {
    constructor(controller) {
        super();
        this.controller = controller;
        this.motionController = null;
        this.envMap = null;
        this.mesh = null;
        controller.addEventListener('connected', (event) => {
            const xrInputSource = event.data;
            if (xrInputSource.hand && !this.motionController) {
                this.xrInputSource = xrInputSource;
                this.motionController = new XRHandMeshModel_1.XRHandMeshModel(this, controller, this.path, xrInputSource.handedness);
            }
        });
        controller.addEventListener('disconnected', () => {
            this.clear();
            this.motionController = null;
        });
    }
    updateMatrixWorld(force) {
        super.updateMatrixWorld(force);
        if (this.motionController) {
            this.motionController.updateMesh();
        }
    }
    getPointerPosition() {
        const indexFingerTip = this.controller.joints[POINTING_JOINT];
        if (indexFingerTip) {
            return indexFingerTip.position;
        }
        else {
            return null;
        }
    }
    intersectBoxObject(boxObject) {
        const pointerPosition = this.getPointerPosition();
        if (pointerPosition) {
            const indexSphere = new three_1.Sphere(pointerPosition, TOUCH_RADIUS);
            const box = new three_1.Box3().setFromObject(boxObject);
            return indexSphere.intersectsBox(box);
        }
        else {
            return false;
        }
    }
    checkButton(button) {
        if (this.intersectBoxObject(button)) {
            button.onPress();
        }
        else {
            button.onClear();
        }
        if (button.isPressed()) {
            button.whilePressed();
        }
    }
}
exports.OculusHandModel = OculusHandModel;
