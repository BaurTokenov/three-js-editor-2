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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Viewport = void 0;
const THREE = __importStar(require("three"));
const TransformControls_1 = require("../../examples/jsm/controls/TransformControls");
const ui_1 = require("./libs/ui");
const EditorControls_1 = require("./EditorControls");
const Viewport_Camera_1 = require("./Viewport.Camera");
const Viewport_Info_1 = require("./Viewport.Info");
const Viewport_ViewHelper_1 = require("./Viewport.ViewHelper");
const Viewport_VR_1 = require("./Viewport.VR");
const SetPositionCommand_1 = require("./commands/SetPositionCommand");
const SetRotationCommand_1 = require("./commands/SetRotationCommand");
const SetScaleCommand_1 = require("./commands/SetScaleCommand");
const RoomEnvironment_1 = require("../../examples/jsm/environments/RoomEnvironment");
function Viewport(editor) {
    const signals = editor.signals;
    const container = new ui_1.UIPanel();
    container.setId('viewport');
    container.setPosition('absolute');
    container.add(new Viewport_Camera_1.ViewportCamera(editor));
    container.add(new Viewport_Info_1.ViewportInfo(editor));
    //
    let renderer = null;
    let pmremGenerator = null;
    const camera = editor.camera;
    const scene = editor.scene;
    const sceneHelpers = editor.sceneHelpers;
    let showSceneHelpers = true;
    // helpers
    const grid = new THREE.Group();
    const grid1 = new THREE.GridHelper(30, 30, 0x888888);
    grid1.material.color.setHex(0x888888);
    grid1.material.vertexColors = false;
    grid.add(grid1);
    const grid2 = new THREE.GridHelper(30, 6, 0x222222);
    grid2.material.color.setHex(0x222222);
    grid2.material.depthFunc = THREE.AlwaysDepth;
    grid2.material.vertexColors = false;
    grid.add(grid2);
    const viewHelper = new Viewport_ViewHelper_1.ViewHelper(camera, container);
    const vr = new Viewport_VR_1.VR(editor);
    //
    const box = new THREE.Box3();
    const selectionBox = new THREE.Box3Helper(box);
    selectionBox.material.depthTest = false;
    selectionBox.material.transparent = true;
    selectionBox.visible = false;
    sceneHelpers.add(selectionBox);
    let objectPositionOnDown = null;
    let objectRotationOnDown = null;
    let objectScaleOnDown = null;
    const transformControls = new TransformControls_1.TransformControls(camera, container.dom);
    transformControls.addEventListener('change', function () {
        const object = transformControls.object;
        if (object !== undefined) {
            box.setFromObject(object, true);
            const helper = editor.helpers[object.id];
            if (helper !== undefined && helper.isSkeletonHelper !== true) {
                helper.update();
            }
            signals.refreshSidebarObject3D.dispatch(object);
        }
        render();
    });
    transformControls.addEventListener('mouseDown', function () {
        const object = transformControls.object;
        objectPositionOnDown = object.position.clone();
        objectRotationOnDown = object.rotation.clone();
        objectScaleOnDown = object.scale.clone();
        controls.enabled = false;
    });
    transformControls.addEventListener('mouseUp', function () {
        const object = transformControls.object;
        if (object !== undefined) {
            switch (transformControls.getMode()) {
                case 'translate':
                    if (!objectPositionOnDown.equals(object.position)) {
                        editor.execute(new SetPositionCommand_1.SetPositionCommand(editor, object, object.position, objectPositionOnDown));
                    }
                    break;
                case 'rotate':
                    if (!objectRotationOnDown.equals(object.rotation)) {
                        editor.execute(new SetRotationCommand_1.SetRotationCommand(editor, object, object.rotation, objectRotationOnDown));
                    }
                    break;
                case 'scale':
                    if (!objectScaleOnDown.equals(object.scale)) {
                        editor.execute(new SetScaleCommand_1.SetScaleCommand(editor, object, object.scale, objectScaleOnDown));
                    }
                    break;
            }
        }
        controls.enabled = true;
    });
    sceneHelpers.add(transformControls);
    // object picking
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    // events
    function updateAspectRatio() {
        camera.aspect = container.dom.offsetWidth / container.dom.offsetHeight;
        camera.updateProjectionMatrix();
    }
    function getIntersects(point) {
        mouse.set(point.x * 2 - 1, -(point.y * 2) + 1);
        raycaster.setFromCamera(mouse, camera);
        const objects = [];
        scene.traverseVisible(function (child) {
            objects.push(child);
        });
        sceneHelpers.traverseVisible(function (child) {
            if (child.name === 'picker')
                objects.push(child);
        });
        return raycaster.intersectObjects(objects, false);
    }
    const onDownPosition = new THREE.Vector2();
    const onUpPosition = new THREE.Vector2();
    const onDoubleClickPosition = new THREE.Vector2();
    function getMousePosition(dom, x, y) {
        const rect = dom.getBoundingClientRect();
        return [(x - rect.left) / rect.width, (y - rect.top) / rect.height];
    }
    function handleClick() {
        if (onDownPosition.distanceTo(onUpPosition) === 0) {
            const intersects = getIntersects(onUpPosition);
            if (intersects.length > 0) {
                const object = intersects[0].object;
                if (object.userData.object !== undefined) {
                    // helper
                    editor.select(object.userData.object);
                }
                else {
                    editor.select(object);
                }
            }
            else {
                editor.select(null);
            }
            render();
        }
    }
    function onMouseDown(event) {
        // event.preventDefault();
        const array = getMousePosition(container.dom, event.clientX, event.clientY);
        onDownPosition.fromArray(array);
        editor.domElement.addEventListener('mouseup', onMouseUp);
    }
    function onMouseUp(event) {
        const array = getMousePosition(container.dom, event.clientX, event.clientY);
        onUpPosition.fromArray(array);
        handleClick();
        editor.domElement.removeEventListener('mouseup', onMouseUp);
    }
    function onTouchStart(event) {
        const touch = event.changedTouches[0];
        const array = getMousePosition(container.dom, touch.clientX, touch.clientY);
        onDownPosition.fromArray(array);
        editor.domElement.addEventListener('touchend', onTouchEnd);
    }
    function onTouchEnd(event) {
        const touch = event.changedTouches[0];
        const array = getMousePosition(container.dom, touch.clientX, touch.clientY);
        onUpPosition.fromArray(array);
        handleClick();
        editor.domElement.removeEventListener('touchend', onTouchEnd);
    }
    function onDoubleClick(event) {
        const array = getMousePosition(container.dom, event.clientX, event.clientY);
        onDoubleClickPosition.fromArray(array);
        const intersects = getIntersects(onDoubleClickPosition);
        if (intersects.length > 0) {
            const intersect = intersects[0];
            signals.objectFocused.dispatch(intersect.object);
        }
    }
    container.dom.addEventListener('mousedown', onMouseDown);
    container.dom.addEventListener('touchstart', onTouchStart);
    container.dom.addEventListener('dblclick', onDoubleClick);
    // controls need to be added *after* main logic,
    // otherwise controls.enabled doesn't work.
    const controls = new EditorControls_1.EditorControls(camera, container.dom);
    controls.addEventListener('change', function () {
        signals.cameraChanged.dispatch(camera);
        signals.refreshSidebarObject3D.dispatch(camera);
    });
    viewHelper.controls = controls;
    // signals
    signals.editorCleared.add(function () {
        controls.center.set(0, 0, 0);
        render();
    });
    signals.transformModeChanged.add(function (mode) {
        transformControls.setMode(mode);
    });
    signals.snapChanged.add(function (dist) {
        transformControls.setTranslationSnap(dist);
    });
    signals.spaceChanged.add(function (space) {
        transformControls.setSpace(space);
    });
    signals.rendererUpdated.add(function () {
        scene.traverse(function (child) {
            if (child.material !== undefined) {
                child.material.needsUpdate = true;
            }
        });
        render();
    });
    signals.rendererCreated.add(function (newRenderer) {
        if (renderer !== null) {
            renderer.setAnimationLoop(null);
            renderer.dispose();
            pmremGenerator.dispose();
            container.dom.removeChild(renderer.domElement);
        }
        renderer = newRenderer;
        renderer.setAnimationLoop(animate);
        renderer.setClearColor(0xaaaaaa);
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addEventListener('change', function (event) {
                renderer.setClearColor(event.matches ? 0x333333 : 0xaaaaaa);
                updateGridColors(grid1, grid2, event.matches ? [0x222222, 0x888888] : [0x888888, 0x282828]);
                render();
            });
            renderer.setClearColor(mediaQuery.matches ? 0x333333 : 0xaaaaaa);
            updateGridColors(grid1, grid2, mediaQuery.matches ? [0x222222, 0x888888] : [0x888888, 0x282828]);
        }
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(container.dom.offsetWidth, container.dom.offsetHeight);
        pmremGenerator = new THREE.PMREMGenerator(renderer);
        pmremGenerator.compileEquirectangularShader();
        container.dom.appendChild(renderer.domElement);
        render();
    });
    signals.sceneGraphChanged.add(function () {
        render();
    });
    signals.cameraChanged.add(function () {
        render();
    });
    signals.objectSelected.add(function (object) {
        selectionBox.visible = false;
        transformControls.detach();
        if (object !== null && object !== scene && object !== camera) {
            box.setFromObject(object, true);
            if (box.isEmpty() === false) {
                selectionBox.visible = true;
            }
            transformControls.attach(object);
        }
        render();
    });
    signals.objectFocused.add(function (object) {
        controls.focus(object);
    });
    signals.geometryChanged.add(function (object) {
        if (object !== undefined) {
            box.setFromObject(object, true);
        }
        render();
    });
    signals.objectChanged.add(function (object) {
        if (editor.selected === object) {
            box.setFromObject(object, true);
        }
        if (object.isPerspectiveCamera) {
            object.updateProjectionMatrix();
        }
        if (editor.helpers[object.id] !== undefined) {
            editor.helpers[object.id].update();
        }
        render();
    });
    signals.objectRemoved.add(function (object) {
        controls.enabled = true; // see #14180
        if (object === transformControls.object) {
            transformControls.detach();
        }
    });
    signals.materialChanged.add(function () {
        render();
    });
    // background
    signals.sceneBackgroundChanged.add(function (backgroundType, backgroundColor, backgroundTexture, backgroundEquirectangularTexture) {
        switch (backgroundType) {
            case 'None':
                scene.background = null;
                break;
            case 'Color':
                scene.background = new THREE.Color(backgroundColor);
                break;
            case 'Texture':
                if (backgroundTexture) {
                    scene.background = backgroundTexture;
                }
                break;
            case 'Equirectangular':
                if (backgroundEquirectangularTexture) {
                    backgroundEquirectangularTexture.mapping =
                        THREE.EquirectangularReflectionMapping;
                    scene.background = backgroundEquirectangularTexture;
                }
                break;
        }
        render();
    });
    // environment
    signals.sceneEnvironmentChanged.add(function (environmentType, environmentEquirectangularTexture) {
        switch (environmentType) {
            case 'None':
                scene.environment = null;
                break;
            case 'Equirectangular':
                scene.environment = null;
                if (environmentEquirectangularTexture) {
                    environmentEquirectangularTexture.mapping =
                        THREE.EquirectangularReflectionMapping;
                    scene.environment = environmentEquirectangularTexture;
                }
                break;
            case 'ModelViewer':
                scene.environment = pmremGenerator.fromScene(new RoomEnvironment_1.RoomEnvironment(), 0.04).texture;
                break;
        }
        render();
    });
    // fog
    signals.sceneFogChanged.add(function (fogType, fogColor, fogNear, fogFar, fogDensity) {
        switch (fogType) {
            case 'None':
                scene.fog = null;
                break;
            case 'Fog':
                scene.fog = new THREE.Fog(fogColor, fogNear, fogFar);
                break;
            case 'FogExp2':
                scene.fog = new THREE.FogExp2(fogColor, fogDensity);
                break;
        }
        render();
    });
    signals.sceneFogSettingsChanged.add(function (fogType, fogColor, fogNear, fogFar, fogDensity) {
        switch (fogType) {
            case 'Fog':
                scene.fog.color.setHex(fogColor);
                scene.fog.near = fogNear;
                scene.fog.far = fogFar;
                break;
            case 'FogExp2':
                scene.fog.color.setHex(fogColor);
                scene.fog.density = fogDensity;
                break;
        }
        render();
    });
    signals.viewportCameraChanged.add(function () {
        const viewportCamera = editor.viewportCamera;
        if (viewportCamera.isPerspectiveCamera) {
            viewportCamera.aspect = editor.camera.aspect;
            viewportCamera.projectionMatrix.copy(editor.camera.projectionMatrix);
        }
        else if (viewportCamera.isOrthographicCamera) {
            // TODO
        }
        // disable EditorControls when setting a user camera
        controls.enabled = viewportCamera === editor.camera;
        render();
    });
    signals.exitedVR.add(render);
    //
    signals.windowResize.add(function () {
        updateAspectRatio();
        renderer.setSize(container.dom.offsetWidth, container.dom.offsetHeight);
        render();
    });
    signals.showGridChanged.add(function (showGrid) {
        grid.visible = showGrid;
        render();
    });
    signals.showHelpersChanged.add(function (showHelpers) {
        showSceneHelpers = showHelpers;
        transformControls.enabled = showHelpers;
        render();
    });
    signals.cameraResetted.add(updateAspectRatio);
    // animations
    let prevActionsInUse = 0;
    const clock = new THREE.Clock(); // only used for animations
    function animate() {
        const mixer = editor.mixer;
        const delta = clock.getDelta();
        let needsUpdate = false;
        // Animations
        const actions = mixer.stats.actions;
        if (actions.inUse > 0 || prevActionsInUse > 0) {
            prevActionsInUse = actions.inUse;
            mixer.update(delta);
            needsUpdate = true;
        }
        // View Helper
        if (viewHelper.animating === true) {
            viewHelper.update(delta);
            needsUpdate = true;
        }
        if (vr.currentSession !== null) {
            needsUpdate = true;
        }
        if (needsUpdate === true)
            render();
    }
    //
    let startTime = 0;
    let endTime = 0;
    function render() {
        startTime = performance.now();
        // Adding/removing grid to scene so materials with depthWrite false
        // don't render under the grid.
        scene.add(grid);
        renderer.setViewport(0, 0, container.dom.offsetWidth, container.dom.offsetHeight);
        renderer.render(scene, editor.viewportCamera);
        scene.remove(grid);
        if (camera === editor.viewportCamera) {
            renderer.autoClear = false;
            if (showSceneHelpers === true)
                renderer.render(sceneHelpers, camera);
            if (vr.currentSession === null)
                viewHelper.render(renderer);
            renderer.autoClear = true;
        }
        endTime = performance.now();
        editor.signals.sceneRendered.dispatch(endTime - startTime);
    }
    return container;
}
exports.Viewport = Viewport;
function updateGridColors(grid1, grid2, colors) {
    grid1.material.color.setHex(colors[0]);
    grid2.material.color.setHex(colors[1]);
}
