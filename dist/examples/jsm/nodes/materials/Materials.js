"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointsNodeMaterial = exports.MeshStandardNodeMaterial = exports.MeshBasicNodeMaterial = exports.LineBasicNodeMaterial = exports.NodeMaterial = void 0;
const NodeMaterial_1 = __importDefault(require("./NodeMaterial"));
exports.NodeMaterial = NodeMaterial_1.default;
const LineBasicNodeMaterial_1 = __importDefault(require("./LineBasicNodeMaterial"));
exports.LineBasicNodeMaterial = LineBasicNodeMaterial_1.default;
const MeshBasicNodeMaterial_1 = __importDefault(require("./MeshBasicNodeMaterial"));
exports.MeshBasicNodeMaterial = MeshBasicNodeMaterial_1.default;
const MeshStandardNodeMaterial_1 = __importDefault(require("./MeshStandardNodeMaterial"));
exports.MeshStandardNodeMaterial = MeshStandardNodeMaterial_1.default;
const PointsNodeMaterial_1 = __importDefault(require("./PointsNodeMaterial"));
exports.PointsNodeMaterial = PointsNodeMaterial_1.default;
const three_1 = require("three");
const materialLib = {
    NodeMaterial: NodeMaterial_1.default,
    LineBasicNodeMaterial: LineBasicNodeMaterial_1.default,
    MeshBasicNodeMaterial: MeshBasicNodeMaterial_1.default,
    MeshStandardNodeMaterial: MeshStandardNodeMaterial_1.default,
    PointsNodeMaterial: PointsNodeMaterial_1.default,
};
const fromTypeFunction = three_1.Material.fromType;
three_1.Material.fromType = function (type) {
    if (materialLib[type] !== undefined) {
        return new materialLib[type]();
    }
    return fromTypeFunction.call(this, type);
};
NodeMaterial_1.default.fromMaterial = function (material) {
    const type = material.type.replace('Material', 'NodeMaterial');
    if (materialLib[type] === undefined) {
        return material; // is already a node material or cannot be converted
    }
    const nodeMaterial = new materialLib[type](material);
    for (let key in material) {
        if (nodeMaterial[key] === undefined) {
            nodeMaterial[key] = material[key]; // currently this is needed only for material.alphaTest
        }
    }
    return nodeMaterial;
};
