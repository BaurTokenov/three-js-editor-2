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
    // radius
    const radiusRow = new ui_1.UIRow();
    const radius = new ui_1.UINumber(parameters.radius).onChange(update);
    radiusRow.add(new ui_1.UIText(strings.getKey('sidebar/geometry/torus_geometry/radius')).setWidth('90px'));
    radiusRow.add(radius);
    container.add(radiusRow);
    // tube
    const tubeRow = new ui_1.UIRow();
    const tube = new ui_1.UINumber(parameters.tube).onChange(update);
    tubeRow.add(new ui_1.UIText(strings.getKey('sidebar/geometry/torus_geometry/tube')).setWidth('90px'));
    tubeRow.add(tube);
    container.add(tubeRow);
    // radialSegments
    const radialSegmentsRow = new ui_1.UIRow();
    const radialSegments = new ui_1.UIInteger(parameters.radialSegments).setRange(1, Infinity).onChange(update);
    radialSegmentsRow.add(new ui_1.UIText(strings.getKey('sidebar/geometry/torus_geometry/radialsegments')).setWidth('90px'));
    radialSegmentsRow.add(radialSegments);
    container.add(radialSegmentsRow);
    // tubularSegments
    const tubularSegmentsRow = new ui_1.UIRow();
    const tubularSegments = new ui_1.UIInteger(parameters.tubularSegments).setRange(1, Infinity).onChange(update);
    tubularSegmentsRow.add(new ui_1.UIText(strings.getKey('sidebar/geometry/torus_geometry/tubularsegments')).setWidth('90px'));
    tubularSegmentsRow.add(tubularSegments);
    container.add(tubularSegmentsRow);
    // arc
    const arcRow = new ui_1.UIRow();
    const arc = new ui_1.UINumber(parameters.arc * THREE.MathUtils.RAD2DEG).setStep(10).onChange(update);
    arcRow.add(new ui_1.UIText(strings.getKey('sidebar/geometry/torus_geometry/arc')).setWidth('90px'));
    arcRow.add(arc);
    container.add(arcRow);
    //
    function update() {
        editor.execute(new SetGeometryCommand_1.SetGeometryCommand(editor, object, new THREE.TorusGeometry(radius.getValue(), tube.getValue(), radialSegments.getValue(), tubularSegments.getValue(), arc.getValue() * THREE.MathUtils.DEG2RAD)));
    }
    return container;
}
exports.GeometryParametersPanel = GeometryParametersPanel;
