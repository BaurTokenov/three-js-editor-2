"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Matrix4NodeUniform = exports.Matrix3NodeUniform = exports.ColorNodeUniform = exports.Vector4NodeUniform = exports.Vector3NodeUniform = exports.Vector2NodeUniform = exports.FloatNodeUniform = void 0;
const WebGPUUniform_1 = require("../WebGPUUniform");
class FloatNodeUniform extends WebGPUUniform_1.FloatUniform {
    constructor(nodeUniform) {
        super(nodeUniform.name, nodeUniform.value);
        this.nodeUniform = nodeUniform;
    }
    getValue() {
        return this.nodeUniform.value;
    }
}
exports.FloatNodeUniform = FloatNodeUniform;
class Vector2NodeUniform extends WebGPUUniform_1.Vector2Uniform {
    constructor(nodeUniform) {
        super(nodeUniform.name, nodeUniform.value);
        this.nodeUniform = nodeUniform;
    }
    getValue() {
        return this.nodeUniform.value;
    }
}
exports.Vector2NodeUniform = Vector2NodeUniform;
class Vector3NodeUniform extends WebGPUUniform_1.Vector3Uniform {
    constructor(nodeUniform) {
        super(nodeUniform.name, nodeUniform.value);
        this.nodeUniform = nodeUniform;
    }
    getValue() {
        return this.nodeUniform.value;
    }
}
exports.Vector3NodeUniform = Vector3NodeUniform;
class Vector4NodeUniform extends WebGPUUniform_1.Vector4Uniform {
    constructor(nodeUniform) {
        super(nodeUniform.name, nodeUniform.value);
        this.nodeUniform = nodeUniform;
    }
    getValue() {
        return this.nodeUniform.value;
    }
}
exports.Vector4NodeUniform = Vector4NodeUniform;
class ColorNodeUniform extends WebGPUUniform_1.ColorUniform {
    constructor(nodeUniform) {
        super(nodeUniform.name, nodeUniform.value);
        this.nodeUniform = nodeUniform;
    }
    getValue() {
        return this.nodeUniform.value;
    }
}
exports.ColorNodeUniform = ColorNodeUniform;
class Matrix3NodeUniform extends WebGPUUniform_1.Matrix3Uniform {
    constructor(nodeUniform) {
        super(nodeUniform.name, nodeUniform.value);
        this.nodeUniform = nodeUniform;
    }
    getValue() {
        return this.nodeUniform.value;
    }
}
exports.Matrix3NodeUniform = Matrix3NodeUniform;
class Matrix4NodeUniform extends WebGPUUniform_1.Matrix4Uniform {
    constructor(nodeUniform) {
        super(nodeUniform.name, nodeUniform.value);
        this.nodeUniform = nodeUniform;
    }
    getValue() {
        return this.nodeUniform.value;
    }
}
exports.Matrix4NodeUniform = Matrix4NodeUniform;
