"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BRDF_Lambert_1 = __importDefault(require("./BSDF/BRDF_Lambert"));
const BRDF_GGX_1 = __importDefault(require("./BSDF/BRDF_GGX"));
const DFGApprox_1 = __importDefault(require("./BSDF/DFGApprox"));
const ShaderNodeElements_1 = require("../shadernode/ShaderNodeElements");
// Fdez-Agüera's "Multiple-Scattering Microfacet Model for Real-Time Image Based Lighting"
// Approximates multiscattering in order to preserve energy.
// http://www.jcgt.org/published/0008/01/03/
const computeMultiscattering = (singleScatter, multiScatter, specularF90 = 1) => {
    const fab = DFGApprox_1.default.call({ roughness: ShaderNodeElements_1.roughness });
    const FssEss = ShaderNodeElements_1.add(ShaderNodeElements_1.mul(ShaderNodeElements_1.specularColor, fab.x), ShaderNodeElements_1.mul(specularF90, fab.y));
    const Ess = ShaderNodeElements_1.add(fab.x, fab.y);
    const Ems = ShaderNodeElements_1.sub(1.0, Ess);
    const Favg = ShaderNodeElements_1.add(ShaderNodeElements_1.specularColor, ShaderNodeElements_1.mul(ShaderNodeElements_1.sub(1.0, ShaderNodeElements_1.specularColor), 0.047619)); // 1/21
    const Fms = ShaderNodeElements_1.div(ShaderNodeElements_1.mul(FssEss, Favg), ShaderNodeElements_1.sub(1.0, ShaderNodeElements_1.mul(Ems, Favg)));
    singleScatter.add(FssEss);
    multiScatter.add(ShaderNodeElements_1.mul(Fms, Ems));
};
const RE_IndirectSpecular_Physical = new ShaderNodeElements_1.ShaderNode((inputs) => {
    const { radiance, iblIrradiance, reflectedLight } = inputs;
    // Both indirect specular and indirect diffuse light accumulate here
    const singleScattering = ShaderNodeElements_1.temp(ShaderNodeElements_1.vec3());
    const multiScattering = ShaderNodeElements_1.temp(ShaderNodeElements_1.vec3());
    const cosineWeightedIrradiance = ShaderNodeElements_1.mul(iblIrradiance, 1 / Math.PI);
    computeMultiscattering(singleScattering, multiScattering);
    const diffuse = ShaderNodeElements_1.mul(ShaderNodeElements_1.diffuseColor, ShaderNodeElements_1.sub(1.0, ShaderNodeElements_1.add(singleScattering, multiScattering)));
    reflectedLight.indirectSpecular.add(ShaderNodeElements_1.mul(radiance, singleScattering));
    reflectedLight.indirectSpecular.add(ShaderNodeElements_1.mul(multiScattering, cosineWeightedIrradiance));
    reflectedLight.indirectDiffuse.add(ShaderNodeElements_1.mul(diffuse, cosineWeightedIrradiance));
});
const RE_IndirectDiffuse_Physical = new ShaderNodeElements_1.ShaderNode((inputs) => {
    const { irradiance, reflectedLight } = inputs;
    reflectedLight.indirectDiffuse.add(ShaderNodeElements_1.mul(irradiance, BRDF_Lambert_1.default.call({ diffuseColor: ShaderNodeElements_1.diffuseColor })));
});
const RE_Direct_Physical = new ShaderNodeElements_1.ShaderNode((inputs) => {
    const { lightDirection, lightColor, reflectedLight } = inputs;
    const dotNL = ShaderNodeElements_1.saturate(ShaderNodeElements_1.dot(ShaderNodeElements_1.transformedNormalView, lightDirection));
    const irradiance = ShaderNodeElements_1.mul(dotNL, lightColor);
    reflectedLight.directDiffuse.add(ShaderNodeElements_1.mul(irradiance, BRDF_Lambert_1.default.call({ diffuseColor: ShaderNodeElements_1.diffuseColor.rgb })));
    reflectedLight.directSpecular.add(ShaderNodeElements_1.mul(irradiance, BRDF_GGX_1.default.call({ lightDirection, f0: ShaderNodeElements_1.specularColor, f90: 1, roughness: ShaderNodeElements_1.roughness })));
});
const RE_AmbientOcclusion_Physical = new ShaderNodeElements_1.ShaderNode(({ ambientOcclusion, reflectedLight }) => {
    const aoNV = ShaderNodeElements_1.add(ShaderNodeElements_1.dotNV, ambientOcclusion);
    const aoExp = ShaderNodeElements_1.exp2(ShaderNodeElements_1.sub(ShaderNodeElements_1.mul(-16.0, ShaderNodeElements_1.roughness), 1.0));
    const aoNode = ShaderNodeElements_1.saturate(ShaderNodeElements_1.add(ShaderNodeElements_1.sub(ShaderNodeElements_1.pow(aoNV, aoExp), 1.0), ambientOcclusion));
    reflectedLight.indirectDiffuse.mul(ambientOcclusion);
    reflectedLight.indirectSpecular.mul(aoNode);
});
const PhysicalLightingModel = {
    direct: RE_Direct_Physical,
    indirectDiffuse: RE_IndirectDiffuse_Physical,
    indirectSpecular: RE_IndirectSpecular_Physical,
    ambientOcclusion: RE_AmbientOcclusion_Physical,
};
exports.default = PhysicalLightingModel;
