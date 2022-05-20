"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WireframeGeometry2 = void 0;
const three_1 = require("three");
const LineSegmentsGeometry_1 = require("../lines/LineSegmentsGeometry");
class WireframeGeometry2 extends LineSegmentsGeometry_1.LineSegmentsGeometry {
    constructor(geometry) {
        super();
        this.type = 'WireframeGeometry2';
        this.fromWireframeGeometry(new three_1.WireframeGeometry(geometry));
        // set colors, maybe
    }
}
exports.WireframeGeometry2 = WireframeGeometry2;
WireframeGeometry2.prototype.isWireframeGeometry2 = true;
