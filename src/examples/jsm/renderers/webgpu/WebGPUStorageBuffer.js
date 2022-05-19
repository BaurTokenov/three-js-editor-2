import WebGPUBuffer from './WebGPUBuffer';
import { GPUBindingType } from './constants';

class WebGPUStorageBuffer extends WebGPUBuffer {
  constructor(name, attribute) {
    super(name, GPUBindingType.StorageBuffer, attribute.array);

    this.usage |= GPUBufferUsage.VERTEX | GPUBufferUsage.STORAGE;

    this.attribute = attribute;
  }
}

WebGPUStorageBuffer.prototype.isStorageBuffer = true;

export default WebGPUStorageBuffer;
