"use strict";
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
exports.NodeEditor = exports.ClassLib = exports.NodeList = void 0;
const flow_module_1 = require("../libs/flow.module");
const BasicMaterialEditor_1 = require("./materials/BasicMaterialEditor");
const StandardMaterialEditor_1 = require("./materials/StandardMaterialEditor");
const PointsMaterialEditor_1 = require("./materials/PointsMaterialEditor");
const OperatorEditor_1 = require("./math/OperatorEditor");
const NormalizeEditor_1 = require("./math/NormalizeEditor");
const InvertEditor_1 = require("./math/InvertEditor");
const LimiterEditor_1 = require("./math/LimiterEditor");
const DotEditor_1 = require("./math/DotEditor");
const PowerEditor_1 = require("./math/PowerEditor");
const AngleEditor_1 = require("./math/AngleEditor");
const TrigonometryEditor_1 = require("./math/TrigonometryEditor");
const FloatEditor_1 = require("./inputs/FloatEditor");
const Vector2Editor_1 = require("./inputs/Vector2Editor");
const Vector3Editor_1 = require("./inputs/Vector3Editor");
const Vector4Editor_1 = require("./inputs/Vector4Editor");
const SliderEditor_1 = require("./inputs/SliderEditor");
const ColorEditor_1 = require("./inputs/ColorEditor");
const TextureEditor_1 = require("./inputs/TextureEditor");
const BlendEditor_1 = require("./display/BlendEditor");
const NormalMapEditor_1 = require("./display/NormalMapEditor");
const UVEditor_1 = require("./accessors/UVEditor");
const MatcapUVEditor_1 = require("./accessors/MatcapUVEditor");
const PositionEditor_1 = require("./accessors/PositionEditor");
const NormalEditor_1 = require("./accessors/NormalEditor");
const PreviewEditor_1 = require("./utils/PreviewEditor");
const TimerEditor_1 = require("./utils/TimerEditor");
const OscillatorEditor_1 = require("./utils/OscillatorEditor");
const SplitEditor_1 = require("./utils/SplitEditor");
const JoinEditor_1 = require("./utils/JoinEditor");
const CheckerEditor_1 = require("./procedural/CheckerEditor");
const PointsEditor_1 = require("./scene/PointsEditor");
const MeshEditor_1 = require("./scene/MeshEditor");
const FileEditor_1 = require("./core/FileEditor");
const FileURLEditor_1 = require("./core/FileURLEditor");
const three_1 = require("three");
flow_module_1.Styles.icons.unlink = 'ti ti-unlink';
exports.NodeList = [
    {
        name: 'Inputs',
        icon: 'forms',
        children: [
            {
                name: 'Slider',
                icon: 'adjustments-horizontal',
                nodeClass: SliderEditor_1.SliderEditor,
            },
            {
                name: 'Float',
                icon: 'box-multiple-1',
                nodeClass: FloatEditor_1.FloatEditor,
            },
            {
                name: 'Vector 2',
                icon: 'box-multiple-2',
                nodeClass: Vector2Editor_1.Vector2Editor,
            },
            {
                name: 'Vector 3',
                icon: 'box-multiple-3',
                nodeClass: Vector3Editor_1.Vector3Editor,
            },
            {
                name: 'Vector 4',
                icon: 'box-multiple-4',
                nodeClass: Vector4Editor_1.Vector4Editor,
            },
            {
                name: 'Color',
                icon: 'palette',
                nodeClass: ColorEditor_1.ColorEditor,
            },
            {
                name: 'Texture',
                icon: 'photo',
                nodeClass: TextureEditor_1.TextureEditor,
            },
            {
                name: 'File URL',
                icon: 'cloud-download',
                nodeClass: FileURLEditor_1.FileURLEditor,
            },
        ],
    },
    {
        name: 'Accessors',
        icon: 'vector-triangle',
        children: [
            {
                name: 'UV',
                icon: 'details',
                nodeClass: UVEditor_1.UVEditor,
            },
            {
                name: 'Position',
                icon: 'hierarchy',
                nodeClass: PositionEditor_1.PositionEditor,
            },
            {
                name: 'Normal',
                icon: 'fold-up',
                nodeClass: NormalEditor_1.NormalEditor,
            },
            {
                name: 'Matcap UV',
                icon: 'circle',
                nodeClass: MatcapUVEditor_1.MatcapUVEditor,
            },
        ],
    },
    {
        name: 'Display',
        icon: 'brightness',
        children: [
            {
                name: 'Blend',
                icon: 'layers-subtract',
                nodeClass: BlendEditor_1.BlendEditor,
            },
            {
                name: 'Normal Map',
                icon: 'chart-line',
                nodeClass: NormalMapEditor_1.NormalMapEditor,
            },
        ],
    },
    {
        name: 'Math',
        icon: 'calculator',
        children: [
            {
                name: 'Operator',
                icon: 'math-symbols',
                nodeClass: OperatorEditor_1.OperatorEditor,
            },
            {
                name: 'Invert',
                icon: 'flip-vertical',
                tip: 'Negate',
                nodeClass: InvertEditor_1.InvertEditor,
            },
            {
                name: 'Limiter',
                icon: 'arrow-bar-to-up',
                tip: 'Min / Max',
                nodeClass: LimiterEditor_1.LimiterEditor,
            },
            {
                name: 'Dot Product',
                icon: 'arrows-up-left',
                nodeClass: DotEditor_1.DotEditor,
            },
            {
                name: 'Power',
                icon: 'arrow-up-right',
                nodeClass: PowerEditor_1.PowerEditor,
            },
            {
                name: 'Trigonometry',
                icon: 'wave-sine',
                tip: 'Sin / Cos / Tan / ...',
                nodeClass: TrigonometryEditor_1.TrigonometryEditor,
            },
            {
                name: 'Angle',
                icon: 'angle',
                tip: 'Degress / Radians',
                nodeClass: AngleEditor_1.AngleEditor,
            },
            {
                name: 'Normalize',
                icon: 'fold',
                nodeClass: NormalizeEditor_1.NormalizeEditor,
            },
        ],
    },
    {
        name: 'Procedural',
        icon: 'infinity',
        children: [
            {
                name: 'Checker',
                icon: 'border-outer',
                nodeClass: CheckerEditor_1.CheckerEditor,
            },
        ],
    },
    {
        name: 'Utils',
        icon: 'apps',
        children: [
            {
                name: 'Preview',
                icon: 'square-check',
                nodeClass: PreviewEditor_1.PreviewEditor,
            },
            {
                name: 'Timer',
                icon: 'clock',
                nodeClass: TimerEditor_1.TimerEditor,
            },
            {
                name: 'Oscillator',
                icon: 'wave-sine',
                nodeClass: OscillatorEditor_1.OscillatorEditor,
            },
            {
                name: 'Split',
                icon: 'arrows-split-2',
                nodeClass: SplitEditor_1.SplitEditor,
            },
            {
                name: 'Join',
                icon: 'arrows-join-2',
                nodeClass: JoinEditor_1.JoinEditor,
            },
        ],
    },
    /*{
          name: 'Scene',
          icon: '3d-cube-sphere',
          children: [
              {
                  name: 'Mesh',
                  icon: '3d-cube-sphere',
                  nodeClass: MeshEditor
              }
          ]
      },*/
    {
        name: 'Material',
        icon: 'circles',
        children: [
            {
                name: 'Basic Material',
                icon: 'circle',
                nodeClass: BasicMaterialEditor_1.BasicMaterialEditor,
            },
            {
                name: 'Standard Material',
                icon: 'circle',
                nodeClass: StandardMaterialEditor_1.StandardMaterialEditor,
            },
            {
                name: 'Points Material',
                icon: 'circle-dotted',
                nodeClass: PointsMaterialEditor_1.PointsMaterialEditor,
            },
        ],
    },
];
exports.ClassLib = {
    BasicMaterialEditor: BasicMaterialEditor_1.BasicMaterialEditor,
    StandardMaterialEditor: StandardMaterialEditor_1.StandardMaterialEditor,
    PointsMaterialEditor: PointsMaterialEditor_1.PointsMaterialEditor,
    PointsEditor: PointsEditor_1.PointsEditor,
    MeshEditor: MeshEditor_1.MeshEditor,
    OperatorEditor: OperatorEditor_1.OperatorEditor,
    NormalizeEditor: NormalizeEditor_1.NormalizeEditor,
    InvertEditor: InvertEditor_1.InvertEditor,
    LimiterEditor: LimiterEditor_1.LimiterEditor,
    DotEditor: DotEditor_1.DotEditor,
    PowerEditor: PowerEditor_1.PowerEditor,
    AngleEditor: AngleEditor_1.AngleEditor,
    TrigonometryEditor: TrigonometryEditor_1.TrigonometryEditor,
    FloatEditor: FloatEditor_1.FloatEditor,
    Vector2Editor: Vector2Editor_1.Vector2Editor,
    Vector3Editor: Vector3Editor_1.Vector3Editor,
    Vector4Editor: Vector4Editor_1.Vector4Editor,
    SliderEditor: SliderEditor_1.SliderEditor,
    ColorEditor: ColorEditor_1.ColorEditor,
    TextureEditor: TextureEditor_1.TextureEditor,
    BlendEditor: BlendEditor_1.BlendEditor,
    NormalMapEditor: NormalMapEditor_1.NormalMapEditor,
    UVEditor: UVEditor_1.UVEditor,
    MatcapUVEditor: MatcapUVEditor_1.MatcapUVEditor,
    PositionEditor: PositionEditor_1.PositionEditor,
    NormalEditor: NormalEditor_1.NormalEditor,
    TimerEditor: TimerEditor_1.TimerEditor,
    OscillatorEditor: OscillatorEditor_1.OscillatorEditor,
    SplitEditor: SplitEditor_1.SplitEditor,
    JoinEditor: JoinEditor_1.JoinEditor,
    CheckerEditor: CheckerEditor_1.CheckerEditor,
    FileURLEditor: FileURLEditor_1.FileURLEditor,
};
class NodeEditor extends three_1.EventDispatcher {
    constructor(scene = null) {
        super();
        const domElement = document.createElement('flow');
        const canvas = new flow_module_1.Canvas();
        domElement.append(canvas.dom);
        this.scene = scene;
        this.canvas = canvas;
        this.domElement = domElement;
        this.nodesContext = null;
        this.examplesContext = null;
        this._initUpload();
        this._initTips();
        this._initMenu();
        this._initSearch();
        this._initNodesContext();
        this._initExamplesContext();
    }
    centralizeNode(node) {
        const canvas = this.canvas;
        const canvasRect = canvas.rect;
        const nodeRect = node.dom.getBoundingClientRect();
        const defaultOffsetX = nodeRect.width;
        const defaultOffsetY = nodeRect.height;
        node.setPosition(canvas.relativeX + canvasRect.width / 2 - defaultOffsetX, canvas.relativeY + canvasRect.height / 2 - defaultOffsetY);
    }
    add(node) {
        const onRemove = () => {
            node.removeEventListener('remove', onRemove);
            node.setEditor(null);
        };
        node.setEditor(this);
        node.addEventListener('remove', onRemove);
        this.canvas.add(node);
        this.dispatchEvent({ type: 'add', node });
        return this;
    }
    get nodes() {
        return this.canvas.nodes;
    }
    newProject() {
        this.canvas.clear();
        this.dispatchEvent({ type: 'new' });
    }
    loadJSON(json) {
        const canvas = this.canvas;
        canvas.clear();
        canvas.deserialize(json);
        for (const node of canvas.nodes) {
            this.add(node);
        }
        this.dispatchEvent({ type: 'load' });
    }
    _initUpload() {
        const canvas = this.canvas;
        canvas.onDrop(() => {
            for (const item of canvas.droppedItems) {
                if (/^image\//.test(item.type) === true) {
                    const { relativeClientX, relativeClientY } = canvas;
                    const file = item.getAsFile();
                    const fileEditor = new FileEditor_1.FileEditor(file);
                    fileEditor.setPosition(relativeClientX - fileEditor.getWidth() / 2, relativeClientY - 20);
                    this.add(fileEditor);
                }
            }
        });
    }
    _initTips() {
        this.tips = new flow_module_1.Tips();
        this.domElement.append(this.tips.dom);
    }
    _initMenu() {
        const menu = new flow_module_1.CircleMenu();
        const menuButton = new flow_module_1.ButtonInput().setIcon('ti ti-apps').setToolTip('Add');
        const examplesButton = new flow_module_1.ButtonInput().setIcon('ti ti-file-symlink').setToolTip('Examples');
        const newButton = new flow_module_1.ButtonInput().setIcon('ti ti-file').setToolTip('New');
        const openButton = new flow_module_1.ButtonInput().setIcon('ti ti-upload').setToolTip('Open');
        const saveButton = new flow_module_1.ButtonInput().setIcon('ti ti-download').setToolTip('Save');
        menuButton.onClick(() => this.nodesContext.open());
        examplesButton.onClick(() => this.examplesContext.open());
        newButton.onClick(() => {
            if (confirm('Are you sure?') === true) {
                this.newProject();
            }
        });
        openButton.onClick(() => {
            const input = document.createElement('input');
            input.type = 'file';
            input.onchange = (e) => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.readAsText(file, 'UTF-8');
                reader.onload = (readerEvent) => {
                    const loader = new flow_module_1.Loader(flow_module_1.Loader.OBJECTS);
                    const json = loader.parse(JSON.parse(readerEvent.target.result), exports.ClassLib);
                    this.loadJSON(json);
                };
            };
            input.click();
        });
        saveButton.onClick(() => {
            const json = JSON.stringify(this.canvas.toJSON());
            const a = document.createElement('a');
            const file = new Blob([json], { type: 'text/plain' });
            a.href = URL.createObjectURL(file);
            a.download = 'node_editor.json';
            a.click();
        });
        menu.add(examplesButton).add(menuButton).add(newButton).add(openButton).add(saveButton);
        this.domElement.append(menu.dom);
        this.menu = menu;
    }
    _initExamplesContext() {
        const context = new flow_module_1.ContextMenu();
        //**************//
        // MAIN
        //**************//
        const onClickExample = (button) => __awaiter(this, void 0, void 0, function* () {
            this.examplesContext.hide();
            const filename = button.getExtra();
            const loader = new flow_module_1.Loader(flow_module_1.Loader.OBJECTS);
            const json = yield loader.load(`./jsm/node-editor/examples/${filename}.json`, exports.ClassLib);
            this.loadJSON(json);
        });
        const addExample = (context, name, filename = null) => {
            filename = filename || name.replaceAll(' ', '-').toLowerCase();
            context.add(new flow_module_1.ButtonInput(name).setIcon('ti ti-file-symlink').onClick(onClickExample).setExtra(filename));
        };
        //**************//
        // EXAMPLES
        //**************//
        const basicContext = new flow_module_1.ContextMenu();
        const advancedContext = new flow_module_1.ContextMenu();
        addExample(basicContext, 'Animate UV');
        addExample(basicContext, 'Fake top light');
        addExample(basicContext, 'Oscillator color');
        addExample(basicContext, 'Matcap');
        addExample(advancedContext, 'Rim');
        //**************//
        // MAIN
        //**************//
        context.add(new flow_module_1.ButtonInput('Basic'), basicContext);
        context.add(new flow_module_1.ButtonInput('Advanced'), advancedContext);
        this.examplesContext = context;
    }
    _initSearch() {
        const traverseNodeEditors = (item) => {
            if (item.nodeClass) {
                const button = new flow_module_1.ButtonInput(item.name);
                button.setIcon(`ti ti-${item.icon}`);
                button.addEventListener('complete', () => {
                    const node = new item.nodeClass();
                    this.add(node);
                    this.centralizeNode(node);
                });
                search.add(button);
            }
            if (item.children) {
                for (const subItem of item.children) {
                    traverseNodeEditors(subItem);
                }
            }
        };
        const search = new flow_module_1.Search();
        search.forceAutoComplete = true;
        search.onFilter(() => {
            search.clear();
            for (const item of exports.NodeList) {
                traverseNodeEditors(item);
            }
            const object3d = this.scene;
            if (object3d !== null) {
                object3d.traverse((obj3d) => {
                    if (obj3d.isMesh === true || obj3d.isPoints === true) {
                        let prefix = null;
                        let icon = null;
                        let editorClass = null;
                        if (obj3d.isMesh === true) {
                            prefix = 'Mesh';
                            icon = 'ti ti-3d-cube-sphere';
                            editorClass = MeshEditor_1.MeshEditor;
                        }
                        else if (obj3d.isPoints === true) {
                            prefix = 'Points';
                            icon = 'ti ti-border-none';
                            editorClass = PointsEditor_1.PointsEditor;
                        }
                        const button = new flow_module_1.ButtonInput(`${prefix} - ${obj3d.name}`);
                        button.setIcon(icon);
                        button.addEventListener('complete', () => {
                            for (const node of this.canvas.nodes) {
                                if (node.value === obj3d) {
                                    // prevent duplicated node
                                    this.canvas.select(node);
                                    return;
                                }
                            }
                            const node = new editorClass(obj3d);
                            this.add(node);
                            this.centralizeNode(node);
                        });
                        search.add(button);
                    }
                });
            }
        });
        search.onSubmit(() => {
            if (search.currentFiltered !== null) {
                search.currentFiltered.button.dispatchEvent(new Event('complete'));
            }
        });
        this.domElement.append(search.dom);
    }
    _initNodesContext() {
        const context = new flow_module_1.ContextMenu(this.domElement);
        let isContext = false;
        const contextPosition = {};
        const add = (node) => {
            if (isContext) {
                node.setPosition(Math.round(contextPosition.x), Math.round(contextPosition.y));
            }
            else {
                this.centralizeNode(node);
            }
            context.hide();
            this.add(node);
            this.canvas.select(node);
            isContext = false;
        };
        context.onContext(() => {
            isContext = true;
            const { relativeClientX, relativeClientY } = this.canvas;
            contextPosition.x = Math.round(relativeClientX);
            contextPosition.y = Math.round(relativeClientY);
        });
        //**************//
        // INPUTS
        //**************//
        const createButtonMenu = (item) => {
            const button = new flow_module_1.ButtonInput(item.name);
            button.setIcon(`ti ti-${item.icon}`);
            let context = null;
            if (item.nodeClass) {
                button.onClick(() => add(new item.nodeClass()));
            }
            if (item.tip) {
                button.setToolTip(item.tip);
            }
            if (item.children) {
                context = new flow_module_1.ContextMenu();
                for (const subItem of item.children) {
                    const buttonMenu = createButtonMenu(subItem);
                    context.add(buttonMenu.button, buttonMenu.context);
                }
            }
            return { button, context };
        };
        for (const item of exports.NodeList) {
            const buttonMenu = createButtonMenu(item);
            context.add(buttonMenu.button, buttonMenu.context);
        }
        this.nodesContext = context;
    }
}
exports.NodeEditor = NodeEditor;
