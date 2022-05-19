import WebGPUSampler from '../WebGPUSampler';

class WebGPUNodeSampler extends WebGPUSampler {
  constructor(name, textureNode) {
    super(name, textureNode.value);

    this.textureNode = textureNode;
  }

  getTexture() {
    return this.textureNode.value;
  }
}

export default WebGPUNodeSampler;
