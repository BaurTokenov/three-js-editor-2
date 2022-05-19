// core
import ArrayUniformNode from './core/ArrayUniformNode';
import AttributeNode from './core/AttributeNode';
import BypassNode from './core/BypassNode';
import CodeNode from './core/CodeNode';
import ConstNode from './core/ConstNode';
import ContextNode from './core/ContextNode';
import ExpressionNode from './core/ExpressionNode';
import FunctionCallNode from './core/FunctionCallNode';
import FunctionNode from './core/FunctionNode';
import InstanceIndexNode from './core/InstanceIndexNode';
import Node from './core/Node';
import NodeAttribute from './core/NodeAttribute';
import NodeBuilder from './core/NodeBuilder';
import NodeCode from './core/NodeCode';
import NodeFrame from './core/NodeFrame';
import NodeFunctionInput from './core/NodeFunctionInput';
import NodeKeywords from './core/NodeKeywords';
import NodeUniform from './core/NodeUniform';
import NodeVar from './core/NodeVar';
import NodeVary from './core/NodeVary';
import PropertyNode from './core/PropertyNode';
import TempNode from './core/TempNode';
import UniformNode from './core/UniformNode';
import VarNode from './core/VarNode';
import VaryNode from './core/VaryNode';

// accessors
import BufferNode from './accessors/BufferNode';
import CameraNode from './accessors/CameraNode';
import CubeTextureNode from './accessors/CubeTextureNode';
import InstanceNode from './accessors/InstanceNode';
import MaterialNode from './accessors/MaterialNode';
import MaterialReferenceNode from './accessors/MaterialReferenceNode';
import ModelNode from './accessors/ModelNode';
import ModelViewProjectionNode from './accessors/ModelViewProjectionNode';
import NormalNode from './accessors/NormalNode';
import Object3DNode from './accessors/Object3DNode';
import PointUVNode from './accessors/PointUVNode';
import PositionNode from './accessors/PositionNode';
import ReferenceNode from './accessors/ReferenceNode';
import ReflectNode from './accessors/ReflectNode';
import SkinningNode from './accessors/SkinningNode';
import TextureNode from './accessors/TextureNode';
import UVNode from './accessors/UVNode';

// gpgpu
import ComputeNode from './gpgpu/ComputeNode';

// display
import ColorSpaceNode from './display/ColorSpaceNode';
import FrontFacingNode from './display/FrontFacingNode';
import NormalMapNode from './display/NormalMapNode';
import ToneMappingNode from './display/ToneMappingNode';

// math
import MathNode from './math/MathNode';
import OperatorNode from './math/OperatorNode';
import CondNode from './math/CondNode';

// lighting
import PunctualLightNode from './lighting/PunctualLightNode';
import LightsNode from './lighting/LightsNode';
import LightingNode from './lighting/LightingNode';
import LightingContextNode from './lighting/LightingContextNode';
import HemisphereLightNode from './lighting/HemisphereLightNode';
import EnvironmentLightNode from './lighting/EnvironmentLightNode';
import AONode from './lighting/AONode';
import AnalyticLightNode from './lighting/AnalyticLightNode';

// utils
import ArrayElementNode from './utils/ArrayElementNode';
import ConvertNode from './utils/ConvertNode';
import JoinNode from './utils/JoinNode';
import MatcapUVNode from './utils/MatcapUVNode';
import MaxMipLevelNode from './utils/MaxMipLevelNode';
import OscNode from './utils/OscNode';
import SplitNode from './utils/SplitNode';
import SpriteSheetUVNode from './utils/SpriteSheetUVNode';
import TimerNode from './utils/TimerNode';

// loaders
import NodeLoader from './loaders/NodeLoader';
import NodeObjectLoader from './loaders/NodeObjectLoader';
import NodeMaterialLoader from './loaders/NodeMaterialLoader';

// procedural
import CheckerNode from './procedural/CheckerNode';

// fog
import FogNode from './fog/FogNode';
import FogRangeNode from './fog/FogRangeNode';

// core
export * from './core/constants';

// materials
export * from './materials/Materials';

// shader node
export * from './shadernode/ShaderNodeElements';

const nodeLib = {
  // core
  ArrayUniformNode,
  AttributeNode,
  BypassNode,
  CodeNode,
  ContextNode,
  ConstNode,
  ExpressionNode,
  FunctionCallNode,
  FunctionNode,
  InstanceIndexNode,
  Node,
  NodeAttribute,
  NodeBuilder,
  NodeCode,
  NodeFrame,
  NodeFunctionInput,
  NodeKeywords,
  NodeUniform,
  NodeVar,
  NodeVary,
  PropertyNode,
  TempNode,
  UniformNode,
  VarNode,
  VaryNode,

  // compute
  ComputeNode,

  // accessors
  BufferNode,
  CameraNode,
  CubeTextureNode,
  InstanceNode,
  MaterialNode,
  MaterialReferenceNode,
  ModelNode,
  ModelViewProjectionNode,
  NormalNode,
  Object3DNode,
  PointUVNode,
  PositionNode,
  ReferenceNode,
  ReflectNode,
  SkinningNode,
  TextureNode,
  UVNode,

  // display
  ColorSpaceNode,
  FrontFacingNode,
  NormalMapNode,
  ToneMappingNode,

  // math
  MathNode,
  OperatorNode,
  CondNode,

  // lighting
  PunctualLightNode,
  LightsNode,
  LightingNode,
  LightingContextNode,
  HemisphereLightNode,
  EnvironmentLightNode,
  AONode,
  AnalyticLightNode,

  // utils
  ArrayElementNode,
  ConvertNode,
  JoinNode,
  MatcapUVNode,
  MaxMipLevelNode,
  OscNode,
  SplitNode,
  SpriteSheetUVNode,
  TimerNode,

  // procedural
  CheckerNode,

  // fog
  FogNode,
  FogRangeNode,

  // loaders
  NodeLoader,
  NodeObjectLoader,
  NodeMaterialLoader,
};

export const fromType = (type) => {
  return new nodeLib[type]();
};

export {
  // core
  ArrayUniformNode,
  AttributeNode,
  BypassNode,
  CodeNode,
  ContextNode,
  ConstNode,
  ExpressionNode,
  FunctionCallNode,
  FunctionNode,
  InstanceIndexNode,
  Node,
  NodeAttribute,
  NodeBuilder,
  NodeCode,
  NodeFrame,
  NodeFunctionInput,
  NodeKeywords,
  NodeUniform,
  NodeVar,
  NodeVary,
  PropertyNode,
  TempNode,
  UniformNode,
  VarNode,
  VaryNode,
  // compute
  ComputeNode,
  // accessors
  BufferNode,
  CameraNode,
  CubeTextureNode,
  InstanceNode,
  MaterialNode,
  MaterialReferenceNode,
  ModelNode,
  ModelViewProjectionNode,
  NormalNode,
  Object3DNode,
  PointUVNode,
  PositionNode,
  ReferenceNode,
  ReflectNode,
  SkinningNode,
  TextureNode,
  UVNode,
  // display
  ColorSpaceNode,
  FrontFacingNode,
  NormalMapNode,
  ToneMappingNode,
  // math
  MathNode,
  OperatorNode,
  CondNode,
  // lighting
  PunctualLightNode,
  LightsNode,
  LightingNode,
  LightingContextNode,
  HemisphereLightNode,
  EnvironmentLightNode,
  AONode,
  AnalyticLightNode,
  // utils
  ArrayElementNode,
  ConvertNode,
  JoinNode,
  MatcapUVNode,
  MaxMipLevelNode,
  OscNode,
  SplitNode,
  SpriteSheetUVNode,
  TimerNode,
  // procedural
  CheckerNode,
  // fog
  FogNode,
  FogRangeNode,
  // loaders
  NodeLoader,
  NodeObjectLoader,
  NodeMaterialLoader,
};
