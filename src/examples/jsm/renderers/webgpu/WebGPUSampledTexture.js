import WebGPUBinding from './WebGPUBinding';
import { GPUBindingType, GPUTextureViewDimension } from './constants';

class WebGPUSampledTexture extends WebGPUBinding {
  constructor(name, texture) {
    super(name);

    this.texture = texture;

    this.dimension = GPUTextureViewDimension.TwoD;

    this.type = GPUBindingType.SampledTexture;
    this.visibility = GPUShaderStage.FRAGMENT;

    this.textureGPU = null; // set by the renderer
  }

  getTexture() {
    return this.texture;
  }
}

WebGPUSampledTexture.prototype.isSampledTexture = true;

class WebGPUSampledArrayTexture extends WebGPUSampledTexture {
  constructor(name, texture) {
    super(name, texture);

    this.dimension = GPUTextureViewDimension.TwoDArray;
  }
}

WebGPUSampledArrayTexture.prototype.isSampledArrayTexture = true;

class WebGPUSampled3DTexture extends WebGPUSampledTexture {
  constructor(name, texture) {
    super(name, texture);

    this.dimension = GPUTextureViewDimension.ThreeD;
  }
}

WebGPUSampled3DTexture.prototype.isSampled3DTexture = true;

class WebGPUSampledCubeTexture extends WebGPUSampledTexture {
  constructor(name, texture) {
    super(name, texture);

    this.dimension = GPUTextureViewDimension.Cube;
  }
}

WebGPUSampledCubeTexture.prototype.isSampledCubeTexture = true;

export { WebGPUSampledTexture, WebGPUSampledArrayTexture, WebGPUSampled3DTexture, WebGPUSampledCubeTexture };
