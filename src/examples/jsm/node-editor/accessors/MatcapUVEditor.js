import { BaseNode } from '../core/BaseNode';
import { MatcapUVNode } from 'three-nodes/Nodes';

export class MatcapUVEditor extends BaseNode {
  constructor() {
    const node = new MatcapUVNode();

    super('Matcap UV', 2, node, 200);
  }
}
