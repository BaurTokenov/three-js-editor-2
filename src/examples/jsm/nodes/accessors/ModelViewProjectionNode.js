import Node from '../core/Node';
import CameraNode from '../accessors/CameraNode';
import ModelNode from '../accessors/ModelNode';
import OperatorNode from '../math/OperatorNode';
import PositionNode from '../accessors/PositionNode';

class ModelViewProjectionNode extends Node {
  constructor(position = new PositionNode()) {
    super('vec4');

    this.position = position;
  }

  generate(builder) {
    const position = this.position;

    const mvpMatrix = new OperatorNode(
      '*',
      new CameraNode(CameraNode.PROJECTION_MATRIX),
      new ModelNode(ModelNode.VIEW_MATRIX)
    );
    const mvpNode = new OperatorNode('*', mvpMatrix, position);

    return mvpNode.build(builder);
  }
}

export default ModelViewProjectionNode;
