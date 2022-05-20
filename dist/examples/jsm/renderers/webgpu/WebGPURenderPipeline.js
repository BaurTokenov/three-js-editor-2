"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const three_1 = require("three");
class WebGPURenderPipeline {
    constructor(device, renderer, sampleCount) {
        this.cacheKey = null;
        this.shaderAttributes = null;
        this.stageVertex = null;
        this.stageFragment = null;
        this.usedTimes = 0;
        this._device = device;
        this._renderer = renderer;
        this._sampleCount = sampleCount;
    }
    init(cacheKey, stageVertex, stageFragment, object, nodeBuilder) {
        const material = object.material;
        const geometry = object.geometry;
        // determine shader attributes
        const shaderAttributes = this._getShaderAttributes(nodeBuilder, geometry);
        // vertex buffers
        const vertexBuffers = [];
        for (const attribute of shaderAttributes) {
            const name = attribute.name;
            const geometryAttribute = geometry.getAttribute(name);
            const stepMode = geometryAttribute !== undefined && geometryAttribute.isInstancedBufferAttribute
                ? constants_1.GPUInputStepMode.Instance
                : constants_1.GPUInputStepMode.Vertex;
            vertexBuffers.push({
                arrayStride: attribute.arrayStride,
                attributes: [{ shaderLocation: attribute.slot, offset: 0, format: attribute.format }],
                stepMode: stepMode,
            });
        }
        this.cacheKey = cacheKey;
        this.shaderAttributes = shaderAttributes;
        this.stageVertex = stageVertex;
        this.stageFragment = stageFragment;
        // blending
        let alphaBlend = {};
        let colorBlend = {};
        if (material.transparent === true && material.blending !== three_1.NoBlending) {
            alphaBlend = this._getAlphaBlend(material);
            colorBlend = this._getColorBlend(material);
        }
        // stencil
        let stencilFront = {};
        if (material.stencilWrite === true) {
            stencilFront = {
                compare: this._getStencilCompare(material),
                failOp: this._getStencilOperation(material.stencilFail),
                depthFailOp: this._getStencilOperation(material.stencilZFail),
                passOp: this._getStencilOperation(material.stencilZPass),
            };
        }
        //
        const primitiveState = this._getPrimitiveState(object, material);
        const colorWriteMask = this._getColorWriteMask(material);
        const depthCompare = this._getDepthCompare(material);
        const colorFormat = this._renderer.getCurrentColorFormat();
        const depthStencilFormat = this._renderer.getCurrentDepthStencilFormat();
        this.pipeline = this._device.createRenderPipeline({
            vertex: Object.assign({}, stageVertex.stage, { buffers: vertexBuffers }),
            fragment: Object.assign({}, stageFragment.stage, {
                targets: [
                    {
                        format: colorFormat,
                        blend: {
                            alpha: alphaBlend,
                            color: colorBlend,
                        },
                        writeMask: colorWriteMask,
                    },
                ],
            }),
            primitive: primitiveState,
            depthStencil: {
                format: depthStencilFormat,
                depthWriteEnabled: material.depthWrite,
                depthCompare: depthCompare,
                stencilFront: stencilFront,
                stencilBack: {},
                stencilReadMask: material.stencilFuncMask,
                stencilWriteMask: material.stencilWriteMask,
            },
            multisample: {
                count: this._sampleCount,
            },
            layout: 'auto',
        });
    }
    _getArrayStride(type, bytesPerElement) {
        // @TODO: This code is GLSL specific. We need to update when we switch to WGSL.
        if (type === 'float' || type === 'int' || type === 'uint')
            return bytesPerElement;
        if (type === 'vec2' || type === 'ivec2' || type === 'uvec2')
            return bytesPerElement * 2;
        if (type === 'vec3' || type === 'ivec3' || type === 'uvec3')
            return bytesPerElement * 3;
        if (type === 'vec4' || type === 'ivec4' || type === 'uvec4')
            return bytesPerElement * 4;
        console.error('THREE.WebGPURenderer: Shader variable type not supported yet.', type);
    }
    _getAlphaBlend(material) {
        const blending = material.blending;
        const premultipliedAlpha = material.premultipliedAlpha;
        let alphaBlend = undefined;
        switch (blending) {
            case three_1.NormalBlending:
                if (premultipliedAlpha === false) {
                    alphaBlend = {
                        srcFactor: constants_1.GPUBlendFactor.One,
                        dstFactor: constants_1.GPUBlendFactor.OneMinusSrcAlpha,
                        operation: constants_1.GPUBlendOperation.Add,
                    };
                }
                break;
            case three_1.AdditiveBlending:
                // no alphaBlend settings
                break;
            case three_1.SubtractiveBlending:
                if (premultipliedAlpha === true) {
                    alphaBlend = {
                        srcFactor: constants_1.GPUBlendFactor.OneMinusSrcColor,
                        dstFactor: constants_1.GPUBlendFactor.OneMinusSrcAlpha,
                        operation: constants_1.GPUBlendOperation.Add,
                    };
                }
                break;
            case three_1.MultiplyBlending:
                if (premultipliedAlpha === true) {
                    alphaBlend = {
                        srcFactor: constants_1.GPUBlendFactor.Zero,
                        dstFactor: constants_1.GPUBlendFactor.SrcAlpha,
                        operation: constants_1.GPUBlendOperation.Add,
                    };
                }
                break;
            case three_1.CustomBlending:
                const blendSrcAlpha = material.blendSrcAlpha;
                const blendDstAlpha = material.blendDstAlpha;
                const blendEquationAlpha = material.blendEquationAlpha;
                if (blendSrcAlpha !== null && blendDstAlpha !== null && blendEquationAlpha !== null) {
                    alphaBlend = {
                        srcFactor: this._getBlendFactor(blendSrcAlpha),
                        dstFactor: this._getBlendFactor(blendDstAlpha),
                        operation: this._getBlendOperation(blendEquationAlpha),
                    };
                }
                break;
            default:
                console.error('THREE.WebGPURenderer: Blending not supported.', blending);
        }
        return alphaBlend;
    }
    _getBlendFactor(blend) {
        let blendFactor;
        switch (blend) {
            case three_1.ZeroFactor:
                blendFactor = constants_1.GPUBlendFactor.Zero;
                break;
            case three_1.OneFactor:
                blendFactor = constants_1.GPUBlendFactor.One;
                break;
            case three_1.SrcColorFactor:
                blendFactor = constants_1.GPUBlendFactor.SrcColor;
                break;
            case three_1.OneMinusSrcColorFactor:
                blendFactor = constants_1.GPUBlendFactor.OneMinusSrcColor;
                break;
            case three_1.SrcAlphaFactor:
                blendFactor = constants_1.GPUBlendFactor.SrcAlpha;
                break;
            case three_1.OneMinusSrcAlphaFactor:
                blendFactor = constants_1.GPUBlendFactor.OneMinusSrcAlpha;
                break;
            case three_1.DstColorFactor:
                blendFactor = constants_1.GPUBlendFactor.DstColor;
                break;
            case three_1.OneMinusDstColorFactor:
                blendFactor = constants_1.GPUBlendFactor.OneMinusDstColor;
                break;
            case three_1.DstAlphaFactor:
                blendFactor = constants_1.GPUBlendFactor.DstAlpha;
                break;
            case three_1.OneMinusDstAlphaFactor:
                blendFactor = constants_1.GPUBlendFactor.OneMinusDstAlpha;
                break;
            case three_1.SrcAlphaSaturateFactor:
                blendFactor = constants_1.GPUBlendFactor.SrcAlphaSaturated;
                break;
            case constants_1.BlendColorFactor:
                blendFactor = constants_1.GPUBlendFactor.BlendColor;
                break;
            case constants_1.OneMinusBlendColorFactor:
                blendFactor = constants_1.GPUBlendFactor.OneMinusBlendColor;
                break;
            default:
                console.error('THREE.WebGPURenderer: Blend factor not supported.', blend);
        }
        return blendFactor;
    }
    _getBlendOperation(blendEquation) {
        let blendOperation;
        switch (blendEquation) {
            case three_1.AddEquation:
                blendOperation = constants_1.GPUBlendOperation.Add;
                break;
            case three_1.SubtractEquation:
                blendOperation = constants_1.GPUBlendOperation.Subtract;
                break;
            case three_1.ReverseSubtractEquation:
                blendOperation = constants_1.GPUBlendOperation.ReverseSubtract;
                break;
            case three_1.MinEquation:
                blendOperation = constants_1.GPUBlendOperation.Min;
                break;
            case three_1.MaxEquation:
                blendOperation = constants_1.GPUBlendOperation.Max;
                break;
            default:
                console.error('THREE.WebGPURenderer: Blend equation not supported.', blendEquation);
        }
        return blendOperation;
    }
    _getColorBlend(material) {
        const blending = material.blending;
        const premultipliedAlpha = material.premultipliedAlpha;
        const colorBlend = {
            srcFactor: null,
            dstFactor: null,
            operation: null,
        };
        switch (blending) {
            case three_1.NormalBlending:
                colorBlend.srcFactor = premultipliedAlpha === true ? constants_1.GPUBlendFactor.One : constants_1.GPUBlendFactor.SrcAlpha;
                colorBlend.dstFactor = constants_1.GPUBlendFactor.OneMinusSrcAlpha;
                colorBlend.operation = constants_1.GPUBlendOperation.Add;
                break;
            case three_1.AdditiveBlending:
                colorBlend.srcFactor = premultipliedAlpha === true ? constants_1.GPUBlendFactor.One : constants_1.GPUBlendFactor.SrcAlpha;
                colorBlend.operation = constants_1.GPUBlendOperation.Add;
                break;
            case three_1.SubtractiveBlending:
                colorBlend.srcFactor = constants_1.GPUBlendFactor.Zero;
                colorBlend.dstFactor = premultipliedAlpha === true ? constants_1.GPUBlendFactor.Zero : constants_1.GPUBlendFactor.OneMinusSrcColor;
                colorBlend.operation = constants_1.GPUBlendOperation.Add;
                break;
            case three_1.MultiplyBlending:
                colorBlend.srcFactor = constants_1.GPUBlendFactor.Zero;
                colorBlend.dstFactor = constants_1.GPUBlendFactor.SrcColor;
                colorBlend.operation = constants_1.GPUBlendOperation.Add;
                break;
            case three_1.CustomBlending:
                colorBlend.srcFactor = this._getBlendFactor(material.blendSrc);
                colorBlend.dstFactor = this._getBlendFactor(material.blendDst);
                colorBlend.operation = this._getBlendOperation(material.blendEquation);
                break;
            default:
                console.error('THREE.WebGPURenderer: Blending not supported.', blending);
        }
        return colorBlend;
    }
    _getColorWriteMask(material) {
        return material.colorWrite === true ? constants_1.GPUColorWriteFlags.All : constants_1.GPUColorWriteFlags.None;
    }
    _getDepthCompare(material) {
        let depthCompare;
        if (material.depthTest === false) {
            depthCompare = constants_1.GPUCompareFunction.Always;
        }
        else {
            const depthFunc = material.depthFunc;
            switch (depthFunc) {
                case three_1.NeverDepth:
                    depthCompare = constants_1.GPUCompareFunction.Never;
                    break;
                case three_1.AlwaysDepth:
                    depthCompare = constants_1.GPUCompareFunction.Always;
                    break;
                case three_1.LessDepth:
                    depthCompare = constants_1.GPUCompareFunction.Less;
                    break;
                case three_1.LessEqualDepth:
                    depthCompare = constants_1.GPUCompareFunction.LessEqual;
                    break;
                case three_1.EqualDepth:
                    depthCompare = constants_1.GPUCompareFunction.Equal;
                    break;
                case three_1.GreaterEqualDepth:
                    depthCompare = constants_1.GPUCompareFunction.GreaterEqual;
                    break;
                case three_1.GreaterDepth:
                    depthCompare = constants_1.GPUCompareFunction.Greater;
                    break;
                case three_1.NotEqualDepth:
                    depthCompare = constants_1.GPUCompareFunction.NotEqual;
                    break;
                default:
                    console.error('THREE.WebGPURenderer: Invalid depth function.', depthFunc);
            }
        }
        return depthCompare;
    }
    _getPrimitiveState(object, material) {
        const descriptor = {};
        descriptor.topology = this._getPrimitiveTopology(object);
        if (object.isLine === true && object.isLineSegments !== true) {
            const geometry = object.geometry;
            const count = geometry.index ? geometry.index.count : geometry.attributes.position.count;
            descriptor.stripIndexFormat = count > 65535 ? constants_1.GPUIndexFormat.Uint32 : constants_1.GPUIndexFormat.Uint16; // define data type for primitive restart value
        }
        switch (material.side) {
            case three_1.FrontSide:
                descriptor.frontFace = constants_1.GPUFrontFace.CW;
                descriptor.cullMode = constants_1.GPUCullMode.Front;
                break;
            case three_1.BackSide:
                descriptor.frontFace = constants_1.GPUFrontFace.CW;
                descriptor.cullMode = constants_1.GPUCullMode.Back;
                break;
            case three_1.DoubleSide:
                descriptor.frontFace = constants_1.GPUFrontFace.CW;
                descriptor.cullMode = constants_1.GPUCullMode.None;
                break;
            default:
                console.error('THREE.WebGPURenderer: Unknown Material.side value.', material.side);
                break;
        }
        return descriptor;
    }
    _getPrimitiveTopology(object) {
        if (object.isMesh)
            return constants_1.GPUPrimitiveTopology.TriangleList;
        else if (object.isPoints)
            return constants_1.GPUPrimitiveTopology.PointList;
        else if (object.isLineSegments)
            return constants_1.GPUPrimitiveTopology.LineList;
        else if (object.isLine)
            return constants_1.GPUPrimitiveTopology.LineStrip;
    }
    _getStencilCompare(material) {
        let stencilCompare;
        const stencilFunc = material.stencilFunc;
        switch (stencilFunc) {
            case three_1.NeverStencilFunc:
                stencilCompare = constants_1.GPUCompareFunction.Never;
                break;
            case three_1.AlwaysStencilFunc:
                stencilCompare = constants_1.GPUCompareFunction.Always;
                break;
            case three_1.LessStencilFunc:
                stencilCompare = constants_1.GPUCompareFunction.Less;
                break;
            case three_1.LessEqualStencilFunc:
                stencilCompare = constants_1.GPUCompareFunction.LessEqual;
                break;
            case three_1.EqualStencilFunc:
                stencilCompare = constants_1.GPUCompareFunction.Equal;
                break;
            case three_1.GreaterEqualStencilFunc:
                stencilCompare = constants_1.GPUCompareFunction.GreaterEqual;
                break;
            case three_1.GreaterStencilFunc:
                stencilCompare = constants_1.GPUCompareFunction.Greater;
                break;
            case three_1.NotEqualStencilFunc:
                stencilCompare = constants_1.GPUCompareFunction.NotEqual;
                break;
            default:
                console.error('THREE.WebGPURenderer: Invalid stencil function.', stencilFunc);
        }
        return stencilCompare;
    }
    _getStencilOperation(op) {
        let stencilOperation;
        switch (op) {
            case three_1.KeepStencilOp:
                stencilOperation = constants_1.GPUStencilOperation.Keep;
                break;
            case three_1.ZeroStencilOp:
                stencilOperation = constants_1.GPUStencilOperation.Zero;
                break;
            case three_1.ReplaceStencilOp:
                stencilOperation = constants_1.GPUStencilOperation.Replace;
                break;
            case three_1.InvertStencilOp:
                stencilOperation = constants_1.GPUStencilOperation.Invert;
                break;
            case three_1.IncrementStencilOp:
                stencilOperation = constants_1.GPUStencilOperation.IncrementClamp;
                break;
            case three_1.DecrementStencilOp:
                stencilOperation = constants_1.GPUStencilOperation.DecrementClamp;
                break;
            case three_1.IncrementWrapStencilOp:
                stencilOperation = constants_1.GPUStencilOperation.IncrementWrap;
                break;
            case three_1.DecrementWrapStencilOp:
                stencilOperation = constants_1.GPUStencilOperation.DecrementWrap;
                break;
            default:
                console.error('THREE.WebGPURenderer: Invalid stencil operation.', stencilOperation);
        }
        return stencilOperation;
    }
    _getVertexFormat(type, bytesPerElement) {
        // float
        if (type === 'float')
            return constants_1.GPUVertexFormat.Float32;
        if (type === 'vec2') {
            if (bytesPerElement === 2) {
                return constants_1.GPUVertexFormat.Float16x2;
            }
            else {
                return constants_1.GPUVertexFormat.Float32x2;
            }
        }
        if (type === 'vec3')
            return constants_1.GPUVertexFormat.Float32x3;
        if (type === 'vec4') {
            if (bytesPerElement === 2) {
                return constants_1.GPUVertexFormat.Float16x4;
            }
            else {
                return constants_1.GPUVertexFormat.Float32x4;
            }
        }
        // int
        if (type === 'int')
            return constants_1.GPUVertexFormat.Sint32;
        if (type === 'ivec2') {
            if (bytesPerElement === 1) {
                return constants_1.GPUVertexFormat.Sint8x2;
            }
            else if (bytesPerElement === 2) {
                return constants_1.GPUVertexFormat.Sint16x2;
            }
            else {
                return constants_1.GPUVertexFormat.Sint32x2;
            }
        }
        if (type === 'ivec3')
            return constants_1.GPUVertexFormat.Sint32x3;
        if (type === 'ivec4') {
            if (bytesPerElement === 1) {
                return constants_1.GPUVertexFormat.Sint8x4;
            }
            else if (bytesPerElement === 2) {
                return constants_1.GPUVertexFormat.Sint16x4;
            }
            else {
                return constants_1.GPUVertexFormat.Sint32x4;
            }
        }
        // uint
        if (type === 'uint')
            return constants_1.GPUVertexFormat.Uint32;
        if (type === 'uvec2') {
            if (bytesPerElement === 1) {
                return constants_1.GPUVertexFormat.Uint8x2;
            }
            else if (bytesPerElement === 2) {
                return constants_1.GPUVertexFormat.Uint16x2;
            }
            else {
                return constants_1.GPUVertexFormat.Uint32x2;
            }
        }
        if (type === 'uvec3')
            return constants_1.GPUVertexFormat.Uint32x3;
        if (type === 'uvec4') {
            if (bytesPerElement === 1) {
                return constants_1.GPUVertexFormat.Uint8x4;
            }
            else if (bytesPerElement === 2) {
                return constants_1.GPUVertexFormat.Uint16x4;
            }
            else {
                return constants_1.GPUVertexFormat.Uint32x4;
            }
        }
        console.error('THREE.WebGPURenderer: Shader variable type not supported yet.', type);
    }
    _getShaderAttributes(nodeBuilder, geometry) {
        const nodeAttributes = nodeBuilder.attributes;
        const attributes = [];
        for (let slot = 0; slot < nodeAttributes.length; slot++) {
            const nodeAttribute = nodeAttributes[slot];
            const name = nodeAttribute.name;
            const type = nodeAttribute.type;
            const geometryAttribute = geometry.getAttribute(name);
            const bytesPerElement = geometryAttribute !== undefined ? geometryAttribute.array.BYTES_PER_ELEMENT : 4;
            const arrayStride = this._getArrayStride(type, bytesPerElement);
            const format = this._getVertexFormat(type, bytesPerElement);
            attributes.push({
                name,
                arrayStride,
                format,
                slot,
            });
        }
        return attributes;
    }
}
exports.default = WebGPURenderPipeline;
