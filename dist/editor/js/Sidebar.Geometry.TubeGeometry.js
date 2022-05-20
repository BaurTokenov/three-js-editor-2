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
const ui_three_1 = require("./libs/ui.three");
const SetGeometryCommand_1 = require("./commands/SetGeometryCommand");
function GeometryParametersPanel(editor, object) {
    const strings = editor.strings;
    const container = new ui_1.UIDiv();
    const geometry = object.geometry;
    const parameters = geometry.parameters;
    // points
    const pointsRow = new ui_1.UIRow();
    pointsRow.add(new ui_1.UIText(strings.getKey('sidebar/geometry/tube_geometry/path')).setWidth('90px'));
    const points = new ui_three_1.UIPoints3().setValue(parameters.path.points).onChange(update);
    pointsRow.add(points);
    container.add(pointsRow);
    // radius
    const radiusRow = new ui_1.UIRow();
    const radius = new ui_1.UINumber(parameters.radius).onChange(update);
    radiusRow.add(new ui_1.UIText(strings.getKey('sidebar/geometry/tube_geometry/radius')).setWidth('90px'));
    radiusRow.add(radius);
    container.add(radiusRow);
    // tubularSegments
    const tubularSegmentsRow = new ui_1.UIRow();
    const tubularSegments = new ui_1.UIInteger(parameters.tubularSegments).onChange(update);
    tubularSegmentsRow.add(new ui_1.UIText(strings.getKey('sidebar/geometry/tube_geometry/tubularsegments')).setWidth('90px'));
    tubularSegmentsRow.add(tubularSegments);
    container.add(tubularSegmentsRow);
    // radialSegments
    const radialSegmentsRow = new ui_1.UIRow();
    const radialSegments = new ui_1.UIInteger(parameters.radialSegments).onChange(update);
    radialSegmentsRow.add(new ui_1.UIText(strings.getKey('sidebar/geometry/tube_geometry/radialsegments')).setWidth('90px'));
    radialSegmentsRow.add(radialSegments);
    container.add(radialSegmentsRow);
    // closed
    const closedRow = new ui_1.UIRow();
    const closed = new ui_1.UICheckbox(parameters.closed).onChange(update);
    closedRow.add(new ui_1.UIText(strings.getKey('sidebar/geometry/tube_geometry/closed')).setWidth('90px'));
    closedRow.add(closed);
    container.add(closedRow);
    // curveType
    const curveTypeRow = new ui_1.UIRow();
    const curveType = new ui_1.UISelect()
        .setOptions({ centripetal: 'centripetal', chordal: 'chordal', catmullrom: 'catmullrom' })
        .setValue(parameters.path.curveType)
        .onChange(update);
    curveTypeRow.add(new ui_1.UIText(strings.getKey('sidebar/geometry/tube_geometry/curvetype')).setWidth('90px'), curveType);
    container.add(curveTypeRow);
    // tension
    const tensionRow = new ui_1.UIRow().setDisplay(curveType.getValue() == 'catmullrom' ? '' : 'none');
    const tension = new ui_1.UINumber(parameters.path.tension).setStep(0.01).onChange(update);
    tensionRow.add(new ui_1.UIText(strings.getKey('sidebar/geometry/tube_geometry/tension')).setWidth('90px'), tension);
    container.add(tensionRow);
    //
    function update() {
        tensionRow.setDisplay(curveType.getValue() == 'catmullrom' ? '' : 'none');
        editor.execute(new SetGeometryCommand_1.SetGeometryCommand(editor, object, new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.getValue(), closed.getValue(), curveType.getValue(), tension.getValue()), tubularSegments.getValue(), radius.getValue(), radialSegments.getValue(), closed.getValue())));
    }
    return container;
}
exports.GeometryParametersPanel = GeometryParametersPanel;
