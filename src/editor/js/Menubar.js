import { UIPanel } from './libs/ui';

import { MenubarAdd } from './Menubar.Add';
import { MenubarEdit } from './Menubar.Edit';
import { MenubarFile } from './Menubar.File';
import { MenubarExamples } from './Menubar.Examples';
import { MenubarView } from './Menubar.View';
import { MenubarHelp } from './Menubar.Help';
import { MenubarPlay } from './Menubar.Play';
import { MenubarStatus } from './Menubar.Status';

function Menubar(editor) {
  const container = new UIPanel();
  container.setId('menubar');

  container.add(new MenubarFile(editor));
  container.add(new MenubarEdit(editor));
  container.add(new MenubarAdd(editor));
  container.add(new MenubarPlay(editor));
  container.add(new MenubarExamples(editor));
  container.add(new MenubarView(editor));
  container.add(new MenubarHelp(editor));

  container.add(new MenubarStatus(editor));

  return container;
}

export { Menubar };
