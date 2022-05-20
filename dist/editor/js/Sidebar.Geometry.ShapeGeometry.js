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
    // curveSegments
    const curveSegmentsRow = new ui_1.UIRow();
    const curveSegments = new ui_1.UIInteger(parameters.curveSegments || 12).onChange(changeShape).setRange(1, Infinity);
    curveSegmentsRow.add(new ui_1.UIText(strings.getKey('sidebar/geometry/shape_geometry/curveSegments')).setWidth('90px'));
    curveSegmentsRow.add(curveSegments);
    container.add(curveSegmentsRow);
    // to extrude
    const button = new ui_1.UIButton(strings.getKey('sidebar/geometry/shape_geometry/extrude'))
        .onClick(toExtrude)
        .setWidth('90px')
        .setMarginLeft('90px');
    container.add(button);
    //
    function changeShape() {
        editor.execute(new SetGeometryCommand_1.SetGeometryCommand(editor, object, new THREE.ShapeGeometry(parameters.shapes, curveSegments.getValue())));
    }
    function toExtrude() {
        editor.execute(new SetGeometryCommand_1.SetGeometryCommand(editor, object, new THREE.ExtrudeGeometry(parameters.shapes, {
            curveSegments: curveSegments.getValue(),
        })));
    }
    return container;
}
exports.GeometryParametersPanel = GeometryParametersPanel;
