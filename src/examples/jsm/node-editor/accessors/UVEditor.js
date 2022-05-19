import { SelectInput, LabelElement } from '../../libs/flow.module';
import { BaseNode } from '../core/BaseNode';
import { UVNode } from 'three-nodes/Nodes';

export class UVEditor extends BaseNode {
  constructor() {
    const node = new UVNode();

    super('UV', 2, node, 200);

    const optionsField = new SelectInput(['1', '2'], 0).onChange(() => {
      node.index = Number(optionsField.getValue());

      this.invalidate();
    });

    this.add(new LabelElement('Channel').add(optionsField));
  }
}
