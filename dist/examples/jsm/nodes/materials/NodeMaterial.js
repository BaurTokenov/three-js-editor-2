"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const three_1 = require("three");
const NodeUtils_1 = require("../core/NodeUtils");
const ExpressionNode_1 = __importDefault(require("../core/ExpressionNode"));
const ShaderNodeElements_1 = require("../shadernode/ShaderNodeElements");
class NodeMaterial extends three_1.ShaderMaterial {
    constructor() {
        super();
        this.type = this.constructor.name;
        this.lights = true;
    }
    build(builder) {
        const { lightsNode } = this;
        const { diffuseColorNode } = this.generateMain(builder);
        const outgoingLightNode = this.generateLight(builder, { diffuseColorNode, lightsNode });
        this.generateOutput(builder, { diffuseColorNode, outgoingLightNode });
    }
    generateMain(builder) {
        var _a;
        const object = builder.object;
        // < VERTEX STAGE >
        let vertex = ShaderNodeElements_1.positionLocal;
        if (this.positionNode !== null) {
            vertex = ShaderNodeElements_1.bypass(vertex, ShaderNodeElements_1.assign(ShaderNodeElements_1.positionLocal, this.positionNode));
        }
        if (((_a = object.instanceMatrix) === null || _a === void 0 ? void 0 : _a.isInstancedBufferAttribute) === true && builder.isAvailable('instance') === true) {
            vertex = ShaderNodeElements_1.bypass(vertex, ShaderNodeElements_1.instance(object));
        }
        if (object.isSkinnedMesh === true) {
            vertex = ShaderNodeElements_1.bypass(vertex, ShaderNodeElements_1.skinning(object));
        }
        builder.context.vertex = vertex;
        builder.addFlow('vertex', ShaderNodeElements_1.modelViewProjection());
        // < FRAGMENT STAGE >
        let colorNode = ShaderNodeElements_1.vec4(this.colorNode || ShaderNodeElements_1.materialColor);
        let opacityNode = this.opacityNode ? ShaderNodeElements_1.float(this.opacityNode) : ShaderNodeElements_1.materialOpacity;
        // COLOR
        colorNode = builder.addFlow('fragment', ShaderNodeElements_1.label(colorNode, 'Color'));
        const diffuseColorNode = builder.addFlow('fragment', ShaderNodeElements_1.label(colorNode, 'DiffuseColor'));
        // OPACITY
        opacityNode = builder.addFlow('fragment', ShaderNodeElements_1.label(opacityNode, 'OPACITY'));
        builder.addFlow('fragment', ShaderNodeElements_1.assign(diffuseColorNode.a, ShaderNodeElements_1.mul(diffuseColorNode.a, opacityNode)));
        // ALPHA TEST
        if (this.alphaTestNode || this.alphaTest > 0) {
            const alphaTestNode = this.alphaTestNode ? ShaderNodeElements_1.float(this.alphaTestNode) : ShaderNodeElements_1.materialAlphaTest;
            builder.addFlow('fragment', ShaderNodeElements_1.label(alphaTestNode, 'AlphaTest'));
            // @TODO: remove ExpressionNode here and then possibly remove it completely
            builder.addFlow('fragment', new ExpressionNode_1.default('if ( DiffuseColor.a <= AlphaTest ) { discard; }'));
        }
        return { colorNode, diffuseColorNode };
    }
    generateLight(builder, { diffuseColorNode, lightingModelNode, lightsNode = builder.lightsNode }) {
        // < ANALYTIC LIGHTS >
        // OUTGOING LIGHT
        let outgoingLightNode = diffuseColorNode.xyz;
        if (lightsNode && lightsNode.hasLight !== false)
            outgoingLightNode = builder.addFlow('fragment', ShaderNodeElements_1.label(ShaderNodeElements_1.lightingContext(lightsNode, lightingModelNode), 'Light'));
        return outgoingLightNode;
    }
    generateOutput(builder, { diffuseColorNode, outgoingLightNode }) {
        // OUTPUT
        let outputNode = ShaderNodeElements_1.vec4(outgoingLightNode, diffuseColorNode.a);
        // ENCODING
        outputNode = ShaderNodeElements_1.colorSpace(outputNode, builder.renderer.outputEncoding);
        // FOG
        if (builder.fogNode)
            outputNode = builder.fogNode.mix(outputNode);
        // RESULT
        builder.addFlow('fragment', ShaderNodeElements_1.label(outputNode, 'Output'));
        return outputNode;
    }
    setDefaultValues(values) {
        // This approach is to reuse the native refreshUniforms*
        // and turn available the use of features like transmission and environment in core
        var _a;
        for (const property in values) {
            const value = values[property];
            if (this[property] === undefined) {
                this[property] = ((_a = value === null || value === void 0 ? void 0 : value.clone) === null || _a === void 0 ? void 0 : _a.call(value)) || value;
            }
        }
        Object.assign(this.defines, values.defines);
    }
    toJSON(meta) {
        const isRoot = meta === undefined || typeof meta === 'string';
        if (isRoot) {
            meta = {
                textures: {},
                images: {},
                nodes: {},
            };
        }
        const data = three_1.Material.prototype.toJSON.call(this, meta);
        const nodeKeys = NodeUtils_1.getNodesKeys(this);
        data.inputNodes = {};
        for (const name of nodeKeys) {
            data.inputNodes[name] = this[name].toJSON(meta).uuid;
        }
        // TODO: Copied from Object3D.toJSON
        function extractFromCache(cache) {
            const values = [];
            for (const key in cache) {
                const data = cache[key];
                delete data.metadata;
                values.push(data);
            }
            return values;
        }
        if (isRoot) {
            const textures = extractFromCache(meta.textures);
            const images = extractFromCache(meta.images);
            const nodes = extractFromCache(meta.nodes);
            if (textures.length > 0)
                data.textures = textures;
            if (images.length > 0)
                data.images = images;
            if (nodes.length > 0)
                data.nodes = nodes;
        }
        return data;
    }
    static fromMaterial( /*material*/) { }
}
NodeMaterial.prototype.isNodeMaterial = true;
exports.default = NodeMaterial;
