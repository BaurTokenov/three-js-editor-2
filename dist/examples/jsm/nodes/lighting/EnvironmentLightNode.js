"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LightingNode_1 = __importDefault(require("./LightingNode"));
const ContextNode_1 = __importDefault(require("../core/ContextNode"));
const MaxMipLevelNode_1 = __importDefault(require("../utils/MaxMipLevelNode"));
//import ReflectNode from '../accessors/ReflectNode';
const ShaderNodeElements_1 = require("../shadernode/ShaderNodeElements");
// taken from here: http://casual-effects.blogspot.ca/2011/08/plausible-environment-lighting-in-two.html
const getSpecularMIPLevel = new ShaderNodeElements_1.ShaderNode(({ texture, levelNode }) => {
    const maxMIPLevelScalar = new MaxMipLevelNode_1.default(texture);
    const sigma = ShaderNodeElements_1.div(ShaderNodeElements_1.mul(Math.PI, ShaderNodeElements_1.mul(levelNode, levelNode)), ShaderNodeElements_1.add(1.0, levelNode));
    const desiredMIPLevel = ShaderNodeElements_1.add(maxMIPLevelScalar, ShaderNodeElements_1.log2(sigma));
    return ShaderNodeElements_1.clamp(desiredMIPLevel, 0.0, maxMIPLevelScalar);
});
/*
const getMaxMIPLevel = new ShaderNode( ( { texture } ) => {

    return new MaxMipLevelNode( texture );

} );
*/
class EnvironmentLightNode extends LightingNode_1.default {
    constructor(envNode = null) {
        super();
        this.envNode = envNode;
    }
    generate(builder) {
        const envNode = this.envNode;
        const flipNormalWorld = ShaderNodeElements_1.vec3(ShaderNodeElements_1.negate(ShaderNodeElements_1.transformedNormalWorld.x), ShaderNodeElements_1.transformedNormalWorld.yz);
        let reflectVec = ShaderNodeElements_1.reflect(ShaderNodeElements_1.negate(ShaderNodeElements_1.positionViewDirection), ShaderNodeElements_1.transformedNormalView);
        reflectVec = ShaderNodeElements_1.normalize(ShaderNodeElements_1.mix(reflectVec, ShaderNodeElements_1.transformedNormalView, ShaderNodeElements_1.mul(ShaderNodeElements_1.roughness, ShaderNodeElements_1.roughness)));
        reflectVec = ShaderNodeElements_1.transformDirection(reflectVec, ShaderNodeElements_1.cameraViewMatrix);
        reflectVec = ShaderNodeElements_1.vec3(ShaderNodeElements_1.negate(reflectVec.x), reflectVec.yz);
        //reflectVec = normalize( mix( new ReflectNode(), flipNormalWorld, mul( roughness, roughness ) ) );
        const radianceContext = new ContextNode_1.default(envNode, {
            tempRead: false,
            uvNode: reflectVec,
            levelNode: ShaderNodeElements_1.roughness,
            levelShaderNode: getSpecularMIPLevel,
        });
        const irradianceContext = new ContextNode_1.default(envNode, {
            tempRead: false,
            uvNode: flipNormalWorld,
            levelNode: ShaderNodeElements_1.float(1),
            levelShaderNode: getSpecularMIPLevel,
        });
        builder.context.radiance.add(radianceContext);
        builder.context.iblIrradiance.add(ShaderNodeElements_1.mul(Math.PI, irradianceContext));
    }
}
exports.default = EnvironmentLightNode;
