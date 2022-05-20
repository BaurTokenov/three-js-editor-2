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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VR = void 0;
const THREE = __importStar(require("three"));
const HTMLMesh_1 = require("../../examples/jsm/interactive/HTMLMesh");
const InteractiveGroup_1 = require("../../examples/jsm/interactive/InteractiveGroup");
const XRControllerModelFactory_1 = require("../../examples/jsm/webxr/XRControllerModelFactory");
class VR {
    constructor(editor) {
        const signals = editor.signals;
        let group = null;
        let camera = null;
        let renderer = null;
        const intersectables = [];
        this.currentSession = null;
        const onSessionStarted = (session) => __awaiter(this, void 0, void 0, function* () {
            const sidebar = document.getElementById('sidebar');
            sidebar.style.width = '300px';
            sidebar.style.height = '700px';
            //
            if (group === null) {
                group = new InteractiveGroup_1.InteractiveGroup(renderer);
                editor.sceneHelpers.add(group);
                const mesh = new HTMLMesh_1.HTMLMesh(sidebar);
                mesh.position.set(1, 1.5, -0.5);
                mesh.rotation.y = -0.5;
                mesh.scale.setScalar(2);
                group.add(mesh);
                intersectables.push(mesh);
                // controllers
                const geometry = new THREE.BufferGeometry();
                geometry.setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -5)]);
                const controller1 = renderer.xr.getController(0);
                controller1.add(new THREE.Line(geometry));
                group.add(controller1);
                const controller2 = renderer.xr.getController(1);
                controller2.add(new THREE.Line(geometry));
                group.add(controller2);
                //
                const controllerModelFactory = new XRControllerModelFactory_1.XRControllerModelFactory();
                const controllerGrip1 = renderer.xr.getControllerGrip(0);
                controllerGrip1.add(controllerModelFactory.createControllerModel(controllerGrip1));
                group.add(controllerGrip1);
                const controllerGrip2 = renderer.xr.getControllerGrip(1);
                controllerGrip2.add(controllerModelFactory.createControllerModel(controllerGrip2));
                group.add(controllerGrip2);
            }
            camera = editor.camera.clone();
            group.visible = true;
            this.currentSession = session;
            this.currentSession.addEventListener('end', onSessionEnded);
            yield renderer.xr.setSession(this.currentSession);
        });
        const onSessionEnded = () => __awaiter(this, void 0, void 0, function* () {
            const sidebar = document.getElementById('sidebar');
            sidebar.style.width = '';
            sidebar.style.height = '';
            //
            editor.camera.copy(camera);
            group.visible = false;
            this.currentSession.removeEventListener('end', onSessionEnded);
            this.currentSession = null;
            yield renderer.xr.setSession(null);
            signals.exitedVR.dispatch();
        });
        // signals
        signals.toggleVR.add(() => {
            if (this.currentSession === null) {
                const sessionInit = { optionalFeatures: ['local-floor', 'bounded-floor'] };
                navigator.xr.requestSession('immersive-vr', sessionInit).then(onSessionStarted);
            }
            else {
                this.currentSession.end();
            }
        });
        signals.rendererCreated.add((value) => {
            renderer = value;
            renderer.xr.enabled = true;
        });
    }
}
exports.VR = VR;
