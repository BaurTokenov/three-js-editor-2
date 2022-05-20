"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NodeMaterial_1 = __importDefault(require("./NodeMaterial"));
const ShaderNodeElements_1 = require("../shadernode/ShaderNodeElements");
const LightsNode_1 = __importDefault(require("../lighting/LightsNode"));
const EnvironmentLightNode_1 = __importDefault(require("../lighting/EnvironmentLightNode"));
const AONode_1 = __importDefault(require("../lighting/AONode"));
const getRoughness_1 = __importDefault(require("../functions/material/getRoughness"));
const PhysicalLightingModel_1 = __importDefault(require("../functions/PhysicalLightingModel"));
const NormalMapNode_1 = __importDefault(require("../display/NormalMapNode"));
const three_1 = require("three");
const defaultValues = new three_1.MeshStandardMaterial();
class MeshStandardNodeMaterial extends NodeMaterial_1.default {
    constructor(parameters) {
        super();
        this.colorNode = null;
        this.opacityNode = null;
        this.alphaTestNode = null;
        this.normalNode = null;
        this.emissiveNode = null;
        this.metalnessNode = null;
        this.roughnessNode = null;
        this.clearcoatNode = null;
        this.clearcoatRoughnessNode = null;
        this.envNode = null;
        this.lightsNode = null;
        this.positionNode = null;
        this.setDefaultValues(defaultValues);
        this.setValues(parameters);
    }
    build(builder) {
        let { colorNode, diffuseColorNode } = this.generateMain(builder);
        const envNode = this.envNode || builder.scene.environmentNode;
        diffuseColorNode = this.generateStandardMaterial(builder, { colorNode, diffuseColorNode });
        if (this.lightsNode)
            builder.lightsNode = this.lightsNode;
        let materialLightsNode = [];
        if (envNode) {
            materialLightsNode.push(new EnvironmentLightNode_1.default(envNode));
        }
        if (builder.material.aoMap) {
            materialLightsNode.push(new AONode_1.default(ShaderNodeElements_1.texture(builder.material.aoMap)));
        }
        if (materialLightsNode.length > 0) {
            builder.lightsNode = new LightsNode_1.default([...builder.lightsNode.lightNodes, ...materialLightsNode]);
        }
        const outgoingLightNode = this.generateLight(builder, {
            diffuseColorNode,
            lightingModelNode: PhysicalLightingModel_1.default,
        });
        this.generateOutput(builder, { diffuseColorNode, outgoingLightNode });
    }
    generateStandardMaterial(builder, { colorNode, diffuseColorNode }) {
        const { material } = builder;
        // METALNESS
        let metalnessNode = this.metalnessNode ? ShaderNodeElements_1.float(this.metalnessNode) : ShaderNodeElements_1.materialMetalness;
        metalnessNode = builder.addFlow('fragment', ShaderNodeElements_1.label(metalnessNode, 'Metalness'));
        builder.addFlow('fragment', ShaderNodeElements_1.assign(diffuseColorNode, ShaderNodeElements_1.vec4(ShaderNodeElements_1.mul(diffuseColorNode.rgb, ShaderNodeElements_1.invert(metalnessNode)), diffuseColorNode.a)));
        // ROUGHNESS
        let roughnessNode = this.roughnessNode ? ShaderNodeElements_1.float(this.roughnessNode) : ShaderNodeElements_1.materialRoughness;
        roughnessNode = getRoughness_1.default.call({ roughness: roughnessNode });
        builder.addFlow('fragment', ShaderNodeElements_1.label(roughnessNode, 'Roughness'));
        // SPECULAR COLOR
        const specularColorNode = ShaderNodeElements_1.mix(ShaderNodeElements_1.vec3(0.04), colorNode.rgb, metalnessNode);
        builder.addFlow('fragment', ShaderNodeElements_1.label(specularColorNode, 'SpecularColor'));
        // NORMAL VIEW
        const normalNode = this.normalNode
            ? ShaderNodeElements_1.vec3(this.normalNode)
            : material.normalMap
                ? new NormalMapNode_1.default(ShaderNodeElements_1.texture(material.normalMap), ShaderNodeElements_1.uniform(material.normalScale))
                : ShaderNodeElements_1.normalView;
        builder.addFlow('fragment', ShaderNodeElements_1.label(normalNode, 'TransformedNormalView'));
        return diffuseColorNode;
    }
    generateLight(builder, { diffuseColorNode, lightingModelNode, lightsNode = builder.lightsNode }) {
        const renderer = builder.renderer;
        // OUTGOING LIGHT
        let outgoingLightNode = super.generateLight(builder, { diffuseColorNode, lightingModelNode, lightsNode });
        // EMISSIVE
        outgoingLightNode = ShaderNodeElements_1.add(ShaderNodeElements_1.vec3(this.emissiveNode || ShaderNodeElements_1.materialEmissive), outgoingLightNode);
        // TONE MAPPING
        if (renderer.toneMappingNode)
            outgoingLightNode = ShaderNodeElements_1.context(renderer.toneMappingNode, { color: outgoingLightNode });
        return outgoingLightNode;
    }
    copy(source) {
        this.colorNode = source.colorNode;
        this.opacityNode = source.opacityNode;
        this.alphaTestNode = source.alphaTestNode;
        this.normalNode = source.normalNode;
        this.emissiveNode = source.emissiveNode;
        this.metalnessNode = source.metalnessNode;
        this.roughnessNode = source.roughnessNode;
        this.clearcoatNode = source.clearcoatNode;
        this.clearcoatRoughnessNode = source.clearcoatRoughnessNode;
        this.envNode = source.envNode;
        this.lightsNode = source.lightsNode;
        this.positionNode = source.positionNode;
        return super.copy(source);
    }
}
exports.default = MeshStandardNodeMaterial;
MeshStandardNodeMaterial.prototype.isMeshStandardNodeMaterial = true;
