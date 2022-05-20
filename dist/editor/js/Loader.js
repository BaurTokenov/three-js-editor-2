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
exports.Loader = void 0;
const THREE = __importStar(require("three"));
const TGALoader_1 = require("../../examples/jsm/loaders/TGALoader");
const AddObjectCommand_1 = require("./commands/AddObjectCommand");
const SetSceneCommand_1 = require("./commands/SetSceneCommand");
const LoaderUtils_1 = require("./LoaderUtils");
const fflate_module_1 = require("../../examples/jsm/libs/fflate.module");
function Loader(editor) {
    const scope = this;
    this.texturePath = '';
    this.loadItemList = function (items) {
        LoaderUtils_1.LoaderUtils.getFilesFromItemList(items, function (files, filesMap) {
            scope.loadFiles(files, filesMap);
        });
    };
    this.loadFiles = function (files, filesMap) {
        if (files.length > 0) {
            filesMap = filesMap || LoaderUtils_1.LoaderUtils.createFilesMap(files);
            const manager = new THREE.LoadingManager();
            manager.setURLModifier(function (url) {
                url = url.replace(/^(\.?\/)/, ''); // remove './'
                const file = filesMap[url];
                if (file) {
                    console.log('Loading', url);
                    return URL.createObjectURL(file);
                }
                return url;
            });
            manager.addHandler(/\.tga$/i, new TGALoader_1.TGALoader());
            for (let i = 0; i < files.length; i += 1) {
                scope.loadFile(files[i], manager);
            }
        }
    };
    this.loadFile = function (file, manager) {
        const filename = file.name;
        const extension = filename.split('.').pop().toLowerCase();
        const reader = new FileReader();
        reader.addEventListener('progress', function (event) {
            const size = '(' + Math.floor(event.total / 1000).toLocaleString() + ' KB)';
            const progress = Math.floor((event.loaded / event.total) * 100) + '%';
            console.log('Loading', filename, size, progress);
        });
        switch (extension) {
            case '3dm': {
                reader.addEventListener('load', function (event) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const contents = event.target.result;
                        const { Rhino3dmLoader } = yield Promise.resolve().then(() => __importStar(require('../../examples/jsm/loaders/3DMLoader.js')));
                        const loader = new Rhino3dmLoader();
                        loader.setLibraryPath('../examples/jsm/libs/rhino3dm/');
                        loader.parse(contents, function (object) {
                            editor.execute(new AddObjectCommand_1.AddObjectCommand(editor, object));
                        });
                    });
                }, false);
                reader.readAsArrayBuffer(file);
                break;
            }
            case '3ds': {
                reader.addEventListener('load', function (event) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const { TDSLoader } = yield Promise.resolve().then(() => __importStar(require('../../examples/jsm/loaders/TDSLoader.js')));
                        const loader = new TDSLoader();
                        const object = loader.parse(event.target.result);
                        editor.execute(new AddObjectCommand_1.AddObjectCommand(editor, object));
                    });
                }, false);
                reader.readAsArrayBuffer(file);
                break;
            }
            case '3mf': {
                reader.addEventListener('load', function (event) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const { ThreeMFLoader } = yield Promise.resolve().then(() => __importStar(require('../../examples/jsm/loaders/3MFLoader.js')));
                        const loader = new ThreeMFLoader();
                        const object = loader.parse(event.target.result);
                        editor.execute(new AddObjectCommand_1.AddObjectCommand(editor, object));
                    });
                }, false);
                reader.readAsArrayBuffer(file);
                break;
            }
            case 'amf': {
                reader.addEventListener('load', function (event) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const { AMFLoader } = yield Promise.resolve().then(() => __importStar(require('../../examples/jsm/loaders/AMFLoader.js')));
                        const loader = new AMFLoader();
                        const amfobject = loader.parse(event.target.result);
                        editor.execute(new AddObjectCommand_1.AddObjectCommand(editor, amfobject));
                    });
                }, false);
                reader.readAsArrayBuffer(file);
                break;
            }
            case 'dae': {
                reader.addEventListener('load', function (event) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const contents = event.target.result;
                        const { ColladaLoader } = yield Promise.resolve().then(() => __importStar(require('../../examples/jsm/loaders/ColladaLoader.js')));
                        const loader = new ColladaLoader(manager);
                        const collada = loader.parse(contents);
                        collada.scene.name = filename;
                        editor.execute(new AddObjectCommand_1.AddObjectCommand(editor, collada.scene));
                    });
                }, false);
                reader.readAsText(file);
                break;
            }
            case 'drc': {
                reader.addEventListener('load', function (event) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const contents = event.target.result;
                        const { DRACOLoader } = yield Promise.resolve().then(() => __importStar(require('../../examples/jsm/loaders/DRACOLoader.js')));
                        const loader = new DRACOLoader();
                        loader.setDecoderPath('../examples/js/libs/draco/');
                        loader.decodeDracoFile(contents, function (geometry) {
                            let object;
                            if (geometry.index !== null) {
                                const material = new THREE.MeshStandardMaterial();
                                object = new THREE.Mesh(geometry, material);
                                object.name = filename;
                            }
                            else {
                                const material = new THREE.PointsMaterial({ size: 0.01 });
                                material.vertexColors = geometry.hasAttribute('color');
                                object = new THREE.Points(geometry, material);
                                object.name = filename;
                            }
                            loader.dispose();
                            editor.execute(new AddObjectCommand_1.AddObjectCommand(editor, object));
                        });
                    });
                }, false);
                reader.readAsArrayBuffer(file);
                break;
            }
            case 'fbx': {
                reader.addEventListener('load', function (event) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const contents = event.target.result;
                        const { FBXLoader } = yield Promise.resolve().then(() => __importStar(require('../../examples/jsm/loaders/FBXLoader.js')));
                        const loader = new FBXLoader(manager);
                        const object = loader.parse(contents);
                        editor.execute(new AddObjectCommand_1.AddObjectCommand(editor, object));
                    });
                }, false);
                reader.readAsArrayBuffer(file);
                break;
            }
            case 'glb': {
                reader.addEventListener('load', function (event) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const contents = event.target.result;
                        const { DRACOLoader } = yield Promise.resolve().then(() => __importStar(require('../../examples/jsm/loaders/DRACOLoader.js')));
                        const { GLTFLoader } = yield Promise.resolve().then(() => __importStar(require('../../examples/jsm/loaders/GLTFLoader.js')));
                        const dracoLoader = new DRACOLoader();
                        dracoLoader.setDecoderPath('../examples/js/libs/draco/gltf/');
                        const loader = new GLTFLoader();
                        loader.setDRACOLoader(dracoLoader);
                        loader.parse(contents, '', function (result) {
                            const scene = result.scene;
                            scene.name = filename;
                            scene.animations.push(...result.animations);
                            editor.execute(new AddObjectCommand_1.AddObjectCommand(editor, scene));
                        });
                    });
                }, false);
                reader.readAsArrayBuffer(file);
                break;
            }
            case 'gltf': {
                reader.addEventListener('load', function (event) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const contents = event.target.result;
                        let loader;
                        if (isGLTF1(contents)) {
                            alert('Import of glTF asset not possible. Only versions >= 2.0 are supported. Please try to upgrade the file to glTF 2.0 using glTF-Pipeline.');
                        }
                        else {
                            const { DRACOLoader } = yield Promise.resolve().then(() => __importStar(require('../../examples/jsm/loaders/DRACOLoader.js')));
                            const { GLTFLoader } = yield Promise.resolve().then(() => __importStar(require('../../examples/jsm/loaders/GLTFLoader.js')));
                            const dracoLoader = new DRACOLoader();
                            dracoLoader.setDecoderPath('../examples/js/libs/draco/gltf/');
                            loader = new GLTFLoader(manager);
                            loader.setDRACOLoader(dracoLoader);
                        }
                        loader.parse(contents, '', function (result) {
                            const scene = result.scene;
                            scene.name = filename;
                            scene.animations.push(...result.animations);
                            editor.execute(new AddObjectCommand_1.AddObjectCommand(editor, scene));
                        });
                    });
                }, false);
                reader.readAsArrayBuffer(file);
                break;
            }
            case 'js':
            case 'json': {
                reader.addEventListener('load', function (event) {
                    const contents = event.target.result;
                    // 2.0
                    if (contents.indexOf('postMessage') !== -1) {
                        const blob = new Blob([contents], { type: 'text/javascript' });
                        const url = URL.createObjectURL(blob);
                        const worker = new Worker(url);
                        worker.onmessage = function (event) {
                            event.data.metadata = { version: 2 };
                            handleJSON(event.data);
                        };
                        worker.postMessage(Date.now());
                        return;
                    }
                    // >= 3.0
                    let data;
                    try {
                        data = JSON.parse(contents);
                    }
                    catch (error) {
                        alert(error);
                        return;
                    }
                    handleJSON(data);
                }, false);
                reader.readAsText(file);
                break;
            }
            case 'ifc': {
                reader.addEventListener('load', function (event) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const { IFCLoader } = yield Promise.resolve().then(() => __importStar(require('../../examples/jsm/loaders/IFCLoader.js')));
                        const loader = new IFCLoader();
                        loader.ifcManager.setWasmPath('../../examples/jsm/loaders/ifc/');
                        const model = yield loader.parse(event.target.result);
                        model.mesh.name = filename;
                        editor.execute(new AddObjectCommand_1.AddObjectCommand(editor, model.mesh));
                    });
                }, false);
                reader.readAsArrayBuffer(file);
                break;
            }
            case 'kmz': {
                reader.addEventListener('load', function (event) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const { KMZLoader } = yield Promise.resolve().then(() => __importStar(require('../../examples/jsm/loaders/KMZLoader.js')));
                        const loader = new KMZLoader();
                        const collada = loader.parse(event.target.result);
                        collada.scene.name = filename;
                        editor.execute(new AddObjectCommand_1.AddObjectCommand(editor, collada.scene));
                    });
                }, false);
                reader.readAsArrayBuffer(file);
                break;
            }
            case 'ldr':
            case 'mpd': {
                reader.addEventListener('load', function (event) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const { LDrawLoader } = yield Promise.resolve().then(() => __importStar(require('../../examples/jsm/loaders/LDrawLoader.js')));
                        const loader = new LDrawLoader();
                        loader.setPath('../../examples/models/ldraw/officialLibrary/');
                        loader.parse(event.target.result, undefined, function (group) {
                            group.name = filename;
                            // Convert from LDraw coordinates: rotate 180 degrees around OX
                            group.rotation.x = Math.PI;
                            editor.execute(new AddObjectCommand_1.AddObjectCommand(editor, group));
                        });
                    });
                }, false);
                reader.readAsText(file);
                break;
            }
            case 'md2': {
                reader.addEventListener('load', function (event) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const contents = event.target.result;
                        const { MD2Loader } = yield Promise.resolve().then(() => __importStar(require('../../examples/jsm/loaders/MD2Loader.js')));
                        const geometry = new MD2Loader().parse(contents);
                        const material = new THREE.MeshStandardMaterial();
                        const mesh = new THREE.Mesh(geometry, material);
                        mesh.mixer = new THREE.AnimationMixer(mesh);
                        mesh.name = filename;
                        mesh.animations.push(...geometry.animations);
                        editor.execute(new AddObjectCommand_1.AddObjectCommand(editor, mesh));
                    });
                }, false);
                reader.readAsArrayBuffer(file);
                break;
            }
            case 'obj': {
                reader.addEventListener('load', function (event) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const contents = event.target.result;
                        const { OBJLoader } = yield Promise.resolve().then(() => __importStar(require('../../examples/jsm/loaders/OBJLoader.js')));
                        const object = new OBJLoader().parse(contents);
                        object.name = filename;
                        editor.execute(new AddObjectCommand_1.AddObjectCommand(editor, object));
                    });
                }, false);
                reader.readAsText(file);
                break;
            }
            case 'ply': {
                reader.addEventListener('load', function (event) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const contents = event.target.result;
                        const { PLYLoader } = yield Promise.resolve().then(() => __importStar(require('../../examples/jsm/loaders/PLYLoader.js')));
                        const geometry = new PLYLoader().parse(contents);
                        let object;
                        if (geometry.index !== null) {
                            const material = new THREE.MeshStandardMaterial();
                            object = new THREE.Mesh(geometry, material);
                            object.name = filename;
                        }
                        else {
                            const material = new THREE.PointsMaterial({ size: 0.01 });
                            material.vertexColors = geometry.hasAttribute('color');
                            object = new THREE.Points(geometry, material);
                            object.name = filename;
                        }
                        editor.execute(new AddObjectCommand_1.AddObjectCommand(editor, object));
                    });
                }, false);
                reader.readAsArrayBuffer(file);
                break;
            }
            case 'stl': {
                reader.addEventListener('load', function (event) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const contents = event.target.result;
                        const { STLLoader } = yield Promise.resolve().then(() => __importStar(require('../../examples/jsm/loaders/STLLoader.js')));
                        const geometry = new STLLoader().parse(contents);
                        const material = new THREE.MeshStandardMaterial();
                        const mesh = new THREE.Mesh(geometry, material);
                        mesh.name = filename;
                        editor.execute(new AddObjectCommand_1.AddObjectCommand(editor, mesh));
                    });
                }, false);
                if (reader.readAsBinaryString !== undefined) {
                    reader.readAsBinaryString(file);
                }
                else {
                    reader.readAsArrayBuffer(file);
                }
                break;
            }
            case 'svg': {
                reader.addEventListener('load', function (event) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const contents = event.target.result;
                        const { SVGLoader } = yield Promise.resolve().then(() => __importStar(require('../../examples/jsm/loaders/SVGLoader.js')));
                        const loader = new SVGLoader();
                        const paths = loader.parse(contents).paths;
                        //
                        const group = new THREE.Group();
                        group.scale.multiplyScalar(0.1);
                        group.scale.y *= -1;
                        for (let i = 0; i < paths.length; i += 1) {
                            const path = paths[i];
                            const material = new THREE.MeshBasicMaterial({
                                color: path.color,
                                depthWrite: false,
                            });
                            const shapes = SVGLoader.createShapes(path);
                            for (let j = 0; j < shapes.length; j++) {
                                const shape = shapes[j];
                                const geometry = new THREE.ShapeGeometry(shape);
                                const mesh = new THREE.Mesh(geometry, material);
                                group.add(mesh);
                            }
                        }
                        editor.execute(new AddObjectCommand_1.AddObjectCommand(editor, group));
                    });
                }, false);
                reader.readAsText(file);
                break;
            }
            case 'vox': {
                reader.addEventListener('load', function (event) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const contents = event.target.result;
                        const { VOXLoader, VOXMesh } = yield Promise.resolve().then(() => __importStar(require('../../examples/jsm/loaders/VOXLoader.js')));
                        const chunks = new VOXLoader().parse(contents);
                        const group = new THREE.Group();
                        group.name = filename;
                        for (let i = 0; i < chunks.length; i += 1) {
                            const chunk = chunks[i];
                            const mesh = new VOXMesh(chunk);
                            group.add(mesh);
                        }
                        editor.execute(new AddObjectCommand_1.AddObjectCommand(editor, group));
                    });
                }, false);
                reader.readAsArrayBuffer(file);
                break;
            }
            case 'vtk':
            case 'vtp': {
                reader.addEventListener('load', function (event) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const contents = event.target.result;
                        const { VTKLoader } = yield Promise.resolve().then(() => __importStar(require('../../examples/jsm/loaders/VTKLoader.js')));
                        const geometry = new VTKLoader().parse(contents);
                        const material = new THREE.MeshStandardMaterial();
                        const mesh = new THREE.Mesh(geometry, material);
                        mesh.name = filename;
                        editor.execute(new AddObjectCommand_1.AddObjectCommand(editor, mesh));
                    });
                }, false);
                reader.readAsArrayBuffer(file);
                break;
            }
            case 'wrl': {
                reader.addEventListener('load', function (event) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const contents = event.target.result;
                        const { VRMLLoader } = yield Promise.resolve().then(() => __importStar(require('../../examples/jsm/loaders/VRMLLoader.js')));
                        const result = new VRMLLoader().parse(contents);
                        editor.execute(new SetSceneCommand_1.SetSceneCommand(editor, result));
                    });
                }, false);
                reader.readAsText(file);
                break;
            }
            case 'xyz': {
                reader.addEventListener('load', function (event) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const contents = event.target.result;
                        const { XYZLoader } = yield Promise.resolve().then(() => __importStar(require('../../examples/jsm/loaders/XYZLoader.js')));
                        const geometry = new XYZLoader().parse(contents);
                        const material = new THREE.PointsMaterial();
                        material.vertexColors = geometry.hasAttribute('color');
                        const points = new THREE.Points(geometry, material);
                        points.name = filename;
                        editor.execute(new AddObjectCommand_1.AddObjectCommand(editor, points));
                    });
                }, false);
                reader.readAsText(file);
                break;
            }
            case 'zip': {
                reader.addEventListener('load', function (event) {
                    handleZIP(event.target.result);
                }, false);
                reader.readAsArrayBuffer(file);
                break;
            }
            default:
                console.error('Unsupported file format (' + extension + ').');
                break;
        }
    };
    function handleJSON(data) {
        if (data.metadata === undefined) {
            // 2.0
            data.metadata = { type: 'Geometry' };
        }
        if (data.metadata.type === undefined) {
            // 3.0
            data.metadata.type = 'Geometry';
        }
        if (data.metadata.formatVersion !== undefined) {
            data.metadata.version = data.metadata.formatVersion;
        }
        switch (data.metadata.type.toLowerCase()) {
            case 'buffergeometry': {
                const loader = new THREE.BufferGeometryLoader();
                const result = loader.parse(data);
                const mesh = new THREE.Mesh(result);
                editor.execute(new AddObjectCommand_1.AddObjectCommand(editor, mesh));
                break;
            }
            case 'geometry':
                console.error('Loader: "Geometry" is no longer supported.');
                break;
            case 'object': {
                const loader = new THREE.ObjectLoader();
                loader.setResourcePath(scope.texturePath);
                loader.parse(data, function (result) {
                    if (result.isScene) {
                        editor.execute(new SetSceneCommand_1.SetSceneCommand(editor, result));
                    }
                    else {
                        editor.execute(new AddObjectCommand_1.AddObjectCommand(editor, result));
                    }
                });
                break;
            }
            case 'app':
                editor.fromJSON(data);
                break;
        }
    }
    function handleZIP(contents) {
        return __awaiter(this, void 0, void 0, function* () {
            const zip = fflate_module_1.unzipSync(new Uint8Array(contents));
            // Poly
            if (zip['model.obj'] && zip['materials.mtl']) {
                const { MTLLoader } = yield Promise.resolve().then(() => __importStar(require('../../examples/jsm/loaders/MTLLoader.js')));
                const { OBJLoader } = yield Promise.resolve().then(() => __importStar(require('../../examples/jsm/loaders/OBJLoader.js')));
                const materials = new MTLLoader().parse(fflate_module_1.strFromU8(zip['materials.mtl']));
                const object = new OBJLoader().setMaterials(materials).parse(fflate_module_1.strFromU8(zip['model.obj']));
                editor.execute(new AddObjectCommand_1.AddObjectCommand(editor, object));
            }
            //
            for (const path in zip) {
                const file = zip[path];
                const manager = new THREE.LoadingManager();
                manager.setURLModifier(function (url) {
                    const file = zip[url];
                    if (file) {
                        console.log('Loading', url);
                        const blob = new Blob([file.buffer], { type: 'application/octet-stream' });
                        return URL.createObjectURL(blob);
                    }
                    return url;
                });
                const extension = path.split('.').pop().toLowerCase();
                switch (extension) {
                    case 'fbx': {
                        const { FBXLoader } = yield Promise.resolve().then(() => __importStar(require('../../examples/jsm/loaders/FBXLoader.js')));
                        const loader = new FBXLoader(manager);
                        const object = loader.parse(file.buffer);
                        editor.execute(new AddObjectCommand_1.AddObjectCommand(editor, object));
                        break;
                    }
                    case 'glb': {
                        const { DRACOLoader } = yield Promise.resolve().then(() => __importStar(require('../../examples/jsm/loaders/DRACOLoader.js')));
                        const { GLTFLoader } = yield Promise.resolve().then(() => __importStar(require('../../examples/jsm/loaders/GLTFLoader.js')));
                        const dracoLoader = new DRACOLoader();
                        dracoLoader.setDecoderPath('../examples/js/libs/draco/gltf/');
                        const loader = new GLTFLoader();
                        loader.setDRACOLoader(dracoLoader);
                        loader.parse(file.buffer, '', function (result) {
                            const scene = result.scene;
                            scene.animations.push(...result.animations);
                            editor.execute(new AddObjectCommand_1.AddObjectCommand(editor, scene));
                        });
                        break;
                    }
                    case 'gltf': {
                        const { DRACOLoader } = yield Promise.resolve().then(() => __importStar(require('../../examples/jsm/loaders/DRACOLoader.js')));
                        const { GLTFLoader } = yield Promise.resolve().then(() => __importStar(require('../../examples/jsm/loaders/GLTFLoader.js')));
                        const dracoLoader = new DRACOLoader();
                        dracoLoader.setDecoderPath('../examples/js/libs/draco/gltf/');
                        const loader = new GLTFLoader(manager);
                        loader.setDRACOLoader(dracoLoader);
                        loader.parse(fflate_module_1.strFromU8(file), '', function (result) {
                            const scene = result.scene;
                            scene.animations.push(...result.animations);
                            editor.execute(new AddObjectCommand_1.AddObjectCommand(editor, scene));
                        });
                        break;
                    }
                }
            }
        });
    }
    function isGLTF1(contents) {
        let resultContent;
        if (typeof contents === 'string') {
            // contents is a JSON string
            resultContent = contents;
        }
        else {
            const magic = THREE.LoaderUtils.decodeText(new Uint8Array(contents, 0, 4));
            if (magic === 'glTF') {
                // contents is a .glb file; extract the version
                const version = new DataView(contents).getUint32(4, true);
                return version < 2;
            }
            else {
                // contents is a .gltf file
                resultContent = THREE.LoaderUtils.decodeText(new Uint8Array(contents));
            }
        }
        const json = JSON.parse(resultContent);
        return json.asset != undefined && json.asset.version[0] < 2;
    }
}
exports.Loader = Loader;
