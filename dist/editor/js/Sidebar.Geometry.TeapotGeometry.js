"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeometryParametersPanel = void 0;
const ui_1 = require("./libs/ui");
const TeapotGeometry_1 = require("../../examples/jsm/geometries/TeapotGeometry");
function GeometryParametersPanel(signals, object) {
    const container = new ui_1.UIDiv();
    const parameters = object.geometry.parameters;
    // size
    const sizeRow = new ui_1.UIRow();
    const size = new ui_1.UINumber(parameters.size).onChange(update);
    sizeRow.add(new ui_1.UIText('Size').setWidth('90px'));
    sizeRow.add(size);
    container.add(sizeRow);
    // segments
    const segmentsRow = new ui_1.UIRow();
    const segments = new ui_1.UIInteger(parameters.segments).setRange(1, Infinity).onChange(update);
    segmentsRow.add(new ui_1.UIText('Segments').setWidth('90px'));
    segmentsRow.add(segments);
    container.add(segmentsRow);
    // bottom
    const bottomRow = new ui_1.UIRow();
    const bottom = new ui_1.UICheckbox(parameters.bottom).onChange(update);
    bottomRow.add(new ui_1.UIText('Bottom').setWidth('90px'));
    bottomRow.add(bottom);
    container.add(bottomRow);
    // lid
    const lidRow = new ui_1.UIRow();
    const lid = new ui_1.UICheckbox(parameters.lid).onChange(update);
    lidRow.add(new ui_1.UIText('Lid').setWidth('90px'));
    lidRow.add(lid);
    container.add(lidRow);
    // body
    const bodyRow = new ui_1.UIRow();
    const body = new ui_1.UICheckbox(parameters.body).onChange(update);
    bodyRow.add(new ui_1.UIText('Body').setWidth('90px'));
    bodyRow.add(body);
    container.add(bodyRow);
    // fitted lid
    const fitLidRow = new ui_1.UIRow();
    const fitLid = new ui_1.UICheckbox(parameters.fitLid).onChange(update);
    fitLidRow.add(new ui_1.UIText('Fitted Lid').setWidth('90px'));
    fitLidRow.add(fitLid);
    container.add(fitLidRow);
    // blinn-sized
    const blinnRow = new ui_1.UIRow();
    const blinn = new ui_1.UICheckbox(parameters.blinn).onChange(update);
    blinnRow.add(new ui_1.UIText('Blinn-scaled').setWidth('90px'));
    blinnRow.add(blinn);
    container.add(blinnRow);
    function update() {
        object.geometry.dispose();
        object.geometry = new TeapotGeometry_1.TeapotGeometry(size.getValue(), segments.getValue(), bottom.getValue(), lid.getValue(), body.getValue(), fitLid.getValue(), blinn.getValue());
        object.geometry.computeBoundingSphere();
        signals.geometryChanged.dispatch(object);
    }
    return container;
}
exports.GeometryParametersPanel = GeometryParametersPanel;
