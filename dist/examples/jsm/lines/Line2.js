"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Line2 = void 0;
const LineSegments2_1 = require("../lines/LineSegments2");
const LineGeometry_1 = require("../lines/LineGeometry");
const LineMaterial_1 = require("../lines/LineMaterial");
class Line2 extends LineSegments2_1.LineSegments2 {
    constructor(geometry = new LineGeometry_1.LineGeometry(), material = new LineMaterial_1.LineMaterial({ color: Math.random() * 0xffffff })) {
        super(geometry, material);
        this.type = 'Line2';
    }
}
exports.Line2 = Line2;
Line2.prototype.isLine2 = true;
