import WebGPUBuffer from './WebGPUBuffer';
import { GPUBindingType } from './constants';

class WebGPUUniformBuffer extends WebGPUBuffer {
  constructor(name, buffer = null) {
    super(name, GPUBindingType.UniformBuffer, buffer);

    this.usage |= GPUBufferUsage.UNIFORM;
  }
}

WebGPUUniformBuffer.prototype.isUniformBuffer = true;

export default WebGPUUniformBuffer;
