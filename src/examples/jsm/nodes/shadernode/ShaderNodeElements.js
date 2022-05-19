// accessors
import CubeTextureNode from '../accessors/CubeTextureNode';
import InstanceNode from '../accessors/InstanceNode';
import ReflectNode from '../accessors/ReflectNode';
import SkinningNode from '../accessors/SkinningNode';

// display
import ColorSpaceNode from '../display/ColorSpaceNode';
import NormalMapNode from '../display/NormalMapNode';
import ToneMappingNode from '../display/ToneMappingNode';

// lighting
import LightsNode from '../lighting/LightsNode';
//import LightingNode from '../lighting/LightingNode';
import LightingContextNode from '../lighting/LightingContextNode';

// utils
import MatcapUVNode from '../utils/MatcapUVNode';
import MaxMipLevelNode from '../utils/MaxMipLevelNode';
import OscNode from '../utils/OscNode';
import SpriteSheetUVNode from '../utils/SpriteSheetUVNode';
import TimerNode from '../utils/TimerNode';

// procedural
import CheckerNode from '../procedural/CheckerNode';

// fog
import FogNode from '../fog/FogNode';
import FogRangeNode from '../fog/FogRangeNode';

// shader node utils
import { nodeObject, nodeProxy, nodeImmutable } from './ShaderNode';

//
// Node Material Shader Syntax
//

// shader node base

export * from './ShaderNodeBaseElements';

// functions

export { default as BRDF_GGX } from '../functions/BSDF/BRDF_GGX'; // see https://github.com/tc39/proposal-export-default-from
export { default as BRDF_Lambert } from '../functions/BSDF/BRDF_Lambert';
export { default as D_GGX } from '../functions/BSDF/D_GGX';
export { default as DFGApprox } from '../functions/BSDF/DFGApprox';
export { default as F_Schlick } from '../functions/BSDF/F_Schlick';
export { default as V_GGX_SmithCorrelated } from '../functions/BSDF/V_GGX_SmithCorrelated';

export { default as getDistanceAttenuation } from '../functions/light/getDistanceAttenuation';

export { default as getGeometryRoughness } from '../functions/material/getGeometryRoughness';
export { default as getRoughness } from '../functions/material/getRoughness';

export { default as PhysicalLightingModel } from '../functions/PhysicalLightingModel';

// accessors

export const cubeTexture = nodeProxy(CubeTextureNode);

export const instance = nodeProxy(InstanceNode);

export const reflectVector = nodeImmutable(ReflectNode, ReflectNode.VECTOR);
export const reflectCube = nodeImmutable(ReflectNode, ReflectNode.CUBE);

export const skinning = nodeProxy(SkinningNode);

// display

export const colorSpace = (node, encoding) =>
  nodeObject(new ColorSpaceNode(null, nodeObject(node)).fromEncoding(encoding));
export const normalMap = nodeProxy(NormalMapNode);
export const toneMapping = (mapping, exposure, color) =>
  nodeObject(new ToneMappingNode(mapping, nodeObject(exposure), nodeObject(color)));

// lighting

//export const lighting = nodeProxy( LightingNode ); // abstract
//export const light; // still needs to be added
export const lights = (lights) => nodeObject(new LightsNode().fromLights(lights));
export const lightingContext = nodeProxy(LightingContextNode);

// utils

export const matcapUV = nodeImmutable(MatcapUVNode);
export const maxMipLevel = nodeProxy(MaxMipLevelNode);

export const oscSine = nodeProxy(OscNode, OscNode.SINE);
export const oscSquare = nodeProxy(OscNode, OscNode.SQUARE);
export const oscTriangle = nodeProxy(OscNode, OscNode.TRIANGLE);
export const oscSawtooth = nodeProxy(OscNode, OscNode.SAWTOOTH);

export const spritesheetUV = nodeProxy(SpriteSheetUVNode);

// @TODO: add supports to use node in timeScale
export const timerLocal = (timeScale) => nodeObject(new TimerNode(TimerNode.LOCAL, timeScale));
export const timerGlobal = (timeScale) => nodeObject(new TimerNode(TimerNode.GLOBAL, timeScale));
export const timerDelta = (timeScale) => nodeObject(new TimerNode(TimerNode.DELTA, timeScale));

// procedural

export const checker = nodeProxy(CheckerNode);

// fog

export const fog = nodeProxy(FogNode);
export const rangeFog = nodeProxy(FogRangeNode);
