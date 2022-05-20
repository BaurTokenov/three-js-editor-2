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
    const options = parameters.options;
    options.curveSegments = options.curveSegments != undefined ? options.curveSegments : 12;
    options.steps = options.steps != undefined ? options.steps : 1;
    options.depth = options.depth != undefined ? options.depth : 100;
    options.bevelThickness = options.bevelThickness !== undefined ? options.bevelThickness : 6;
    options.bevelSize = options.bevelSize !== undefined ? options.bevelSize : 4;
    options.bevelOffset = options.bevelOffset !== undefined ? options.bevelOffset : 0;
    options.bevelSegments = options.bevelSegments !== undefined ? options.bevelSegments : 3;
    // curveSegments
    const curveSegmentsRow = new ui_1.UIRow();
    const curveSegments = new ui_1.UIInteger(options.curveSegments).onChange(update).setRange(1, Infinity);
    curveSegmentsRow.add(new ui_1.UIText(strings.getKey('sidebar/geometry/extrude_geometry/curveSegments')).setWidth('90px'));
    curveSegmentsRow.add(curveSegments);
    container.add(curveSegmentsRow);
    // steps
    const stepsRow = new ui_1.UIRow();
    const steps = new ui_1.UIInteger(options.steps).onChange(update).setRange(1, Infinity);
    stepsRow.add(new ui_1.UIText(strings.getKey('sidebar/geometry/extrude_geometry/steps')).setWidth('90px'));
    stepsRow.add(steps);
    container.add(stepsRow);
    // depth
    const depthRow = new ui_1.UIRow();
    const depth = new ui_1.UINumber(options.depth).onChange(update).setRange(1, Infinity);
    depthRow.add(new ui_1.UIText(strings.getKey('sidebar/geometry/extrude_geometry/depth')).setWidth('90px'));
    depthRow.add(depth);
    container.add(depthRow);
    // enabled
    const enabledRow = new ui_1.UIRow();
    const enabled = new ui_1.UICheckbox(options.bevelEnabled).onChange(update);
    enabledRow.add(new ui_1.UIText(strings.getKey('sidebar/geometry/extrude_geometry/bevelEnabled')).setWidth('90px'));
    enabledRow.add(enabled);
    container.add(enabledRow);
    let thickness, size, offset, segments;
    if (options.bevelEnabled === true) {
        // thickness
        const thicknessRow = new ui_1.UIRow();
        thickness = new ui_1.UINumber(options.bevelThickness).onChange(update);
        thicknessRow.add(new ui_1.UIText(strings.getKey('sidebar/geometry/extrude_geometry/bevelThickness')).setWidth('90px'));
        thicknessRow.add(thickness);
        container.add(thicknessRow);
        // size
        const sizeRow = new ui_1.UIRow();
        size = new ui_1.UINumber(options.bevelSize).onChange(update);
        sizeRow.add(new ui_1.UIText(strings.getKey('sidebar/geometry/extrude_geometry/bevelSize')).setWidth('90px'));
        sizeRow.add(size);
        container.add(sizeRow);
        // offset
        const offsetRow = new ui_1.UIRow();
        offset = new ui_1.UINumber(options.bevelOffset).onChange(update);
        offsetRow.add(new ui_1.UIText(strings.getKey('sidebar/geometry/extrude_geometry/bevelOffset')).setWidth('90px'));
        offsetRow.add(offset);
        container.add(offsetRow);
        // segments
        const segmentsRow = new ui_1.UIRow();
        segments = new ui_1.UIInteger(options.bevelSegments).onChange(update).setRange(0, Infinity);
        segmentsRow.add(new ui_1.UIText(strings.getKey('sidebar/geometry/extrude_geometry/bevelSegments')).setWidth('90px'));
        segmentsRow.add(segments);
        container.add(segmentsRow);
    }
    const button = new ui_1.UIButton(strings.getKey('sidebar/geometry/extrude_geometry/shape'))
        .onClick(toShape)
        .setWidth('90px')
        .setMarginLeft('90px');
    container.add(button);
    //
    function update() {
        editor.execute(new SetGeometryCommand_1.SetGeometryCommand(editor, object, new THREE.ExtrudeGeometry(parameters.shapes, {
            curveSegments: curveSegments.getValue(),
            steps: steps.getValue(),
            depth: depth.getValue(),
            bevelEnabled: enabled.getValue(),
            bevelThickness: options.bevelThickness,
            bevelSize: size !== undefined ? size.getValue() : options.bevelSize,
            bevelOffset: offset !== undefined ? offset.getValue() : options.bevelOffset,
            bevelSegments: segments !== undefined ? segments.getValue() : options.bevelSegments,
        })));
    }
    function toShape() {
        editor.execute(new SetGeometryCommand_1.SetGeometryCommand(editor, object, new THREE.ShapeGeometry(parameters.shapes, options.curveSegments)));
    }
    return container;
}
exports.GeometryParametersPanel = GeometryParametersPanel;
