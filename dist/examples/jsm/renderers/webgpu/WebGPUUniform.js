"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Matrix4Uniform = exports.Matrix3Uniform = exports.ColorUniform = exports.Vector4Uniform = exports.Vector3Uniform = exports.Vector2Uniform = exports.FloatUniform = void 0;
const three_1 = require("three");
class WebGPUUniform {
    constructor(name, value = null) {
        this.name = name;
        this.value = value;
        this.boundary = 0; // used to build the uniform buffer according to the STD140 layout
        this.itemSize = 0;
        this.offset = 0; // this property is set by WebGPUUniformsGroup and marks the start position in the uniform buffer
    }
    setValue(value) {
        this.value = value;
    }
    getValue() {
        return this.value;
    }
}
class FloatUniform extends WebGPUUniform {
    constructor(name, value = 0) {
        super(name, value);
        this.boundary = 4;
        this.itemSize = 1;
    }
}
exports.FloatUniform = FloatUniform;
FloatUniform.prototype.isFloatUniform = true;
class Vector2Uniform extends WebGPUUniform {
    constructor(name, value = new three_1.Vector2()) {
        super(name, value);
        this.boundary = 8;
        this.itemSize = 2;
    }
}
exports.Vector2Uniform = Vector2Uniform;
Vector2Uniform.prototype.isVector2Uniform = true;
class Vector3Uniform extends WebGPUUniform {
    constructor(name, value = new three_1.Vector3()) {
        super(name, value);
        this.boundary = 16;
        this.itemSize = 3;
    }
}
exports.Vector3Uniform = Vector3Uniform;
Vector3Uniform.prototype.isVector3Uniform = true;
class Vector4Uniform extends WebGPUUniform {
    constructor(name, value = new three_1.Vector4()) {
        super(name, value);
        this.boundary = 16;
        this.itemSize = 4;
    }
}
exports.Vector4Uniform = Vector4Uniform;
Vector4Uniform.prototype.isVector4Uniform = true;
class ColorUniform extends WebGPUUniform {
    constructor(name, value = new three_1.Color()) {
        super(name, value);
        this.boundary = 16;
        this.itemSize = 3;
    }
}
exports.ColorUniform = ColorUniform;
ColorUniform.prototype.isColorUniform = true;
class Matrix3Uniform extends WebGPUUniform {
    constructor(name, value = new three_1.Matrix3()) {
        super(name, value);
        this.boundary = 48;
        this.itemSize = 12;
    }
}
exports.Matrix3Uniform = Matrix3Uniform;
Matrix3Uniform.prototype.isMatrix3Uniform = true;
class Matrix4Uniform extends WebGPUUniform {
    constructor(name, value = new three_1.Matrix4()) {
        super(name, value);
        this.boundary = 64;
        this.itemSize = 16;
    }
}
exports.Matrix4Uniform = Matrix4Uniform;
Matrix4Uniform.prototype.isMatrix4Uniform = true;
