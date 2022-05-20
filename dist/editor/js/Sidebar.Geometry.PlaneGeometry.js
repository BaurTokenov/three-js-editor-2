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
exports.GeometryParametersPanel = void 0;
const THREE = __importStar(require("three"));
const ui_1 = require("./libs/ui");
const SetGeometryCommand_1 = require("./commands/SetGeometryCommand");
function GeometryParametersPanel(editor, object) {
    const strings = editor.strings;
    const container = new ui_1.UIDiv();
    const geometry = object.geometry;
    const parameters = geometry.parameters;
    // width
    const widthRow = new ui_1.UIRow();
    const width = new ui_1.UINumber(parameters.width).onChange(update);
    widthRow.add(new ui_1.UIText(strings.getKey('sidebar/geometry/plane_geometry/width')).setWidth('90px'));
    widthRow.add(width);
    container.add(widthRow);
    // height
    const heightRow = new ui_1.UIRow();
    const height = new ui_1.UINumber(parameters.height).onChange(update);
    heightRow.add(new ui_1.UIText(strings.getKey('sidebar/geometry/plane_geometry/height')).setWidth('90px'));
    heightRow.add(height);
    container.add(heightRow);
    // widthSegments
    const widthSegmentsRow = new ui_1.UIRow();
    const widthSegments = new ui_1.UIInteger(parameters.widthSegments).setRange(1, Infinity).onChange(update);
    widthSegmentsRow.add(new ui_1.UIText(strings.getKey('sidebar/geometry/plane_geometry/widthsegments')).setWidth('90px'));
    widthSegmentsRow.add(widthSegments);
    container.add(widthSegmentsRow);
    // heightSegments
    const heightSegmentsRow = new ui_1.UIRow();
    const heightSegments = new ui_1.UIInteger(parameters.heightSegments).setRange(1, Infinity).onChange(update);
    heightSegmentsRow.add(new ui_1.UIText(strings.getKey('sidebar/geometry/plane_geometry/heightsegments')).setWidth('90px'));
    heightSegmentsRow.add(heightSegments);
    container.add(heightSegmentsRow);
    //
    function update() {
        editor.execute(new SetGeometryCommand_1.SetGeometryCommand(editor, object, new THREE.PlaneGeometry(width.getValue(), height.getValue(), widthSegments.getValue(), heightSegments.getValue())));
    }
    return container;
}
exports.GeometryParametersPanel = GeometryParametersPanel;
