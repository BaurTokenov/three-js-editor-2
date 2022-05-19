import { UITabbedPanel } from './libs/ui';

import { SidebarObject } from './Sidebar.Object';
import { SidebarGeometry } from './Sidebar.Geometry';
import { SidebarMaterial } from './Sidebar.Material';

function SidebarProperties(editor) {
  const strings = editor.strings;

  const container = new UITabbedPanel();
  container.setId('properties');

  container.addTab('object', strings.getKey('sidebar/properties/object'), new SidebarObject(editor));
  container.addTab('geometry', strings.getKey('sidebar/properties/geometry'), new SidebarGeometry(editor));
  container.addTab('material', strings.getKey('sidebar/properties/material'), new SidebarMaterial(editor));
  container.select('object');

  return container;
}

export { SidebarProperties };
