"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XRHandModelFactory = void 0;
const three_1 = require("three");
const XRHandPrimitiveModel_1 = require("./XRHandPrimitiveModel");
const XRHandMeshModel_1 = require("./XRHandMeshModel");
class XRHandModel extends three_1.Object3D {
    constructor(controller) {
        super();
        this.controller = controller;
        this.motionController = null;
        this.envMap = null;
        this.mesh = null;
    }
    updateMatrixWorld(force) {
        super.updateMatrixWorld(force);
        if (this.motionController) {
            this.motionController.updateMesh();
        }
    }
}
class XRHandModelFactory {
    constructor() {
        this.path = null;
    }
    setPath(path) {
        this.path = path;
        return this;
    }
    createHandModel(controller, profile) {
        const handModel = new XRHandModel(controller);
        controller.addEventListener('connected', (event) => {
            const xrInputSource = event.data;
            if (xrInputSource.hand && !handModel.motionController) {
                handModel.xrInputSource = xrInputSource;
                // @todo Detect profile if not provided
                if (profile === undefined || profile === 'spheres') {
                    handModel.motionController = new XRHandPrimitiveModel_1.XRHandPrimitiveModel(handModel, controller, this.path, xrInputSource.handedness, { primitive: 'sphere' });
                }
                else if (profile === 'boxes') {
                    handModel.motionController = new XRHandPrimitiveModel_1.XRHandPrimitiveModel(handModel, controller, this.path, xrInputSource.handedness, { primitive: 'box' });
                }
                else if (profile === 'mesh') {
                    handModel.motionController = new XRHandMeshModel_1.XRHandMeshModel(handModel, controller, this.path, xrInputSource.handedness);
                }
            }
            controller.visible = true;
        });
        controller.addEventListener('disconnected', () => {
            controller.visible = false;
            // handModel.motionController = null;
            // handModel.remove( scene );
            // scene = null;
        });
        return handModel;
    }
}
exports.XRHandModelFactory = XRHandModelFactory;
