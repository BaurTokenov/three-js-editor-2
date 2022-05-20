"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperatorNode = exports.MathNode = exports.ToneMappingNode = exports.NormalMapNode = exports.FrontFacingNode = exports.ColorSpaceNode = exports.UVNode = exports.TextureNode = exports.SkinningNode = exports.ReflectNode = exports.ReferenceNode = exports.PositionNode = exports.PointUVNode = exports.Object3DNode = exports.NormalNode = exports.ModelViewProjectionNode = exports.ModelNode = exports.MaterialReferenceNode = exports.MaterialNode = exports.InstanceNode = exports.CubeTextureNode = exports.CameraNode = exports.BufferNode = exports.ComputeNode = exports.VaryNode = exports.VarNode = exports.UniformNode = exports.TempNode = exports.PropertyNode = exports.NodeVary = exports.NodeVar = exports.NodeUniform = exports.NodeKeywords = exports.NodeFunctionInput = exports.NodeFrame = exports.NodeCode = exports.NodeBuilder = exports.NodeAttribute = exports.Node = exports.InstanceIndexNode = exports.FunctionNode = exports.FunctionCallNode = exports.ExpressionNode = exports.ConstNode = exports.ContextNode = exports.CodeNode = exports.BypassNode = exports.AttributeNode = exports.ArrayUniformNode = exports.fromType = void 0;
exports.NodeMaterialLoader = exports.NodeObjectLoader = exports.NodeLoader = exports.FogRangeNode = exports.FogNode = exports.CheckerNode = exports.TimerNode = exports.SpriteSheetUVNode = exports.SplitNode = exports.OscNode = exports.MaxMipLevelNode = exports.MatcapUVNode = exports.JoinNode = exports.ConvertNode = exports.ArrayElementNode = exports.AnalyticLightNode = exports.AONode = exports.EnvironmentLightNode = exports.HemisphereLightNode = exports.LightingContextNode = exports.LightingNode = exports.LightsNode = exports.PunctualLightNode = exports.CondNode = void 0;
// core
const ArrayUniformNode_1 = __importDefault(require("./core/ArrayUniformNode"));
exports.ArrayUniformNode = ArrayUniformNode_1.default;
const AttributeNode_1 = __importDefault(require("./core/AttributeNode"));
exports.AttributeNode = AttributeNode_1.default;
const BypassNode_1 = __importDefault(require("./core/BypassNode"));
exports.BypassNode = BypassNode_1.default;
const CodeNode_1 = __importDefault(require("./core/CodeNode"));
exports.CodeNode = CodeNode_1.default;
const ConstNode_1 = __importDefault(require("./core/ConstNode"));
exports.ConstNode = ConstNode_1.default;
const ContextNode_1 = __importDefault(require("./core/ContextNode"));
exports.ContextNode = ContextNode_1.default;
const ExpressionNode_1 = __importDefault(require("./core/ExpressionNode"));
exports.ExpressionNode = ExpressionNode_1.default;
const FunctionCallNode_1 = __importDefault(require("./core/FunctionCallNode"));
exports.FunctionCallNode = FunctionCallNode_1.default;
const FunctionNode_1 = __importDefault(require("./core/FunctionNode"));
exports.FunctionNode = FunctionNode_1.default;
const InstanceIndexNode_1 = __importDefault(require("./core/InstanceIndexNode"));
exports.InstanceIndexNode = InstanceIndexNode_1.default;
const Node_1 = __importDefault(require("./core/Node"));
exports.Node = Node_1.default;
const NodeAttribute_1 = __importDefault(require("./core/NodeAttribute"));
exports.NodeAttribute = NodeAttribute_1.default;
const NodeBuilder_1 = __importDefault(require("./core/NodeBuilder"));
exports.NodeBuilder = NodeBuilder_1.default;
const NodeCode_1 = __importDefault(require("./core/NodeCode"));
exports.NodeCode = NodeCode_1.default;
const NodeFrame_1 = __importDefault(require("./core/NodeFrame"));
exports.NodeFrame = NodeFrame_1.default;
const NodeFunctionInput_1 = __importDefault(require("./core/NodeFunctionInput"));
exports.NodeFunctionInput = NodeFunctionInput_1.default;
const NodeKeywords_1 = __importDefault(require("./core/NodeKeywords"));
exports.NodeKeywords = NodeKeywords_1.default;
const NodeUniform_1 = __importDefault(require("./core/NodeUniform"));
exports.NodeUniform = NodeUniform_1.default;
const NodeVar_1 = __importDefault(require("./core/NodeVar"));
exports.NodeVar = NodeVar_1.default;
const NodeVary_1 = __importDefault(require("./core/NodeVary"));
exports.NodeVary = NodeVary_1.default;
const PropertyNode_1 = __importDefault(require("./core/PropertyNode"));
exports.PropertyNode = PropertyNode_1.default;
const TempNode_1 = __importDefault(require("./core/TempNode"));
exports.TempNode = TempNode_1.default;
const UniformNode_1 = __importDefault(require("./core/UniformNode"));
exports.UniformNode = UniformNode_1.default;
const VarNode_1 = __importDefault(require("./core/VarNode"));
exports.VarNode = VarNode_1.default;
const VaryNode_1 = __importDefault(require("./core/VaryNode"));
exports.VaryNode = VaryNode_1.default;
// accessors
const BufferNode_1 = __importDefault(require("./accessors/BufferNode"));
exports.BufferNode = BufferNode_1.default;
const CameraNode_1 = __importDefault(require("./accessors/CameraNode"));
exports.CameraNode = CameraNode_1.default;
const CubeTextureNode_1 = __importDefault(require("./accessors/CubeTextureNode"));
exports.CubeTextureNode = CubeTextureNode_1.default;
const InstanceNode_1 = __importDefault(require("./accessors/InstanceNode"));
exports.InstanceNode = InstanceNode_1.default;
const MaterialNode_1 = __importDefault(require("./accessors/MaterialNode"));
exports.MaterialNode = MaterialNode_1.default;
const MaterialReferenceNode_1 = __importDefault(require("./accessors/MaterialReferenceNode"));
exports.MaterialReferenceNode = MaterialReferenceNode_1.default;
const ModelNode_1 = __importDefault(require("./accessors/ModelNode"));
exports.ModelNode = ModelNode_1.default;
const ModelViewProjectionNode_1 = __importDefault(require("./accessors/ModelViewProjectionNode"));
exports.ModelViewProjectionNode = ModelViewProjectionNode_1.default;
const NormalNode_1 = __importDefault(require("./accessors/NormalNode"));
exports.NormalNode = NormalNode_1.default;
const Object3DNode_1 = __importDefault(require("./accessors/Object3DNode"));
exports.Object3DNode = Object3DNode_1.default;
const PointUVNode_1 = __importDefault(require("./accessors/PointUVNode"));
exports.PointUVNode = PointUVNode_1.default;
const PositionNode_1 = __importDefault(require("./accessors/PositionNode"));
exports.PositionNode = PositionNode_1.default;
const ReferenceNode_1 = __importDefault(require("./accessors/ReferenceNode"));
exports.ReferenceNode = ReferenceNode_1.default;
const ReflectNode_1 = __importDefault(require("./accessors/ReflectNode"));
exports.ReflectNode = ReflectNode_1.default;
const SkinningNode_1 = __importDefault(require("./accessors/SkinningNode"));
exports.SkinningNode = SkinningNode_1.default;
const TextureNode_1 = __importDefault(require("./accessors/TextureNode"));
exports.TextureNode = TextureNode_1.default;
const UVNode_1 = __importDefault(require("./accessors/UVNode"));
exports.UVNode = UVNode_1.default;
// gpgpu
const ComputeNode_1 = __importDefault(require("./gpgpu/ComputeNode"));
exports.ComputeNode = ComputeNode_1.default;
// display
const ColorSpaceNode_1 = __importDefault(require("./display/ColorSpaceNode"));
exports.ColorSpaceNode = ColorSpaceNode_1.default;
const FrontFacingNode_1 = __importDefault(require("./display/FrontFacingNode"));
exports.FrontFacingNode = FrontFacingNode_1.default;
const NormalMapNode_1 = __importDefault(require("./display/NormalMapNode"));
exports.NormalMapNode = NormalMapNode_1.default;
const ToneMappingNode_1 = __importDefault(require("./display/ToneMappingNode"));
exports.ToneMappingNode = ToneMappingNode_1.default;
// math
const MathNode_1 = __importDefault(require("./math/MathNode"));
exports.MathNode = MathNode_1.default;
const OperatorNode_1 = __importDefault(require("./math/OperatorNode"));
exports.OperatorNode = OperatorNode_1.default;
const CondNode_1 = __importDefault(require("./math/CondNode"));
exports.CondNode = CondNode_1.default;
// lighting
const PunctualLightNode_1 = __importDefault(require("./lighting/PunctualLightNode"));
exports.PunctualLightNode = PunctualLightNode_1.default;
const LightsNode_1 = __importDefault(require("./lighting/LightsNode"));
exports.LightsNode = LightsNode_1.default;
const LightingNode_1 = __importDefault(require("./lighting/LightingNode"));
exports.LightingNode = LightingNode_1.default;
const LightingContextNode_1 = __importDefault(require("./lighting/LightingContextNode"));
exports.LightingContextNode = LightingContextNode_1.default;
const HemisphereLightNode_1 = __importDefault(require("./lighting/HemisphereLightNode"));
exports.HemisphereLightNode = HemisphereLightNode_1.default;
const EnvironmentLightNode_1 = __importDefault(require("./lighting/EnvironmentLightNode"));
exports.EnvironmentLightNode = EnvironmentLightNode_1.default;
const AONode_1 = __importDefault(require("./lighting/AONode"));
exports.AONode = AONode_1.default;
const AnalyticLightNode_1 = __importDefault(require("./lighting/AnalyticLightNode"));
exports.AnalyticLightNode = AnalyticLightNode_1.default;
// utils
const ArrayElementNode_1 = __importDefault(require("./utils/ArrayElementNode"));
exports.ArrayElementNode = ArrayElementNode_1.default;
const ConvertNode_1 = __importDefault(require("./utils/ConvertNode"));
exports.ConvertNode = ConvertNode_1.default;
const JoinNode_1 = __importDefault(require("./utils/JoinNode"));
exports.JoinNode = JoinNode_1.default;
const MatcapUVNode_1 = __importDefault(require("./utils/MatcapUVNode"));
exports.MatcapUVNode = MatcapUVNode_1.default;
const MaxMipLevelNode_1 = __importDefault(require("./utils/MaxMipLevelNode"));
exports.MaxMipLevelNode = MaxMipLevelNode_1.default;
const OscNode_1 = __importDefault(require("./utils/OscNode"));
exports.OscNode = OscNode_1.default;
const SplitNode_1 = __importDefault(require("./utils/SplitNode"));
exports.SplitNode = SplitNode_1.default;
const SpriteSheetUVNode_1 = __importDefault(require("./utils/SpriteSheetUVNode"));
exports.SpriteSheetUVNode = SpriteSheetUVNode_1.default;
const TimerNode_1 = __importDefault(require("./utils/TimerNode"));
exports.TimerNode = TimerNode_1.default;
// loaders
const NodeLoader_1 = __importDefault(require("./loaders/NodeLoader"));
exports.NodeLoader = NodeLoader_1.default;
const NodeObjectLoader_1 = __importDefault(require("./loaders/NodeObjectLoader"));
exports.NodeObjectLoader = NodeObjectLoader_1.default;
const NodeMaterialLoader_1 = __importDefault(require("./loaders/NodeMaterialLoader"));
exports.NodeMaterialLoader = NodeMaterialLoader_1.default;
// procedural
const CheckerNode_1 = __importDefault(require("./procedural/CheckerNode"));
exports.CheckerNode = CheckerNode_1.default;
// fog
const FogNode_1 = __importDefault(require("./fog/FogNode"));
exports.FogNode = FogNode_1.default;
const FogRangeNode_1 = __importDefault(require("./fog/FogRangeNode"));
exports.FogRangeNode = FogRangeNode_1.default;
// core
__exportStar(require("./core/constants"), exports);
// materials
__exportStar(require("./materials/Materials"), exports);
// shader node
__exportStar(require("./shadernode/ShaderNodeElements"), exports);
const nodeLib = {
    // core
    ArrayUniformNode: ArrayUniformNode_1.default,
    AttributeNode: AttributeNode_1.default,
    BypassNode: BypassNode_1.default,
    CodeNode: CodeNode_1.default,
    ContextNode: ContextNode_1.default,
    ConstNode: ConstNode_1.default,
    ExpressionNode: ExpressionNode_1.default,
    FunctionCallNode: FunctionCallNode_1.default,
    FunctionNode: FunctionNode_1.default,
    InstanceIndexNode: InstanceIndexNode_1.default,
    Node: Node_1.default,
    NodeAttribute: NodeAttribute_1.default,
    NodeBuilder: NodeBuilder_1.default,
    NodeCode: NodeCode_1.default,
    NodeFrame: NodeFrame_1.default,
    NodeFunctionInput: NodeFunctionInput_1.default,
    NodeKeywords: NodeKeywords_1.default,
    NodeUniform: NodeUniform_1.default,
    NodeVar: NodeVar_1.default,
    NodeVary: NodeVary_1.default,
    PropertyNode: PropertyNode_1.default,
    TempNode: TempNode_1.default,
    UniformNode: UniformNode_1.default,
    VarNode: VarNode_1.default,
    VaryNode: VaryNode_1.default,
    // compute
    ComputeNode: ComputeNode_1.default,
    // accessors
    BufferNode: BufferNode_1.default,
    CameraNode: CameraNode_1.default,
    CubeTextureNode: CubeTextureNode_1.default,
    InstanceNode: InstanceNode_1.default,
    MaterialNode: MaterialNode_1.default,
    MaterialReferenceNode: MaterialReferenceNode_1.default,
    ModelNode: ModelNode_1.default,
    ModelViewProjectionNode: ModelViewProjectionNode_1.default,
    NormalNode: NormalNode_1.default,
    Object3DNode: Object3DNode_1.default,
    PointUVNode: PointUVNode_1.default,
    PositionNode: PositionNode_1.default,
    ReferenceNode: ReferenceNode_1.default,
    ReflectNode: ReflectNode_1.default,
    SkinningNode: SkinningNode_1.default,
    TextureNode: TextureNode_1.default,
    UVNode: UVNode_1.default,
    // display
    ColorSpaceNode: ColorSpaceNode_1.default,
    FrontFacingNode: FrontFacingNode_1.default,
    NormalMapNode: NormalMapNode_1.default,
    ToneMappingNode: ToneMappingNode_1.default,
    // math
    MathNode: MathNode_1.default,
    OperatorNode: OperatorNode_1.default,
    CondNode: CondNode_1.default,
    // lighting
    PunctualLightNode: PunctualLightNode_1.default,
    LightsNode: LightsNode_1.default,
    LightingNode: LightingNode_1.default,
    LightingContextNode: LightingContextNode_1.default,
    HemisphereLightNode: HemisphereLightNode_1.default,
    EnvironmentLightNode: EnvironmentLightNode_1.default,
    AONode: AONode_1.default,
    AnalyticLightNode: AnalyticLightNode_1.default,
    // utils
    ArrayElementNode: ArrayElementNode_1.default,
    ConvertNode: ConvertNode_1.default,
    JoinNode: JoinNode_1.default,
    MatcapUVNode: MatcapUVNode_1.default,
    MaxMipLevelNode: MaxMipLevelNode_1.default,
    OscNode: OscNode_1.default,
    SplitNode: SplitNode_1.default,
    SpriteSheetUVNode: SpriteSheetUVNode_1.default,
    TimerNode: TimerNode_1.default,
    // procedural
    CheckerNode: CheckerNode_1.default,
    // fog
    FogNode: FogNode_1.default,
    FogRangeNode: FogRangeNode_1.default,
    // loaders
    NodeLoader: NodeLoader_1.default,
    NodeObjectLoader: NodeObjectLoader_1.default,
    NodeMaterialLoader: NodeMaterialLoader_1.default,
};
const fromType = (type) => {
    return new nodeLib[type]();
};
exports.fromType = fromType;
