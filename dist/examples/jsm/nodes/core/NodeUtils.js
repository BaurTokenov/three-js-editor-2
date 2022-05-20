"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValueFromType = exports.getValueType = exports.getNodesKeys = void 0;
const three_1 = require("three");
const getNodesKeys = (object) => {
    const props = [];
    for (const name in object) {
        const value = object[name];
        if (value && value.isNode === true) {
            props.push(name);
        }
    }
    return props;
};
exports.getNodesKeys = getNodesKeys;
const getValueType = (value) => {
    if (typeof value === 'number') {
        return 'float';
    }
    else if (typeof value === 'boolean') {
        return 'bool';
    }
    else if ((value === null || value === void 0 ? void 0 : value.isVector2) === true) {
        return 'vec2';
    }
    else if ((value === null || value === void 0 ? void 0 : value.isVector3) === true) {
        return 'vec3';
    }
    else if ((value === null || value === void 0 ? void 0 : value.isVector4) === true) {
        return 'vec4';
    }
    else if ((value === null || value === void 0 ? void 0 : value.isMatrix3) === true) {
        return 'mat3';
    }
    else if ((value === null || value === void 0 ? void 0 : value.isMatrix4) === true) {
        return 'mat4';
    }
    else if ((value === null || value === void 0 ? void 0 : value.isColor) === true) {
        return 'color';
    }
    return null;
};
exports.getValueType = getValueType;
const getValueFromType = (type, ...params) => {
    const last4 = type === null || type === void 0 ? void 0 : type.slice(-4);
    if (type === 'color') {
        return new three_1.Color(...params);
    }
    else if (last4 === 'vec2') {
        return new three_1.Vector2(...params);
    }
    else if (last4 === 'vec3') {
        return new three_1.Vector3(...params);
    }
    else if (last4 === 'vec4') {
        return new three_1.Vector4(...params);
    }
    else if (last4 === 'mat3') {
        return new three_1.Matrix3(...params);
    }
    else if (last4 === 'mat4') {
        return new three_1.Matrix4(...params);
    }
    else if (type === 'bool') {
        return false;
    }
    else if ((type === 'float') || (type === 'int') || (type === 'uint')) {
        return 0;
    }
    return null;
};
exports.getValueFromType = getValueFromType;
