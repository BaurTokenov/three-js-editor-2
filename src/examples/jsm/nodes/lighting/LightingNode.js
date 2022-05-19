import Node from '../core/Node';

class LightingNode extends Node {
  constructor() {
    super('vec3');
  }

  generate(/*builder*/) {
    console.warn('Abstract function.');
  }
}

export default LightingNode;
