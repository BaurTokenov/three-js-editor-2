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
    // segments
    const segmentsRow = new ui_1.UIRow();
    const segments = new ui_1.UIInteger(parameters.segments).onChange(update);
    segmentsRow.add(new ui_1.UIText(strings.getKey('sidebar/geometry/lathe_geometry/segments')).setWidth('90px'));
    segmentsRow.add(segments);
    container.add(segmentsRow);
    // phiStart
    const phiStartRow = new ui_1.UIRow();
    const phiStart = new ui_1.UINumber((parameters.phiStart * 180) / Math.PI).onChange(update);
    phiStartRow.add(new ui_1.UIText(strings.getKey('sidebar/geometry/lathe_geometry/phistart')).setWidth('90px'));
    phiStartRow.add(phiStart);
    container.add(phiStartRow);
    // phiLength
    const phiLengthRow = new ui_1.UIRow();
    const phiLength = new ui_1.UINumber((parameters.phiLength * 180) / Math.PI).onChange(update);
    phiLengthRow.add(new ui_1.UIText(strings.getKey('sidebar/geometry/lathe_geometry/philength')).setWidth('90px'));
    phiLengthRow.add(phiLength);
    container.add(phiLengthRow);
    // points
    const pointsRow = new ui_1.UIRow();
    pointsRow.add(new ui_1.UIText(strings.getKey('sidebar/geometry/lathe_geometry/points')).setWidth('90px'));
    const points = new ui_three_1.UIPoints2().setValue(parameters.points).onChange(update);
    pointsRow.add(points);
    container.add(pointsRow);
    function update() {
        editor.execute(new SetGeometryCommand_1.SetGeometryCommand(editor, object, new THREE.LatheGeometry(points.getValue(), segments.getValue(), (phiStart.getValue() / 180) * Math.PI, (phiLength.getValue() / 180) * Math.PI)));
    }
    return container;
}
exports.GeometryParametersPanel = GeometryParametersPanel;
