import { LabelElement } from '../../libs/flow.module';
import { BaseNode } from '../core/BaseNode';
import { CheckerNode, UVNode } from 'three-nodes/Nodes';

const defaultUV = new UVNode();

export class CheckerEditor extends BaseNode {
  constructor() {
    const node = new CheckerNode(defaultUV);

    super('Checker', 1, node, 200);

    const field = new LabelElement('UV').setInput(2);

    field.onConnect(() => {
      node.uvNode = field.getLinkedObject() || defaultUV;
    });

    this.add(field);
  }
}
