"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rangeFog = exports.fog = exports.checker = exports.timerDelta = exports.timerGlobal = exports.timerLocal = exports.spritesheetUV = exports.oscSawtooth = exports.oscTriangle = exports.oscSquare = exports.oscSine = exports.maxMipLevel = exports.matcapUV = exports.lightingContext = exports.lights = exports.toneMapping = exports.normalMap = exports.colorSpace = exports.skinning = exports.reflectCube = exports.reflectVector = exports.instance = exports.cubeTexture = exports.PhysicalLightingModel = exports.getRoughness = exports.getGeometryRoughness = exports.getDistanceAttenuation = exports.V_GGX_SmithCorrelated = exports.F_Schlick = exports.DFGApprox = exports.D_GGX = exports.BRDF_Lambert = exports.BRDF_GGX = void 0;
// accessors
const CubeTextureNode_1 = __importDefault(require("../accessors/CubeTextureNode"));
const InstanceNode_1 = __importDefault(require("../accessors/InstanceNode"));
const ReflectNode_1 = __importDefault(require("../accessors/ReflectNode"));
const SkinningNode_1 = __importDefault(require("../accessors/SkinningNode"));
// display
const ColorSpaceNode_1 = __importDefault(require("../display/ColorSpaceNode"));
const NormalMapNode_1 = __importDefault(require("../display/NormalMapNode"));
const ToneMappingNode_1 = __importDefault(require("../display/ToneMappingNode"));
// lighting
const LightsNode_1 = __importDefault(require("../lighting/LightsNode"));
//import LightingNode from '../lighting/LightingNode';
const LightingContextNode_1 = __importDefault(require("../lighting/LightingContextNode"));
// utils
const MatcapUVNode_1 = __importDefault(require("../utils/MatcapUVNode"));
const MaxMipLevelNode_1 = __importDefault(require("../utils/MaxMipLevelNode"));
const OscNode_1 = __importDefault(require("../utils/OscNode"));
const SpriteSheetUVNode_1 = __importDefault(require("../utils/SpriteSheetUVNode"));
const TimerNode_1 = __importDefault(require("../utils/TimerNode"));
// procedural
const CheckerNode_1 = __importDefault(require("../procedural/CheckerNode"));
// fog
const FogNode_1 = __importDefault(require("../fog/FogNode"));
const FogRangeNode_1 = __importDefault(require("../fog/FogRangeNode"));
// shader node utils
const ShaderNode_1 = require("./ShaderNode");
//
// Node Material Shader Syntax
//
// shader node base
__exportStar(require("./ShaderNodeBaseElements"), exports);
// functions
var BRDF_GGX_1 = require("../functions/BSDF/BRDF_GGX"); // see https://github.com/tc39/proposal-export-default-from
Object.defineProperty(exports, "BRDF_GGX", { enumerable: true, get: function () { return __importDefault(BRDF_GGX_1).default; } });
var BRDF_Lambert_1 = require("../functions/BSDF/BRDF_Lambert");
Object.defineProperty(exports, "BRDF_Lambert", { enumerable: true, get: function () { return __importDefault(BRDF_Lambert_1).default; } });
var D_GGX_1 = require("../functions/BSDF/D_GGX");
Object.defineProperty(exports, "D_GGX", { enumerable: true, get: function () { return __importDefault(D_GGX_1).default; } });
var DFGApprox_1 = require("../functions/BSDF/DFGApprox");
Object.defineProperty(exports, "DFGApprox", { enumerable: true, get: function () { return __importDefault(DFGApprox_1).default; } });
var F_Schlick_1 = require("../functions/BSDF/F_Schlick");
Object.defineProperty(exports, "F_Schlick", { enumerable: true, get: function () { return __importDefault(F_Schlick_1).default; } });
var V_GGX_SmithCorrelated_1 = require("../functions/BSDF/V_GGX_SmithCorrelated");
Object.defineProperty(exports, "V_GGX_SmithCorrelated", { enumerable: true, get: function () { return __importDefault(V_GGX_SmithCorrelated_1).default; } });
var getDistanceAttenuation_1 = require("../functions/light/getDistanceAttenuation");
Object.defineProperty(exports, "getDistanceAttenuation", { enumerable: true, get: function () { return __importDefault(getDistanceAttenuation_1).default; } });
var getGeometryRoughness_1 = require("../functions/material/getGeometryRoughness");
Object.defineProperty(exports, "getGeometryRoughness", { enumerable: true, get: function () { return __importDefault(getGeometryRoughness_1).default; } });
var getRoughness_1 = require("../functions/material/getRoughness");
Object.defineProperty(exports, "getRoughness", { enumerable: true, get: function () { return __importDefault(getRoughness_1).default; } });
var PhysicalLightingModel_1 = require("../functions/PhysicalLightingModel");
Object.defineProperty(exports, "PhysicalLightingModel", { enumerable: true, get: function () { return __importDefault(PhysicalLightingModel_1).default; } });
// accessors
exports.cubeTexture = ShaderNode_1.nodeProxy(CubeTextureNode_1.default);
exports.instance = ShaderNode_1.nodeProxy(InstanceNode_1.default);
exports.reflectVector = ShaderNode_1.nodeImmutable(ReflectNode_1.default, ReflectNode_1.default.VECTOR);
exports.reflectCube = ShaderNode_1.nodeImmutable(ReflectNode_1.default, ReflectNode_1.default.CUBE);
exports.skinning = ShaderNode_1.nodeProxy(SkinningNode_1.default);
// display
const colorSpace = (node, encoding) => ShaderNode_1.nodeObject(new ColorSpaceNode_1.default(null, ShaderNode_1.nodeObject(node)).fromEncoding(encoding));
exports.colorSpace = colorSpace;
exports.normalMap = ShaderNode_1.nodeProxy(NormalMapNode_1.default);
const toneMapping = (mapping, exposure, color) => ShaderNode_1.nodeObject(new ToneMappingNode_1.default(mapping, ShaderNode_1.nodeObject(exposure), ShaderNode_1.nodeObject(color)));
exports.toneMapping = toneMapping;
// lighting
//export const lighting = nodeProxy( LightingNode ); // abstract
//export const light; // still needs to be added
const lights = (lights) => ShaderNode_1.nodeObject(new LightsNode_1.default().fromLights(lights));
exports.lights = lights;
exports.lightingContext = ShaderNode_1.nodeProxy(LightingContextNode_1.default);
// utils
exports.matcapUV = ShaderNode_1.nodeImmutable(MatcapUVNode_1.default);
exports.maxMipLevel = ShaderNode_1.nodeProxy(MaxMipLevelNode_1.default);
exports.oscSine = ShaderNode_1.nodeProxy(OscNode_1.default, OscNode_1.default.SINE);
exports.oscSquare = ShaderNode_1.nodeProxy(OscNode_1.default, OscNode_1.default.SQUARE);
exports.oscTriangle = ShaderNode_1.nodeProxy(OscNode_1.default, OscNode_1.default.TRIANGLE);
exports.oscSawtooth = ShaderNode_1.nodeProxy(OscNode_1.default, OscNode_1.default.SAWTOOTH);
exports.spritesheetUV = ShaderNode_1.nodeProxy(SpriteSheetUVNode_1.default);
// @TODO: add supports to use node in timeScale
const timerLocal = (timeScale) => ShaderNode_1.nodeObject(new TimerNode_1.default(TimerNode_1.default.LOCAL, timeScale));
exports.timerLocal = timerLocal;
const timerGlobal = (timeScale) => ShaderNode_1.nodeObject(new TimerNode_1.default(TimerNode_1.default.GLOBAL, timeScale));
exports.timerGlobal = timerGlobal;
const timerDelta = (timeScale) => ShaderNode_1.nodeObject(new TimerNode_1.default(TimerNode_1.default.DELTA, timeScale));
exports.timerDelta = timerDelta;
// procedural
exports.checker = ShaderNode_1.nodeProxy(CheckerNode_1.default);
// fog
exports.fog = ShaderNode_1.nodeProxy(FogNode_1.default);
exports.rangeFog = ShaderNode_1.nodeProxy(FogRangeNode_1.default);
