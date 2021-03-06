"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeType = exports.NodeUpdateType = exports.NodeShaderStage = void 0;
exports.NodeShaderStage = {
    Vertex: 'vertex',
    Fragment: 'fragment'
};
exports.NodeUpdateType = {
    None: 'none',
    Frame: 'frame',
    Object: 'object'
};
exports.NodeType = {
    Boolean: 'bool',
    Integer: 'int',
    Float: 'float',
    Vector2: 'vec2',
    Vector3: 'vec3',
    Vector4: 'vec4',
    Matrix3: 'mat3',
    Matrix4: 'mat4'
};
