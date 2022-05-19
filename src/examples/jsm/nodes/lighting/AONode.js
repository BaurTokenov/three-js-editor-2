import LightingNode from './LightingNode';
import { float, add, mul, sub } from '../shadernode/ShaderNodeElements';

class AONode extends LightingNode {
  constructor(aoNode = null) {
    super();

    this.aoNode = aoNode;
  }

  generate(builder) {
    const aoIntensity = 1;
    const aoNode = add(mul(sub(float(this.aoNode), 1.0), aoIntensity), 1.0);

    builder.context.ambientOcclusion.mul(aoNode);
  }
}

export default AONode;
