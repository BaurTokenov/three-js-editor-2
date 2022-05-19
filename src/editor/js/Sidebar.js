import { UITabbedPanel, UISpan } from './libs/ui';

import { SidebarScene } from './Sidebar.Scene';
import { SidebarProperties } from './Sidebar.Properties';
import { SidebarScript } from './Sidebar.Script';
import { SidebarAnimation } from './Sidebar.Animation';
import { SidebarProject } from './Sidebar.Project';
import { SidebarSettings } from './Sidebar.Settings';

function Sidebar(editor) {
  const strings = editor.strings;

  const container = new UITabbedPanel();
  container.setId('sidebar');

  const scene = new UISpan().add(
    new SidebarScene(editor),
    new SidebarProperties(editor),
    new SidebarAnimation(editor),
    new SidebarScript(editor)
  );
  const project = new SidebarProject(editor);
  const settings = new SidebarSettings(editor);

  container.addTab('scene', strings.getKey('sidebar/scene'), scene);
  container.addTab('project', strings.getKey('sidebar/project'), project);
  container.addTab('settings', strings.getKey('sidebar/settings'), settings);
  container.select('scene');

  return container;
}

export { Sidebar };
