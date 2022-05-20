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
exports.NURBSCurve = void 0;
const three_1 = require("three");
const NURBSUtils = __importStar(require("../curves/NURBSUtils"));
/**
 * NURBS curve object
 *
 * Derives from Curve, overriding getPoint and getTangent.
 *
 * Implementation is based on (x, y [, z=0 [, w=1]]) control points with w=weight.
 *
 **/
class NURBSCurve extends three_1.Curve {
    constructor(degree, knots /* array of reals */, controlPoints /* array of Vector(2|3|4) */, startKnot /* index in knots */, endKnot /* index in knots */) {
        super();
        this.degree = degree;
        this.knots = knots;
        this.controlPoints = [];
        // Used by periodic NURBS to remove hidden spans
        this.startKnot = startKnot || 0;
        this.endKnot = endKnot || this.knots.length - 1;
        for (let i = 0; i < controlPoints.length; ++i) {
            // ensure Vector4 for control points
            const point = controlPoints[i];
            this.controlPoints[i] = new three_1.Vector4(point.x, point.y, point.z, point.w);
        }
    }
    getPoint(t, optionalTarget = new three_1.Vector3()) {
        const point = optionalTarget;
        const u = this.knots[this.startKnot] + t * (this.knots[this.endKnot] - this.knots[this.startKnot]); // linear mapping t->u
        // following results in (wx, wy, wz, w) homogeneous point
        const hpoint = NURBSUtils.calcBSplinePoint(this.degree, this.knots, this.controlPoints, u);
        if (hpoint.w !== 1.0) {
            // project to 3D space: (wx, wy, wz, w) -> (x, y, z, 1)
            hpoint.divideScalar(hpoint.w);
        }
        return point.set(hpoint.x, hpoint.y, hpoint.z);
    }
    getTangent(t, optionalTarget = new three_1.Vector3()) {
        const tangent = optionalTarget;
        const u = this.knots[0] + t * (this.knots[this.knots.length - 1] - this.knots[0]);
        const ders = NURBSUtils.calcNURBSDerivatives(this.degree, this.knots, this.controlPoints, u, 1);
        tangent.copy(ders[1]).normalize();
        return tangent;
    }
}
exports.NURBSCurve = NURBSCurve;
