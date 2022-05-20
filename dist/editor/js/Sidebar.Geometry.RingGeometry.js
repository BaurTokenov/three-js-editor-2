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
    // innerRadius
    const innerRadiusRow = new ui_1.UIRow();
    const innerRadius = new ui_1.UINumber(parameters.innerRadius).onChange(update);
    innerRadiusRow.add(new ui_1.UIText(strings.getKey('sidebar/geometry/ring_geometry/innerRadius')).setWidth('90px'));
    innerRadiusRow.add(innerRadius);
    container.add(innerRadiusRow);
    // outerRadius
    const outerRadiusRow = new ui_1.UIRow();
    const outerRadius = new ui_1.UINumber(parameters.outerRadius).onChange(update);
    outerRadiusRow.add(new ui_1.UIText(strings.getKey('sidebar/geometry/ring_geometry/outerRadius')).setWidth('90px'));
    outerRadiusRow.add(outerRadius);
    container.add(outerRadiusRow);
    // thetaSegments
    const thetaSegmentsRow = new ui_1.UIRow();
    const thetaSegments = new ui_1.UIInteger(parameters.thetaSegments).setRange(3, Infinity).onChange(update);
    thetaSegmentsRow.add(new ui_1.UIText(strings.getKey('sidebar/geometry/ring_geometry/thetaSegments')).setWidth('90px'));
    thetaSegmentsRow.add(thetaSegments);
    container.add(thetaSegmentsRow);
    // phiSegments
    const phiSegmentsRow = new ui_1.UIRow();
    const phiSegments = new ui_1.UIInteger(parameters.phiSegments).setRange(3, Infinity).onChange(update);
    phiSegmentsRow.add(new ui_1.UIText(strings.getKey('sidebar/geometry/ring_geometry/phiSegments')).setWidth('90px'));
    phiSegmentsRow.add(phiSegments);
    container.add(phiSegmentsRow);
    // thetaStart
    const thetaStartRow = new ui_1.UIRow();
    const thetaStart = new ui_1.UINumber(parameters.thetaStart * THREE.MathUtils.RAD2DEG).setStep(10).onChange(update);
    thetaStartRow.add(new ui_1.UIText(strings.getKey('sidebar/geometry/ring_geometry/thetastart')).setWidth('90px'));
    thetaStartRow.add(thetaStart);
    container.add(thetaStartRow);
    // thetaLength
    const thetaLengthRow = new ui_1.UIRow();
    const thetaLength = new ui_1.UINumber(parameters.thetaLength * THREE.MathUtils.RAD2DEG).setStep(10).onChange(update);
    thetaLengthRow.add(new ui_1.UIText(strings.getKey('sidebar/geometry/ring_geometry/thetalength')).setWidth('90px'));
    thetaLengthRow.add(thetaLength);
    container.add(thetaLengthRow);
    //
    function update() {
        editor.execute(new SetGeometryCommand_1.SetGeometryCommand(editor, object, new THREE.RingGeometry(innerRadius.getValue(), outerRadius.getValue(), thetaSegments.getValue(), phiSegments.getValue(), thetaStart.getValue() * THREE.MathUtils.DEG2RAD, thetaLength.getValue() * THREE.MathUtils.DEG2RAD)));
    }
    return container;
}
exports.GeometryParametersPanel = GeometryParametersPanel;
