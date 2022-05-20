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
    radiusRow.add(new ui_1.UIText(strings.getKey('sidebar/geometry/circle_geometry/radius')).setWidth('90px'));
    radiusRow.add(radius);
    container.add(radiusRow);
    // segments
    const segmentsRow = new ui_1.UIRow();
    const segments = new ui_1.UIInteger(parameters.segments).setRange(3, Infinity).onChange(update);
    segmentsRow.add(new ui_1.UIText(strings.getKey('sidebar/geometry/circle_geometry/segments')).setWidth('90px'));
    segmentsRow.add(segments);
    container.add(segmentsRow);
    // thetaStart
    const thetaStartRow = new ui_1.UIRow();
    const thetaStart = new ui_1.UINumber(parameters.thetaStart * THREE.MathUtils.RAD2DEG).setStep(10).onChange(update);
    thetaStartRow.add(new ui_1.UIText(strings.getKey('sidebar/geometry/circle_geometry/thetastart')).setWidth('90px'));
    thetaStartRow.add(thetaStart);
    container.add(thetaStartRow);
    // thetaLength
    const thetaLengthRow = new ui_1.UIRow();
    const thetaLength = new ui_1.UINumber(parameters.thetaLength * THREE.MathUtils.RAD2DEG).setStep(10).onChange(update);
    thetaLengthRow.add(new ui_1.UIText(strings.getKey('sidebar/geometry/circle_geometry/thetalength')).setWidth('90px'));
    thetaLengthRow.add(thetaLength);
    container.add(thetaLengthRow);
    //
    function update() {
        editor.execute(new SetGeometryCommand_1.SetGeometryCommand(editor, object, new THREE.CircleGeometry(radius.getValue(), segments.getValue(), thetaStart.getValue() * THREE.MathUtils.DEG2RAD, thetaLength.getValue() * THREE.MathUtils.DEG2RAD)));
    }
    return container;
}
exports.GeometryParametersPanel = GeometryParametersPanel;
