import TempNode from '../core/TempNode';
import {
  vec2,
  vec3,
  negate,
  normalize,
  cross,
  dot,
  mul,
  add,
  transformedNormalView,
  positionViewDirection,
} from '../shadernode/ShaderNodeBaseElements';

class MatcapUVNode extends TempNode {
  constructor() {
    super('vec2');
  }

  generate(builder) {
    const x = normalize(vec3(positionViewDirection.z, 0, negate(positionViewDirection.x)));
    const y = cross(positionViewDirection, x);

    const uv = add(mul(vec2(dot(x, transformedNormalView), dot(y, transformedNormalView)), 0.495), 0.5);

    return uv.build(builder, this.getNodeType(builder));
  }
}

export default MatcapUVNode;
