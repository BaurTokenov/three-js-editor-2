"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Menubar = void 0;
const ui_1 = require("./libs/ui");
const Menubar_Add_1 = require("./Menubar.Add");
const Menubar_Edit_1 = require("./Menubar.Edit");
const Menubar_File_1 = require("./Menubar.File");
const Menubar_Examples_1 = require("./Menubar.Examples");
const Menubar_View_1 = require("./Menubar.View");
const Menubar_Help_1 = require("./Menubar.Help");
const Menubar_Play_1 = require("./Menubar.Play");
const Menubar_Status_1 = require("./Menubar.Status");
function Menubar(editor, menubarCallbacks) {
    const container = new ui_1.UIPanel();
    container.setId('menubar');
    container.add(new Menubar_File_1.MenubarFile(editor, menubarCallbacks['fileCallbacks']));
    container.add(new Menubar_Edit_1.MenubarEdit(editor));
    container.add(new Menubar_Add_1.MenubarAdd(editor));
    container.add(new Menubar_Play_1.MenubarPlay(editor));
    container.add(new Menubar_Examples_1.MenubarExamples(editor));
    container.add(new Menubar_View_1.MenubarView(editor));
    container.add(new Menubar_Help_1.MenubarHelp(editor));
    container.add(new Menubar_Status_1.MenubarStatus(editor));
    return container;
}
exports.Menubar = Menubar;
