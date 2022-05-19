import { NumberInput, Element } from '../../libs/flow.module';
import { BaseNode } from '../core/BaseNode';
import { UniformNode } from 'three-nodes/Nodes';

export class FloatEditor extends BaseNode {
  constructor() {
    const node = new UniformNode(0);

    super('Float', 1, node, 150);

    const field = new NumberInput().setTagColor('red').onChange(() => {
      node.value = field.getValue();
    });

    this.add(new Element().add(field));
  }
}
