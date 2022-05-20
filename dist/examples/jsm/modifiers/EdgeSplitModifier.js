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
exports.EdgeSplitModifier = void 0;
const three_1 = require("three");
const BufferGeometryUtils = __importStar(require("../utils/BufferGeometryUtils"));
const _A = new three_1.Vector3();
const _B = new three_1.Vector3();
const _C = new three_1.Vector3();
class EdgeSplitModifier {
    modify(geometry, cutOffAngle, tryKeepNormals = true) {
        function computeNormals() {
            normals = new Float32Array(indexes.length * 3);
            for (let i = 0; i < indexes.length; i += 3) {
                let index = indexes[i];
                _A.set(positions[3 * index], positions[3 * index + 1], positions[3 * index + 2]);
                index = indexes[i + 1];
                _B.set(positions[3 * index], positions[3 * index + 1], positions[3 * index + 2]);
                index = indexes[i + 2];
                _C.set(positions[3 * index], positions[3 * index + 1], positions[3 * index + 2]);
                _C.sub(_B);
                _A.sub(_B);
                const normal = _C.cross(_A).normalize();
                for (let j = 0; j < 3; j++) {
                    normals[3 * (i + j)] = normal.x;
                    normals[3 * (i + j) + 1] = normal.y;
                    normals[3 * (i + j) + 2] = normal.z;
                }
            }
        }
        function mapPositionsToIndexes() {
            pointToIndexMap = Array(positions.length / 3);
            for (let i = 0; i < indexes.length; i += 1) {
                const index = indexes[i];
                if (pointToIndexMap[index] == null) {
                    pointToIndexMap[index] = [];
                }
                pointToIndexMap[index].push(i);
            }
        }
        function edgeSplitToGroups(indexes, cutOff, firstIndex) {
            _A.set(normals[3 * firstIndex], normals[3 * firstIndex + 1], normals[3 * firstIndex + 2]).normalize();
            const result = {
                splitGroup: [],
                currentGroup: [firstIndex],
            };
            for (const j of indexes) {
                if (j !== firstIndex) {
                    _B.set(normals[3 * j], normals[3 * j + 1], normals[3 * j + 2]).normalize();
                    if (_B.dot(_A) < cutOff) {
                        result.splitGroup.push(j);
                    }
                    else {
                        result.currentGroup.push(j);
                    }
                }
            }
            return result;
        }
        function edgeSplit(indexes, cutOff, original = null) {
            if (indexes.length === 0)
                return;
            const groupResults = [];
            for (const index of indexes) {
                groupResults.push(edgeSplitToGroups(indexes, cutOff, index));
            }
            let result = groupResults[0];
            for (const groupResult of groupResults) {
                if (groupResult.currentGroup.length > result.currentGroup.length) {
                    result = groupResult;
                }
            }
            if (original != null) {
                splitIndexes.push({
                    original: original,
                    indexes: result.currentGroup,
                });
            }
            if (result.splitGroup.length) {
                edgeSplit(result.splitGroup, cutOff, original || result.currentGroup[0]);
            }
        }
        if (geometry.isGeometry === true) {
            console.error('THREE.EdgeSplitModifier no longer supports THREE.Geometry. Use BufferGeometry instead.');
            return;
        }
        let hadNormals = false;
        let oldNormals = null;
        if (geometry.attributes.normal) {
            hadNormals = true;
            geometry = geometry.clone();
            if (tryKeepNormals === true && geometry.index !== null) {
                oldNormals = geometry.attributes.normal.array;
            }
            geometry.deleteAttribute('normal');
        }
        if (geometry.index == null) {
            geometry = BufferGeometryUtils.mergeVertices(geometry);
        }
        const indexes = geometry.index.array;
        const positions = geometry.getAttribute('position').array;
        let normals;
        let pointToIndexMap;
        computeNormals();
        mapPositionsToIndexes();
        const splitIndexes = [];
        for (const vertexIndexes of pointToIndexMap) {
            edgeSplit(vertexIndexes, Math.cos(cutOffAngle) - 0.001);
        }
        const newAttributes = {};
        for (const name of Object.keys(geometry.attributes)) {
            const oldAttribute = geometry.attributes[name];
            const newArray = new oldAttribute.array.constructor((indexes.length + splitIndexes.length) * oldAttribute.itemSize);
            newArray.set(oldAttribute.array);
            newAttributes[name] = new three_1.BufferAttribute(newArray, oldAttribute.itemSize, oldAttribute.normalized);
        }
        const newIndexes = new Uint32Array(indexes.length);
        newIndexes.set(indexes);
        for (let i = 0; i < splitIndexes.length; i += 1) {
            const split = splitIndexes[i];
            const index = indexes[split.original];
            for (const attribute of Object.values(newAttributes)) {
                for (let j = 0; j < attribute.itemSize; j++) {
                    attribute.array[(indexes.length + i) * attribute.itemSize + j] =
                        attribute.array[index * attribute.itemSize + j];
                }
            }
            for (const j of split.indexes) {
                newIndexes[j] = indexes.length + i;
            }
        }
        geometry = new three_1.BufferGeometry();
        geometry.setIndex(new three_1.BufferAttribute(newIndexes, 1));
        for (const name of Object.keys(newAttributes)) {
            geometry.setAttribute(name, newAttributes[name]);
        }
        if (hadNormals) {
            geometry.computeVertexNormals();
            if (oldNormals !== null) {
                const changedNormals = new Array(oldNormals.length / 3).fill(false);
                for (const splitData of splitIndexes)
                    changedNormals[splitData.original] = true;
                for (let i = 0; i < changedNormals.length; i += 1) {
                    if (changedNormals[i] === false) {
                        for (let j = 0; j < 3; j++)
                            geometry.attributes.normal.array[3 * i + j] = oldNormals[3 * i + j];
                    }
                }
            }
        }
        return geometry;
    }
}
exports.EdgeSplitModifier = EdgeSplitModifier;
