import LightingNode from './LightingNode';
import { NodeUpdateType } from '../core/constants';
import { uniform } from '../shadernode/ShaderNodeElements';

import { Color } from 'three';

class AnalyticLightNode extends LightingNode {
  constructor(light = null) {
    super();

    this.updateType = NodeUpdateType.Object;

    this.light = light;

    this.colorNode = uniform(new Color());
  }

  getHash(/*builder*/) {
    return this.light.uuid;
  }

  update(/*frame*/) {
    const { light } = this;

    this.colorNode.value.copy(light.color).multiplyScalar(light.intensity);
  }
}

export default AnalyticLightNode;
