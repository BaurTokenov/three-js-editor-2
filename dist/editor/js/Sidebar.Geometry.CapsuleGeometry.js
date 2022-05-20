"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeometryParametersPanel = void 0;
const ui_1 = require("./libs/ui");
function GeometryParametersPanel(editor, object) {
    const strings = editor.strings;
    const container = new ui_1.UIDiv();
    const geometry = object.geometry;
    const parameters = geometry.parameters;
    // radius
    const radiusRow = new ui_1.UIRow();
    const radius = new ui_1.UINumber(parameters.radius).onChange(update);
    radiusRow.add(new ui_1.UIText(strings.getKey('sidebar/geometry/capsule_geometry/radius')).setWidth('90px'));
    radiusRow.add(radius);
    container.add(radiusRow);
    // length
    const lengthRow = new ui_1.UIRow();
    const length = new ui_1.UINumber(parameters.height).onChange(update);
    lengthRow.add(new ui_1.UIText(strings.getKey('sidebar/geometry/capsule_geometry/length')).setWidth('90px'));
    lengthRow.add(length);
    container.add(lengthRow);
    // capSegments
    const capSegmentsRow = new ui_1.UIRow();
    const capSegments = new ui_1.UINumber(parameters.capSegments).onChange(update);
    capSegmentsRow.add(new ui_1.UIText(strings.getKey('sidebar/geometry/capsule_geometry/capseg')).setWidth('90px'));
    capSegmentsRow.add(capSegments);
    container.add(capSegmentsRow);
    // radialSegments
    const radialSegmentsRow = new ui_1.UIRow();
    const radialSegments = new ui_1.UIInteger(parameters.radialSegments).setRange(1, Infinity).onChange(update);
    radialSegmentsRow.add(new ui_1.UIText(strings.getKey('sidebar/geometry/capsule_geometry/radialseg')).setWidth('90px'));
    radialSegmentsRow.add(radialSegments);
    container.add(radialSegmentsRow);
    //
    // function update() {
    // 	editor.execute( new SetGeometryCommand( editor, object, new THREE.CapsuleGeometry(
    // 		radius.getValue(),
    // 		length.getValue(),
    // 		capSegments.getValue(),
    // 		radialSegments.getValue()
    // 	) ) );
    // }
    return container;
}
exports.GeometryParametersPanel = GeometryParametersPanel;
