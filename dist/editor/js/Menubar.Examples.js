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
exports.MenubarExamples = void 0;
const THREE = __importStar(require("three"));
const ui_1 = require("./libs/ui");
function MenubarExamples(editor) {
    const strings = editor.strings;
    const container = new ui_1.UIPanel();
    container.setClass('menu');
    const title = new ui_1.UIPanel();
    title.setClass('title');
    title.setTextContent(strings.getKey('menubar/examples'));
    container.add(title);
    const options = new ui_1.UIPanel();
    options.setClass('options');
    container.add(options);
    // Examples
    const items = [
        { title: 'menubar/examples/Arkanoid', file: 'arkanoid.app.json' },
        { title: 'menubar/examples/Camera', file: 'camera.app.json' },
        { title: 'menubar/examples/Particles', file: 'particles.app.json' },
        { title: 'menubar/examples/Pong', file: 'pong.app.json' },
        { title: 'menubar/examples/Shaders', file: 'shaders.app.json' },
    ];
    const loader = new THREE.FileLoader();
    for (let i = 0; i < items.length; i += 1) {
        (function (i) {
            const item = items[i];
            const option = new ui_1.UIRow();
            option.setClass('option');
            option.setTextContent(strings.getKey(item.title));
            option.onClick(function () {
                if (confirm('Any unsaved data will be lost. Are you sure?')) {
                    loader.load('../examples/' + item.file, function (text) {
                        console.log('text', text);
                        // editor.clear();
                        // editor.fromJSON(JSON.parse(text));
                    });
                }
            });
            options.add(option);
        })(i);
    }
    return container;
}
exports.MenubarExamples = MenubarExamples;
