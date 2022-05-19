import { LabelElement } from '../../libs/flow.module';
import { BaseNode } from '../core/BaseNode';
import { Vector3 } from 'three';
import { MathNode, UniformNode } from 'three-nodes/Nodes';

const DEFAULT_VALUE = new UniformNode(new Vector3());

export class NormalizeEditor extends BaseNode {
  constructor() {
    const node = new MathNode(MathNode.NORMALIZE, DEFAULT_VALUE);

    super('Normalize', 3, node, 175);

    const input = new LabelElement('A').setInput(3);

    input.onConnect(() => {
      node.aNode = input.getLinkedObject() || DEFAULT_VALUE;
    });

    this.add(input);
  }
}
