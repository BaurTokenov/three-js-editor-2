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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebGLNodeBuilder = void 0;
const NodeBuilder_1 = __importStar(require("three-nodes/core/NodeBuilder"));
const NodeFrame_1 = __importDefault(require("three-nodes/core/NodeFrame"));
const SlotNode_1 = __importDefault(require("./SlotNode"));
const GLSLNodeParser_1 = __importDefault(require("three-nodes/parsers/GLSLNodeParser"));
const WebGLPhysicalContextNode_1 = __importDefault(require("./WebGLPhysicalContextNode"));
const three_1 = require("three");
const nodeFrame = new NodeFrame_1.default();
nodeFrame.camera = new three_1.PerspectiveCamera();
const nodeShaderLib = {
    LineBasicNodeMaterial: three_1.ShaderLib.basic,
    MeshBasicNodeMaterial: three_1.ShaderLib.basic,
    PointsNodeMaterial: three_1.ShaderLib.points,
    MeshStandardNodeMaterial: three_1.ShaderLib.standard,
};
function getIncludeSnippet(name) {
    return `#include <${name}>`;
}
function getShaderStageProperty(shaderStage) {
    return `${shaderStage}Shader`;
}
class WebGLNodeBuilder extends NodeBuilder_1.default {
    constructor(object, renderer, shader) {
        super(object, renderer, new GLSLNodeParser_1.default());
        this.shader = shader;
        this.slots = { vertex: [], fragment: [] };
        this._parseObject();
    }
    addSlot(shaderStage, slotNode) {
        this.slots[shaderStage].push(slotNode);
        return this.addFlow(shaderStage, slotNode);
    }
    addFlowCode(code) {
        if (!/;\s*$/.test(code)) {
            code += ';';
        }
        super.addFlowCode(code + '\n\t');
    }
    _parseObject() {
        const material = this.material;
        let type = material.type;
        // shader lib
        if (material.isMeshStandardNodeMaterial)
            type = 'MeshStandardNodeMaterial';
        else if (material.isMeshBasicNodeMaterial)
            type = 'MeshBasicNodeMaterial';
        else if (material.isPointsNodeMaterial)
            type = 'PointsNodeMaterial';
        else if (material.isLineBasicNodeMaterial)
            type = 'LineBasicNodeMaterial';
        if (nodeShaderLib[type] !== undefined) {
            const shaderLib = nodeShaderLib[type];
            const shader = this.shader;
            shader.vertexShader = shaderLib.vertexShader;
            shader.fragmentShader = shaderLib.fragmentShader;
            shader.uniforms = three_1.UniformsUtils.merge([shaderLib.uniforms, three_1.UniformsLib.lights]);
        }
        if (material.isMeshStandardNodeMaterial !== true) {
            this.replaceCode('fragment', getIncludeSnippet('tonemapping_fragment'), '');
        }
        // parse inputs
        if (material.colorNode && material.colorNode.isNode) {
            this.addSlot('fragment', new SlotNode_1.default(material.colorNode, 'COLOR', 'vec4'));
        }
        if (material.opacityNode && material.opacityNode.isNode) {
            this.addSlot('fragment', new SlotNode_1.default(material.opacityNode, 'OPACITY', 'float'));
        }
        if (material.normalNode && material.normalNode.isNode) {
            this.addSlot('fragment', new SlotNode_1.default(material.normalNode, 'NORMAL', 'vec3'));
        }
        if (material.emissiveNode && material.emissiveNode.isNode) {
            this.addSlot('fragment', new SlotNode_1.default(material.emissiveNode, 'EMISSIVE', 'vec3'));
        }
        if (material.metalnessNode && material.metalnessNode.isNode) {
            this.addSlot('fragment', new SlotNode_1.default(material.metalnessNode, 'METALNESS', 'float'));
        }
        if (material.roughnessNode && material.roughnessNode.isNode) {
            this.addSlot('fragment', new SlotNode_1.default(material.roughnessNode, 'ROUGHNESS', 'float'));
        }
        if (material.clearcoatNode && material.clearcoatNode.isNode) {
            this.addSlot('fragment', new SlotNode_1.default(material.clearcoatNode, 'CLEARCOAT', 'float'));
        }
        if (material.clearcoatRoughnessNode && material.clearcoatRoughnessNode.isNode) {
            this.addSlot('fragment', new SlotNode_1.default(material.clearcoatRoughnessNode, 'CLEARCOAT_ROUGHNESS', 'float'));
        }
        if (material.envNode && material.envNode.isNode) {
            const envRadianceNode = new WebGLPhysicalContextNode_1.default(WebGLPhysicalContextNode_1.default.RADIANCE, material.envNode);
            const envIrradianceNode = new WebGLPhysicalContextNode_1.default(WebGLPhysicalContextNode_1.default.IRRADIANCE, material.envNode);
            this.addSlot('fragment', new SlotNode_1.default(envRadianceNode, 'RADIANCE', 'vec3'));
            this.addSlot('fragment', new SlotNode_1.default(envIrradianceNode, 'IRRADIANCE', 'vec3'));
        }
        if (material.positionNode && material.positionNode.isNode) {
            this.addSlot('vertex', new SlotNode_1.default(material.positionNode, 'POSITION', 'vec3'));
        }
        if (material.sizeNode && material.sizeNode.isNode) {
            this.addSlot('vertex', new SlotNode_1.default(material.sizeNode, 'SIZE', 'float'));
        }
    }
    getTexture(textureProperty, uvSnippet) {
        return `texture2D( ${textureProperty}, ${uvSnippet} )`;
    }
    getTextureBias(textureProperty, uvSnippet, biasSnippet) {
        if (this.material.extensions !== undefined)
            this.material.extensions.shaderTextureLOD = true;
        return `textureLod( ${textureProperty}, ${uvSnippet}, ${biasSnippet} )`;
    }
    getCubeTexture(textureProperty, uvSnippet) {
        return `textureCube( ${textureProperty}, ${uvSnippet} )`;
    }
    getCubeTextureBias(textureProperty, uvSnippet, biasSnippet) {
        if (this.material.extensions !== undefined)
            this.material.extensions.shaderTextureLOD = true;
        return `textureLod( ${textureProperty}, ${uvSnippet}, ${biasSnippet} )`;
    }
    getUniforms(shaderStage) {
        const uniforms = this.uniforms[shaderStage];
        let snippet = '';
        for (const uniform of uniforms) {
            if (uniform.type === 'texture') {
                snippet += `uniform sampler2D ${uniform.name}; `;
            }
            else if (uniform.type === 'cubeTexture') {
                snippet += `uniform samplerCube ${uniform.name}; `;
            }
            else {
                const vectorType = this.getVectorType(uniform.type);
                snippet += `uniform ${vectorType} ${uniform.name}; `;
            }
        }
        return snippet;
    }
    getAttributes(shaderStage) {
        let snippet = '';
        if (shaderStage === 'vertex') {
            const attributes = this.attributes;
            for (let index = 0; index < attributes.length; index++) {
                const attribute = attributes[index];
                // ignore common attributes to prevent redefinitions
                if (attribute.name === 'uv' || attribute.name === 'position' || attribute.name === 'normal')
                    continue;
                snippet += `attribute ${attribute.type} ${attribute.name}; `;
            }
        }
        return snippet;
    }
    getVarys( /* shaderStage */) {
        let snippet = '';
        const varys = this.varys;
        for (let index = 0; index < varys.length; index++) {
            const vary = varys[index];
            snippet += `varying ${vary.type} ${vary.name}; `;
        }
        return snippet;
    }
    addCodeAfterSnippet(shaderStage, snippet, code) {
        const shaderProperty = getShaderStageProperty(shaderStage);
        let source = this[shaderProperty];
        const index = source.indexOf(snippet);
        if (index !== -1) {
            const start = source.substring(0, index + snippet.length);
            const end = source.substring(index + snippet.length);
            source = `${start}\n${code}\n${end}`;
        }
        this[shaderProperty] = source;
    }
    addCodeAfterInclude(shaderStage, includeName, code) {
        const includeSnippet = getIncludeSnippet(includeName);
        this.addCodeAfterSnippet(shaderStage, includeSnippet, code);
    }
    replaceCode(shaderStage, source, target) {
        const shaderProperty = getShaderStageProperty(shaderStage);
        this.shader[shaderProperty] = this.shader[shaderProperty].replaceAll(source, target);
    }
    parseInclude(shaderStage, ...includes) {
        for (const name of includes) {
            const includeSnippet = getIncludeSnippet(name);
            const code = three_1.ShaderChunk[name];
            this.replaceCode(shaderStage, includeSnippet, code);
        }
    }
    getTextureEncodingFromMap(map) {
        const isWebGL2 = this.renderer.capabilities.isWebGL2;
        if (isWebGL2 &&
            map &&
            map.isTexture &&
            map.format === three_1.RGBAFormat &&
            map.type === three_1.UnsignedByteType &&
            map.encoding === three_1.sRGBEncoding) {
            return three_1.LinearEncoding; // disable inline decode for sRGB textures in WebGL 2
        }
        return super.getTextureEncodingFromMap(map);
    }
    getFrontFacing() {
        return 'gl_FrontFacing';
    }
    buildCode() {
        const shaderData = {};
        for (const shaderStage of NodeBuilder_1.defaultShaderStages) {
            const uniforms = this.getUniforms(shaderStage);
            const attributes = this.getAttributes(shaderStage);
            const varys = this.getVarys(shaderStage);
            const vars = this.getVars(shaderStage);
            const codes = this.getCodes(shaderStage);
            shaderData[shaderStage] = `${this.getSignature()}
// <node_builder>

// uniforms
${uniforms}

// attributes
${attributes}

// varys
${varys}

// vars
${vars}

// codes
${codes}

// </node_builder>

${this.shader[getShaderStageProperty(shaderStage)]}
`;
        }
        this.vertexShader = shaderData.vertex;
        this.fragmentShader = shaderData.fragment;
    }
    build() {
        super.build();
        this._addSnippets();
        this._addUniforms();
        this._updateUniforms();
        this.shader.vertexShader = this.vertexShader;
        this.shader.fragmentShader = this.fragmentShader;
        return this;
    }
    getSlot(shaderStage, name) {
        const slots = this.slots[shaderStage];
        for (const node of slots) {
            if (node.name === name) {
                return this.getFlowData(shaderStage, node);
            }
        }
    }
    _addSnippets() {
        this.parseInclude('fragment', 'lights_physical_fragment');
        const colorSlot = this.getSlot('fragment', 'COLOR');
        const opacityNode = this.getSlot('fragment', 'OPACITY');
        const normalSlot = this.getSlot('fragment', 'NORMAL');
        const emissiveNode = this.getSlot('fragment', 'EMISSIVE');
        const roughnessNode = this.getSlot('fragment', 'ROUGHNESS');
        const metalnessNode = this.getSlot('fragment', 'METALNESS');
        const clearcoatNode = this.getSlot('fragment', 'CLEARCOAT');
        const clearcoatRoughnessNode = this.getSlot('fragment', 'CLEARCOAT_ROUGHNESS');
        const positionNode = this.getSlot('vertex', 'POSITION');
        const sizeNode = this.getSlot('vertex', 'SIZE');
        if (colorSlot !== undefined) {
            this.addCodeAfterInclude('fragment', 'color_fragment', `${colorSlot.code}\n\tdiffuseColor = ${colorSlot.result};`);
        }
        if (opacityNode !== undefined) {
            this.addCodeAfterInclude('fragment', 'alphatest_fragment', `${opacityNode.code}\n\tdiffuseColor.a = ${opacityNode.result};`);
        }
        if (normalSlot !== undefined) {
            this.addCodeAfterInclude('fragment', 'normal_fragment_begin', `${normalSlot.code}\n\tnormal = ${normalSlot.result};`);
        }
        if (emissiveNode !== undefined) {
            this.addCodeAfterInclude('fragment', 'emissivemap_fragment', `${emissiveNode.code}\n\ttotalEmissiveRadiance = ${emissiveNode.result};`);
        }
        if (roughnessNode !== undefined) {
            this.addCodeAfterInclude('fragment', 'roughnessmap_fragment', `${roughnessNode.code}\n\troughnessFactor = ${roughnessNode.result};`);
        }
        if (metalnessNode !== undefined) {
            this.addCodeAfterInclude('fragment', 'metalnessmap_fragment', `${metalnessNode.code}\n\tmetalnessFactor = ${metalnessNode.result};`);
        }
        if (clearcoatNode !== undefined) {
            this.addCodeAfterSnippet('fragment', 'material.clearcoatRoughness = clearcoatRoughness;', `${clearcoatNode.code}\n\tmaterial.clearcoat = ${clearcoatNode.result};`);
        }
        if (clearcoatRoughnessNode !== undefined) {
            this.addCodeAfterSnippet('fragment', 'material.clearcoatRoughness = clearcoatRoughness;', `${clearcoatRoughnessNode.code}\n\tmaterial.clearcoatRoughness = ${clearcoatRoughnessNode.result};`);
        }
        if (positionNode !== undefined) {
            this.addCodeAfterInclude('vertex', 'begin_vertex', `${positionNode.code}\n\ttransformed = ${positionNode.result};`);
        }
        if (sizeNode !== undefined) {
            this.addCodeAfterSnippet('vertex', 'gl_PointSize = size;', `${sizeNode.code}\n\tgl_PointSize = ${sizeNode.result};`);
        }
        for (const shaderStage of NodeBuilder_1.defaultShaderStages) {
            this.addCodeAfterSnippet(shaderStage, 'main() {', this.flowCode[shaderStage]);
        }
    }
    _addUniforms() {
        for (const shaderStage of NodeBuilder_1.defaultShaderStages) {
            // uniforms
            for (const uniform of this.uniforms[shaderStage]) {
                this.shader.uniforms[uniform.name] = uniform;
            }
        }
    }
    _updateUniforms() {
        nodeFrame.object = this.object;
        nodeFrame.renderer = this.renderer;
        for (const node of this.updateNodes) {
            nodeFrame.updateNode(node);
        }
    }
}
exports.WebGLNodeBuilder = WebGLNodeBuilder;
