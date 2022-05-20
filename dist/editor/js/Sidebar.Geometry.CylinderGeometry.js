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
    // radiusTop
    const radiusTopRow = new ui_1.UIRow();
    const radiusTop = new ui_1.UINumber(parameters.radiusTop).onChange(update);
    radiusTopRow.add(new ui_1.UIText(strings.getKey('sidebar/geometry/cylinder_geometry/radiustop')).setWidth('90px'));
    radiusTopRow.add(radiusTop);
    container.add(radiusTopRow);
    // radiusBottom
    const radiusBottomRow = new ui_1.UIRow();
    const radiusBottom = new ui_1.UINumber(parameters.radiusBottom).onChange(update);
    radiusBottomRow.add(new ui_1.UIText(strings.getKey('sidebar/geometry/cylinder_geometry/radiusbottom')).setWidth('90px'));
    radiusBottomRow.add(radiusBottom);
    container.add(radiusBottomRow);
    // height
    const heightRow = new ui_1.UIRow();
    const height = new ui_1.UINumber(parameters.height).onChange(update);
    heightRow.add(new ui_1.UIText(strings.getKey('sidebar/geometry/cylinder_geometry/height')).setWidth('90px'));
    heightRow.add(height);
    container.add(heightRow);
    // radialSegments
    const radialSegmentsRow = new ui_1.UIRow();
    const radialSegments = new ui_1.UIInteger(parameters.radialSegments).setRange(1, Infinity).onChange(update);
    radialSegmentsRow.add(new ui_1.UIText(strings.getKey('sidebar/geometry/cylinder_geometry/radialsegments')).setWidth('90px'));
    radialSegmentsRow.add(radialSegments);
    container.add(radialSegmentsRow);
    // heightSegments
    const heightSegmentsRow = new ui_1.UIRow();
    const heightSegments = new ui_1.UIInteger(parameters.heightSegments).setRange(1, Infinity).onChange(update);
    heightSegmentsRow.add(new ui_1.UIText(strings.getKey('sidebar/geometry/cylinder_geometry/heightsegments')).setWidth('90px'));
    heightSegmentsRow.add(heightSegments);
    container.add(heightSegmentsRow);
    // openEnded
    const openEndedRow = new ui_1.UIRow();
    const openEnded = new ui_1.UICheckbox(parameters.openEnded).onChange(update);
    openEndedRow.add(new ui_1.UIText(strings.getKey('sidebar/geometry/cylinder_geometry/openended')).setWidth('90px'));
    openEndedRow.add(openEnded);
    container.add(openEndedRow);
    //
    function update() {
        editor.execute(new SetGeometryCommand_1.SetGeometryCommand(editor, object, new THREE.CylinderGeometry(radiusTop.getValue(), radiusBottom.getValue(), height.getValue(), radialSegments.getValue(), heightSegments.getValue(), openEnded.getValue())));
    }
    return container;
}
exports.GeometryParametersPanel = GeometryParametersPanel;
