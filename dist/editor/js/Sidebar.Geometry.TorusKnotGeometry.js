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
    radiusRow.add(new ui_1.UIText(strings.getKey('sidebar/geometry/torusKnot_geometry/radius')).setWidth('90px'));
    radiusRow.add(radius);
    container.add(radiusRow);
    // tube
    const tubeRow = new ui_1.UIRow();
    const tube = new ui_1.UINumber(parameters.tube).onChange(update);
    tubeRow.add(new ui_1.UIText(strings.getKey('sidebar/geometry/torusKnot_geometry/tube')).setWidth('90px'));
    tubeRow.add(tube);
    container.add(tubeRow);
    // tubularSegments
    const tubularSegmentsRow = new ui_1.UIRow();
    const tubularSegments = new ui_1.UIInteger(parameters.tubularSegments).setRange(1, Infinity).onChange(update);
    tubularSegmentsRow.add(new ui_1.UIText(strings.getKey('sidebar/geometry/torusKnot_geometry/tubularsegments')).setWidth('90px'));
    tubularSegmentsRow.add(tubularSegments);
    container.add(tubularSegmentsRow);
    // radialSegments
    const radialSegmentsRow = new ui_1.UIRow();
    const radialSegments = new ui_1.UIInteger(parameters.radialSegments).setRange(1, Infinity).onChange(update);
    radialSegmentsRow.add(new ui_1.UIText(strings.getKey('sidebar/geometry/torusKnot_geometry/radialsegments')).setWidth('90px'));
    radialSegmentsRow.add(radialSegments);
    container.add(radialSegmentsRow);
    // p
    const pRow = new ui_1.UIRow();
    const p = new ui_1.UINumber(parameters.p).onChange(update);
    pRow.add(new ui_1.UIText(strings.getKey('sidebar/geometry/torusKnot_geometry/p')).setWidth('90px'));
    pRow.add(p);
    container.add(pRow);
    // q
    const qRow = new ui_1.UIRow();
    const q = new ui_1.UINumber(parameters.q).onChange(update);
    qRow.add(new ui_1.UIText(strings.getKey('sidebar/geometry/torusKnot_geometry/q')).setWidth('90px'));
    qRow.add(q);
    container.add(qRow);
    //
    function update() {
        editor.execute(new SetGeometryCommand_1.SetGeometryCommand(editor, object, new THREE.TorusKnotGeometry(radius.getValue(), tube.getValue(), tubularSegments.getValue(), radialSegments.getValue(), p.getValue(), q.getValue())));
    }
    return container;
}
exports.GeometryParametersPanel = GeometryParametersPanel;
