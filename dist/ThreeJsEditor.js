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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreeJsEditor = void 0;
const styled_1 = __importDefault(require("@emotion/styled"));
const lodash_1 = __importDefault(require("lodash"));
const react_1 = __importStar(require("react"));
const THREE = __importStar(require("three"));
const Editor_1 = require("./editor/js/Editor");
const Menubar_1 = require("./editor/js/Menubar");
const Player_1 = require("./editor/js/Player");
const Resizer_1 = require("./editor/js/Resizer");
const Sidebar_1 = require("./editor/js/Sidebar");
const Toolbar_1 = require("./editor/js/Toolbar");
const Viewport_1 = require("./editor/js/Viewport");
const VRButton_1 = require("./examples/jsm/webxr/VRButton");
const ThreeJsEditor = ({ menubarCallbacks, setObjectLoaderFunction, setClearEditorFunction, menubarRenameMap, }) => {
    const hostDivRef = react_1.useRef(null);
    react_1.useEffect(() => {
        if (lodash_1.default.isNull(hostDivRef.current))
            return;
        window.URL = window.URL || window.webkitURL;
        // eslint-disable-next-line no-extend-native
        // Number.prototype.format = function () {
        //   return this.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        // };
        //
        const hostDiv = hostDivRef.current;
        const editor = new Editor_1.Editor(hostDiv);
        window.editor = editor; // Expose editor to Console
        window.THREE = THREE; // Expose THREE to APP Scripts and Console
        window.VRButton = VRButton_1.VRButton; // Expose VRButton to APP Scripts
        const viewport = Viewport_1.Viewport(editor);
        hostDiv.appendChild(viewport.dom);
        const toolbar = Toolbar_1.Toolbar(editor);
        hostDiv.appendChild(toolbar.dom);
        // const script = Script(editor);
        // hostDiv.appendChild(script.dom);
        const player = Player_1.Player(editor);
        hostDiv.appendChild(player.dom);
        const sidebar = Sidebar_1.Sidebar(editor);
        hostDiv.appendChild(sidebar.dom);
        const menubar = Menubar_1.Menubar(editor, menubarCallbacks, menubarRenameMap);
        hostDiv.appendChild(menubar.dom);
        const resizer = Resizer_1.Resizer(editor);
        hostDiv.appendChild(resizer.dom);
        //
        editor.storage.init(() => {
            editor.storage.get((state) => {
                if (isLoadingFromHash)
                    return;
                if (state !== undefined) {
                    editor.fromJSON(state);
                }
                const selected = editor.config.getKey('selected');
                if (selected !== undefined) {
                    editor.selectByUuid(selected);
                }
            });
            //
            let timeout;
            function saveState() {
                if (editor.config.getKey('autosave') === false) {
                    return;
                }
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    editor.signals.savingStarted.dispatch();
                    timeout = setTimeout(() => {
                        editor.storage.set(editor.toJSON());
                        editor.signals.savingFinished.dispatch();
                    }, 100);
                }, 1000);
            }
            const { signals } = editor;
            signals.geometryChanged.add(saveState);
            signals.objectAdded.add(saveState);
            signals.objectChanged.add(saveState);
            signals.objectRemoved.add(saveState);
            signals.materialChanged.add(saveState);
            signals.sceneBackgroundChanged.add(saveState);
            signals.sceneEnvironmentChanged.add(saveState);
            signals.sceneFogChanged.add(saveState);
            signals.sceneGraphChanged.add(saveState);
            signals.scriptChanged.add(saveState);
            signals.historyChanged.add(saveState);
        });
        if (lodash_1.default.isFunction(setObjectLoaderFunction)) {
            setObjectLoaderFunction(editor.loader.loadFiles);
        }
        if (lodash_1.default.isFunction(setClearEditorFunction)) {
            setClearEditorFunction(editor.clear.bind(editor));
        }
        //
        hostDiv.addEventListener('dragover', (event) => {
            if (lodash_1.default.isNull(event.dataTransfer))
                return;
            event.preventDefault();
            event.dataTransfer.dropEffect = 'copy';
        });
        hostDiv.addEventListener('drop', (event) => {
            if (lodash_1.default.isNull(event.dataTransfer))
                return;
            event.preventDefault();
            if (event.dataTransfer.types[0] === 'text/plain')
                return; // Outliner drop
            if (event.dataTransfer.items) {
                // DataTransferItemList supports folders
                editor.loader.loadItemList(event.dataTransfer.items);
            }
            else {
                editor.loader.loadFiles(event.dataTransfer.files);
            }
        });
        function onWindowResize() {
            editor.signals.windowResize.dispatch();
        }
        window.addEventListener('resize', onWindowResize);
        onWindowResize();
        //
        let isLoadingFromHash = false;
        const { hash } = window.location;
        if (hash.slice(1, 6) === 'file=') {
            const file = hash.slice(6);
            if (confirm('Any unsaved data will be lost. Are you sure?')) {
                const loader = new THREE.FileLoader();
                loader.crossOrigin = '';
                loader.load(file, (text) => {
                    editor.clear();
                    if (lodash_1.default.isString(text)) {
                        editor.fromJSON(JSON.parse(text));
                    }
                });
                isLoadingFromHash = true;
            }
        }
        // ServiceWorker
        if ('serviceWorker' in navigator) {
            try {
                navigator.serviceWorker.register('sw.js');
            }
            catch (error) {
                console.log(error);
            }
        }
    }, [hostDivRef]);
    return react_1.default.createElement(StyledHost, { ref: hostDivRef });
};
exports.ThreeJsEditor = ThreeJsEditor;
const StyledHost = styled_1.default.div `
  width: 100%;
  height: 100%;
  position: relative;

  :root {
    color-scheme: light dark;
  }

  hr {
    border: 0;
    border-top: 1px solid #ccc;
  }

  button {
    position: relative;
  }

  input {
    vertical-align: middle;
  }

  input[type='color']::-webkit-color-swatch-wrapper {
    padding: 0;
  }
  input[type='color']::-webkit-color-swatch {
    border: none;
  }

  textarea {
    tab-size: 4;
    white-space: pre;
    word-wrap: normal;
  }

  textarea.success {
    border-color: #8b8 !important;
  }

  textarea.fail {
    border-color: #f00 !important;
    background-color: rgba(255, 0, 0, 0.05);
  }

  textarea,
  input {
    outline: none;
  } /* osx */

  .Panel {
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;

    /* No support for these yet */
    -o-user-select: none;
    user-select: none;
  }

  .TabbedPanel {
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;

    /* No support for these yet */
    -o-user-select: none;
    user-select: none;
    position: relative;
    display: block;
    width: 100%;
  }

  .TabbedPanel .Tabs {
    position: relative;
    display: block;
    width: 100%;
    min-width: 300px;
  }

  .TabbedPanel .Tabs .Tab {
    padding: 10px;
  }

  .TabbedPanel .Panels {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    min-width: 300px;
  }

  /* Listbox */
  .Listbox {
    color: #444;
    background-color: #fff;
    padding: 0;
    width: 100%;
    min-height: 140px;
    font-size: 12px;
    cursor: default;
    overflow: auto;
  }

  .Listbox .ListboxItem {
    padding: 6px;
    color: #666;
    white-space: nowrap;
  }

  .Listbox .ListboxItem.active {
    background-color: rgba(0, 0, 0, 0.04);
  }

  /* CodeMirror */

  .CodeMirror {
    position: absolute !important;
    top: 37px;
    width: 100% !important;
    height: calc(100% - 37px) !important;
  }

  .CodeMirror .errorLine {
    background: rgba(255, 0, 0, 0.25);
  }

  .CodeMirror .esprima-error {
    color: #f00;
    text-align: right;
    padding: 0 20px;
  }

  /* outliner */

  #outliner .opener {
    display: inline-block;
    width: 14px;
    height: 14px;
    margin: 0px 4px;
    vertical-align: top;
    text-align: center;
  }

  #outliner .opener.open:after {
    content: '−';
  }

  #outliner .opener.closed:after {
    content: '+';
  }

  #outliner .option {
    border: 1px solid transparent;
  }

  #outliner .option.drag {
    border: 1px dashed #999;
  }

  #outliner .option.dragTop {
    border-top: 1px dashed #999;
  }

  #outliner .option.dragBottom {
    border-bottom: 1px dashed #999;
  }

  #outliner .type {
    display: inline-block;
    width: 14px;
    height: 14px;
    color: #ddd;
    text-align: center;
  }

  #outliner .type:after {
    content: '●';
  }

  /* */

  #outliner .Scene {
    color: #8888dd;
  }

  #outliner .Camera {
    color: #dd8888;
  }

  #outliner .Light {
    color: #dddd88;
  }

  /* */

  #outliner .Object3D {
    color: #aaaaee;
  }

  #outliner .Mesh {
    color: #8888ee;
  }

  #outliner .Line {
    color: #88ee88;
  }

  #outliner .LineSegments {
    color: #88ee88;
  }

  #outliner .Points {
    color: #ee8888;
  }

  /* */

  #outliner .Geometry {
    color: #aaeeaa;
  }

  #outliner .Material {
    color: #eeaaee;
  }

  /* */

  #outliner .Script:after {
    content: '◎';
  }

  /*  */

  button {
    color: #555;
    background-color: #ddd;
    border: 0px;
    margin: 0px; /* GNOME Web */
    padding: 5px 8px;
    font-size: 12px;

    cursor: pointer;
    outline: none;
  }

  button:hover {
    background-color: #fff;
  }

  button.selected {
    background-color: #fff;
  }

  input,
  textarea {
    border: 1px solid transparent;
    color: #444;
  }

  input.Number {
    color: #08f !important;
    font-size: 12px;
    border: 0px;
    padding: 2px;
  }

  select {
    color: #666;
    background-color: #ddd;
    border: 0px;

    cursor: pointer;
    outline: none;
  }

  select:hover {
    background-color: #fff;
  }

  /* UI */

  #resizer {
    position: absolute;
    top: 32px;
    right: 295px;
    width: 5px;
    bottom: 0px;
    /* background-color: rgba(255,0,0,0.5); */
    cursor: col-resize;
  }

  #viewport {
    position: absolute;
    top: 32px;
    left: 0;
    right: 300px;
    bottom: 0;
  }

  #viewport #info {
    text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.25);
    pointer-events: none;
  }

  #script {
    position: absolute;
    top: 32px;
    left: 0;
    right: 300px;
    bottom: 0;
    opacity: 0.9;
  }

  #player {
    position: absolute;
    top: 32px;
    left: 0;
    right: 300px;
    bottom: 0;
  }

  #menubar {
    position: absolute;
    width: 100%;
    height: 32px;
    background: #eee;
    padding: 0;
    margin: 0;
    right: 0;
    top: 0;
  }

  #menubar .menu {
    float: left;
    cursor: pointer;
    padding-right: 8px;
  }

  #menubar .menu.right {
    float: right;
    cursor: auto;
    padding-right: 0;
    text-align: right;
  }

  #menubar .menu .title {
    display: inline-block;
    color: #888;
    margin: 0;
    padding: 8px;
    line-height: 16px;
  }

  #menubar .menu .options {
    position: fixed;
    display: none;
    padding: 5px 0;
    background: #eee;
    width: 150px;
    max-height: calc(100% - 80px);
    overflow: auto;
  }

  #menubar .menu:hover .options {
    display: block;
  }

  #menubar .menu .options hr {
    border-color: #ddd;
  }

  #menubar .menu .options .option {
    color: #666;
    background-color: transparent;
    padding: 5px 10px;
    margin: 0 !important;
  }

  #menubar .menu .options .option:hover {
    color: #fff;
    background-color: #08f;
  }

  #menubar .menu .options .option:active {
    color: #666;
    background: transparent;
  }

  #menubar .menu .options .inactive {
    color: #bbb;
    background-color: transparent;
    padding: 5px 10px;
    margin: 0 !important;
  }

  #sidebar {
    position: absolute;
    right: 0;
    top: 32px;
    bottom: 0;
    width: 300px;
    background: #eee;
    overflow: auto;
  }

  #sidebar .Panel {
    color: #888;
    padding: 10px;
    border-top: 1px solid #ccc;
  }

  #sidebar .Panel.collapsed {
    margin-bottom: 0;
  }

  #sidebar .Row {
    display: flex;
    align-items: center;
    min-height: 24px;
    margin-bottom: 10px;
  }

  #tabs {
    background-color: #ddd;
    border-top: 1px solid #ccc;
  }

  #tabs span {
    color: #aaa;
    border-right: 1px solid #ccc;
    padding: 10px;
  }

  #tabs span.selected {
    color: #888;
    background-color: #eee;
  }

  #toolbar {
    position: absolute;
    left: 10px;
    top: 42px;
    width: 32px;
    background: #eee;
    text-align: center;
  }

  #toolbar button,
  #toolbar input {
    height: 32px;
  }

  #toolbar button img {
    width: 16px;
    opacity: 0.5;
  }

  .Outliner {
    color: #444;
    background-color: #fff;
    padding: 0;
    width: 100%;
    height: 140px;
    font-size: 12px;
    cursor: default;
    overflow: auto;
    resize: vertical;
    outline: none !important;
  }

  .Outliner .option {
    padding: 4px;
    color: #666;
    white-space: nowrap;
  }

  .Outliner .option:hover {
    background-color: rgba(0, 0, 0, 0.02);
  }

  .Outliner .option.active {
    background-color: rgba(0, 0, 0, 0.04);
  }

  .TabbedPanel .Tabs {
    background-color: #ddd;
    border-top: 1px solid #ccc;
  }

  .TabbedPanel .Tab {
    color: #aaa;
    border-right: 1px solid #ccc;
  }

  .TabbedPanel .Tab.selected {
    color: #888;
    background-color: #eee;
  }

  .Listbox {
    color: #444;
    background-color: #fff;
  }

  .Panel {
    color: #888;
  }

  /* */

  @media all and (max-width: 600px) {
    #resizer {
      display: none;
    }

    #menubar .menu .options {
      max-height: calc(100% - 372px);
    }

    #menubar .menu.right {
      display: none;
    }

    #viewport {
      left: 0;
      right: 0;
      top: 32px;
      height: calc(100% - 352px);
    }

    #script {
      left: 0;
      right: 0;
      top: 32px;
      height: calc(100% - 352px);
    }

    #player {
      left: 0;
      right: 0;
      top: 32px;
      height: calc(100% - 352px);
    }

    #sidebar {
      left: 0;
      width: 100%;
      top: calc(100% - 320px);
      bottom: 0;
    }
  }

  /* DARK MODE */

  @media (prefers-color-scheme: dark) {
    button {
      color: #aaa;
      background-color: #222;
    }

    button:hover {
      color: #ccc;
      background-color: #444;
    }

    button.selected {
      color: #fff;
      background-color: #08f;
    }

    input,
    textarea {
      background-color: #222;
      border: 1px solid transparent;
      color: #888;
    }

    select {
      color: #aaa;
      background-color: #222;
    }

    select:hover {
      color: #ccc;
      background-color: #444;
    }

    /* UI */

    #menubar {
      background: #111;
    }

    #menubar .menu .options {
      background: #111;
    }

    #menubar .menu .options hr {
      border-color: #222;
    }

    #menubar .menu .options .option {
      color: #888;
    }

    #menubar .menu .options .inactive {
      color: #444;
    }

    #sidebar {
      background-color: #111;
    }

    #sidebar .Panel {
      border-top: 1px solid #222;
    }

    #sidebar .Panel.Material canvas {
      border: solid 1px #5a5a5a;
    }

    #tabs {
      background-color: #1b1b1b;
      border-top: 1px solid #222;
    }

    #tabs span {
      color: #555;
      border-right: 1px solid #222;
    }

    #tabs span.selected {
      background-color: #111;
    }

    #toolbar {
      background-color: #111;
    }

    #toolbar img {
      filter: invert(1);
    }

    .Outliner {
      color: #888;
      background: #222;
    }

    .Outliner .option:hover {
      background-color: rgba(21, 60, 94, 0.5);
    }

    .Outliner .option.active {
      background-color: rgba(21, 60, 94, 1);
    }

    .TabbedPanel .Tabs {
      background-color: #1b1b1b;
      border-top: 1px solid #222;
    }

    .TabbedPanel .Tab {
      color: #555;
      border-right: 1px solid #222;
    }

    .TabbedPanel .Tab.selected {
      color: #888;
      background-color: #111;
    }

    .Listbox {
      color: #888;
      background: #222;
    }

    .Listbox .ListboxItem:hover {
      background-color: rgba(21, 60, 94, 0.5);
    }

    .Listbox .ListboxItem.active {
      background-color: rgba(21, 60, 94, 1);
    }
  }
`;
