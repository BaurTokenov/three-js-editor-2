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
exports.MenubarFile = void 0;
const THREE = __importStar(require("three"));
const fflate_module_1 = require("../../examples/jsm/libs/fflate.module");
const ui_1 = require("./libs/ui");
function MenubarFile(editor) {
    const config = editor.config;
    const strings = editor.strings;
    const container = new ui_1.UIPanel();
    container.setClass('menu');
    const title = new ui_1.UIPanel();
    title.setClass('title');
    title.setTextContent(strings.getKey('menubar/file'));
    container.add(title);
    const options = new ui_1.UIPanel();
    options.setClass('options');
    container.add(options);
    // New
    let option = new ui_1.UIRow();
    option.setClass('option');
    option.setTextContent(strings.getKey('menubar/file/new'));
    option.onClick(function () {
        if (confirm('Any unsaved data will be lost. Are you sure?')) {
            editor.clear();
        }
    });
    options.add(option);
    //
    options.add(new ui_1.UIHorizontalRule());
    // Import
    const form = document.createElement('form');
    form.style.display = 'none';
    document.body.appendChild(form);
    const fileInput = document.createElement('input');
    fileInput.multiple = true;
    fileInput.type = 'file';
    fileInput.addEventListener('change', function () {
        editor.loader.loadFiles(fileInput.files);
        form.reset();
    });
    form.appendChild(fileInput);
    option = new ui_1.UIRow();
    option.setClass('option');
    option.setTextContent(strings.getKey('menubar/file/import'));
    option.onClick(function () {
        fileInput.click();
    });
    options.add(option);
    //
    options.add(new ui_1.UIHorizontalRule());
    // Export Geometry
    option = new ui_1.UIRow();
    option.setClass('option');
    option.setTextContent(strings.getKey('menubar/file/export/geometry'));
    option.onClick(function () {
        const object = editor.selected;
        if (object === null) {
            alert('No object selected.');
            return;
        }
        const geometry = object.geometry;
        if (geometry === undefined) {
            alert("The selected object doesn't have geometry.");
            return;
        }
        let output = geometry.toJSON();
        try {
            output = JSON.stringify(output, null, '\t');
            output = output.replace(/[\n\t]+([\d\.e\-\[\]]+)/g, '$1');
        }
        catch (e) {
            output = JSON.stringify(output);
        }
        saveString(output, 'geometry.json');
    });
    options.add(option);
    // Export Object
    option = new ui_1.UIRow();
    option.setClass('option');
    option.setTextContent(strings.getKey('menubar/file/export/object'));
    option.onClick(function () {
        const object = editor.selected;
        if (object === null) {
            alert('No object selected');
            return;
        }
        let output = object.toJSON();
        try {
            output = JSON.stringify(output, null, '\t');
            output = output.replace(/[\n\t]+([\d\.e\-\[\]]+)/g, '$1');
        }
        catch (e) {
            output = JSON.stringify(output);
        }
        saveString(output, 'model.json');
    });
    options.add(option);
    // Export Scene
    option = new ui_1.UIRow();
    option.setClass('option');
    option.setTextContent(strings.getKey('menubar/file/export/scene'));
    option.onClick(function () {
        let output = editor.scene.toJSON();
        try {
            output = JSON.stringify(output, null, '\t');
            output = output.replace(/[\n\t]+([\d\.e\-\[\]]+)/g, '$1');
        }
        catch (e) {
            output = JSON.stringify(output);
        }
        saveString(output, 'scene.json');
    });
    options.add(option);
    //
    options.add(new ui_1.UIHorizontalRule());
    // Export DAE
    option = new ui_1.UIRow();
    option.setClass('option');
    option.setTextContent(strings.getKey('menubar/file/export/dae'));
    option.onClick(function () {
        return __awaiter(this, void 0, void 0, function* () {
            const { ColladaExporter } = yield Promise.resolve().then(() => __importStar(require('../../examples/jsm/exporters/ColladaExporter.js')));
            const exporter = new ColladaExporter();
            exporter.parse(editor.scene, function (result) {
                saveString(result.data, 'scene.dae');
            });
        });
    });
    options.add(option);
    // Export DRC
    option = new ui_1.UIRow();
    option.setClass('option');
    option.setTextContent(strings.getKey('menubar/file/export/drc'));
    option.onClick(function () {
        return __awaiter(this, void 0, void 0, function* () {
            const object = editor.selected;
            if (object === null || object.isMesh === undefined) {
                alert('No mesh selected');
                return;
            }
            const { DRACOExporter } = yield Promise.resolve().then(() => __importStar(require('../../examples/jsm/exporters/DRACOExporter.js')));
            const exporter = new DRACOExporter();
            const options = {
                decodeSpeed: 5,
                encodeSpeed: 5,
                encoderMethod: DRACOExporter.MESH_EDGEBREAKER_ENCODING,
                quantization: [16, 8, 8, 8, 8],
                exportUvs: true,
                exportNormals: true,
                exportColor: object.geometry.hasAttribute('color'),
            };
            // TODO: Change to DRACOExporter's parse( geometry, onParse )?
            const result = exporter.parse(object, options);
            saveArrayBuffer(result, 'model.drc');
        });
    });
    options.add(option);
    // Export GLB
    option = new ui_1.UIRow();
    option.setClass('option');
    option.setTextContent(strings.getKey('menubar/file/export/glb'));
    option.onClick(function () {
        return __awaiter(this, void 0, void 0, function* () {
            const scene = editor.scene;
            const animations = getAnimations(scene);
            const { GLTFExporter } = yield Promise.resolve().then(() => __importStar(require('../../examples/jsm/exporters/GLTFExporter.js')));
            const exporter = new GLTFExporter();
            exporter.parse(scene, function (result) {
                saveArrayBuffer(result, 'scene.glb');
            }, undefined, { binary: true, animations: animations });
        });
    });
    options.add(option);
    // Export GLTF
    option = new ui_1.UIRow();
    option.setClass('option');
    option.setTextContent(strings.getKey('menubar/file/export/gltf'));
    option.onClick(function () {
        return __awaiter(this, void 0, void 0, function* () {
            const scene = editor.scene;
            const animations = getAnimations(scene);
            const { GLTFExporter } = yield Promise.resolve().then(() => __importStar(require('../../examples/jsm/exporters/GLTFExporter.js')));
            const exporter = new GLTFExporter();
            exporter.parse(scene, function (result) {
                saveString(JSON.stringify(result, null, 2), 'scene.gltf');
            }, undefined, { animations: animations });
        });
    });
    options.add(option);
    // Export OBJ
    option = new ui_1.UIRow();
    option.setClass('option');
    option.setTextContent(strings.getKey('menubar/file/export/obj'));
    option.onClick(function () {
        return __awaiter(this, void 0, void 0, function* () {
            const object = editor.selected;
            if (object === null) {
                alert('No object selected.');
                return;
            }
            const { OBJExporter } = yield Promise.resolve().then(() => __importStar(require('../../examples/jsm/exporters/OBJExporter.js')));
            const exporter = new OBJExporter();
            saveString(exporter.parse(object), 'model.obj');
        });
    });
    options.add(option);
    // Export PLY (ASCII)
    option = new ui_1.UIRow();
    option.setClass('option');
    option.setTextContent(strings.getKey('menubar/file/export/ply'));
    option.onClick(function () {
        return __awaiter(this, void 0, void 0, function* () {
            const { PLYExporter } = yield Promise.resolve().then(() => __importStar(require('../../examples/jsm/exporters/PLYExporter.js')));
            const exporter = new PLYExporter();
            exporter.parse(editor.scene, function (result) {
                saveArrayBuffer(result, 'model.ply');
            });
        });
    });
    options.add(option);
    // Export PLY (Binary)
    option = new ui_1.UIRow();
    option.setClass('option');
    option.setTextContent(strings.getKey('menubar/file/export/ply_binary'));
    option.onClick(function () {
        return __awaiter(this, void 0, void 0, function* () {
            const { PLYExporter } = yield Promise.resolve().then(() => __importStar(require('../../examples/jsm/exporters/PLYExporter.js')));
            const exporter = new PLYExporter();
            exporter.parse(editor.scene, function (result) {
                saveArrayBuffer(result, 'model-binary.ply');
            }, { binary: true });
        });
    });
    options.add(option);
    // Export STL (ASCII)
    option = new ui_1.UIRow();
    option.setClass('option');
    option.setTextContent(strings.getKey('menubar/file/export/stl'));
    option.onClick(function () {
        return __awaiter(this, void 0, void 0, function* () {
            const { STLExporter } = yield Promise.resolve().then(() => __importStar(require('../../examples/jsm/exporters/STLExporter.js')));
            const exporter = new STLExporter();
            saveString(exporter.parse(editor.scene), 'model.stl');
        });
    });
    options.add(option);
    // Export STL (Binary)
    option = new ui_1.UIRow();
    option.setClass('option');
    option.setTextContent(strings.getKey('menubar/file/export/stl_binary'));
    option.onClick(function () {
        return __awaiter(this, void 0, void 0, function* () {
            const { STLExporter } = yield Promise.resolve().then(() => __importStar(require('../../examples/jsm/exporters/STLExporter.js')));
            const exporter = new STLExporter();
            saveArrayBuffer(exporter.parse(editor.scene, { binary: true }), 'model-binary.stl');
        });
    });
    options.add(option);
    // Export USDZ
    option = new ui_1.UIRow();
    option.setClass('option');
    option.setTextContent(strings.getKey('menubar/file/export/usdz'));
    option.onClick(function () {
        return __awaiter(this, void 0, void 0, function* () {
            const { USDZExporter } = yield Promise.resolve().then(() => __importStar(require('../../examples/jsm/exporters/USDZExporter.js')));
            const exporter = new USDZExporter();
            saveArrayBuffer(yield exporter.parse(editor.scene, { binary: true }), 'model.usdz');
        });
    });
    options.add(option);
    //
    options.add(new ui_1.UIHorizontalRule());
    // Publish
    option = new ui_1.UIRow();
    option.setClass('option');
    option.setTextContent(strings.getKey('menubar/file/publish'));
    option.onClick(function () {
        const toZip = {};
        //
        let output = editor.toJSON();
        output.metadata.type = 'App';
        delete output.history;
        output = JSON.stringify(output, null, '\t');
        output = output.replace(/[\n\t]+([\d\.e\-\[\]]+)/g, '$1');
        toZip['app.json'] = fflate_module_1.strToU8(output);
        //
        const title = config.getKey('project/title');
        const manager = new THREE.LoadingManager(function () {
            const zipped = fflate_module_1.zipSync(toZip, { level: 9 });
            const blob = new Blob([zipped.buffer], { type: 'application/zip' });
            save(blob, (title !== '' ? title : 'untitled') + '.zip');
        });
        const loader = new THREE.FileLoader(manager);
        loader.load('js/libs/app/index.html', function (content) {
            content = content.replace('<!-- title -->', title);
            const includes = [];
            content = content.replace('<!-- includes -->', includes.join('\n\t\t'));
            let editButton = '';
            if (config.getKey('project/editable')) {
                editButton = [
                    "			let button = document.createElement( 'a' );",
                    "			button.href = 'https://threejs.org/editor/#file=' + location.href.split( '/' ).slice( 0, - 1 ).join( '/' ) + '/app.json';",
                    "			button.style.cssText = 'position: absolute; bottom: 20px; right: 20px; padding: 10px 16px; color: #fff; border: 1px solid #fff; border-radius: 20px; text-decoration: none;';",
                    "			button.target = '_blank';",
                    "			button.textContent = 'EDIT';",
                    '			document.body.appendChild( button );',
                ].join('\n');
            }
            content = content.replace('\t\t\t/* edit button */', editButton);
            toZip['index.html'] = fflate_module_1.strToU8(content);
        });
        loader.load('js/libs/app.js', function (content) {
            toZip['js/app.js'] = fflate_module_1.strToU8(content);
        });
        loader.load('../build/three.module.js', function (content) {
            toZip['js/three.module.js'] = fflate_module_1.strToU8(content);
        });
        loader.load('../examples/jsm/webxr/VRButton.js', function (content) {
            toZip['js/VRButton.js'] = fflate_module_1.strToU8(content);
        });
    });
    options.add(option);
    //
    const link = document.createElement('a');
    function save(blob, filename) {
        if (link.href) {
            URL.revokeObjectURL(link.href);
        }
        link.href = URL.createObjectURL(blob);
        link.download = filename || 'data.json';
        link.dispatchEvent(new MouseEvent('click'));
    }
    function saveArrayBuffer(buffer, filename) {
        save(new Blob([buffer], { type: 'application/octet-stream' }), filename);
    }
    function saveString(text, filename) {
        save(new Blob([text], { type: 'text/plain' }), filename);
    }
    function getAnimations(scene) {
        const animations = [];
        scene.traverse(function (object) {
            animations.push(...object.animations);
        });
        return animations;
    }
    return container;
}
exports.MenubarFile = MenubarFile;
