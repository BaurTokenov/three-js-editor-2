"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sidebar = void 0;
const ui_1 = require("./libs/ui");
const Sidebar_Scene_1 = require("./Sidebar.Scene");
const Sidebar_Properties_1 = require("./Sidebar.Properties");
const Sidebar_Script_1 = require("./Sidebar.Script");
const Sidebar_Animation_1 = require("./Sidebar.Animation");
const Sidebar_Project_1 = require("./Sidebar.Project");
const Sidebar_Settings_1 = require("./Sidebar.Settings");
function Sidebar(editor, setPositionFunction) {
    const strings = editor.strings;
    const container = new ui_1.UITabbedPanel();
    container.setId('sidebar');
    const scene = new ui_1.UISpan().add(new Sidebar_Scene_1.SidebarScene(editor), new Sidebar_Properties_1.SidebarProperties(editor, setPositionFunction), new Sidebar_Animation_1.SidebarAnimation(editor), new Sidebar_Script_1.SidebarScript(editor));
    const project = new Sidebar_Project_1.SidebarProject(editor);
    const settings = new Sidebar_Settings_1.SidebarSettings(editor);
    container.addTab('scene', strings.getKey('sidebar/scene'), scene);
    container.addTab('project', strings.getKey('sidebar/project'), project);
    container.addTab('settings', strings.getKey('sidebar/settings'), settings);
    container.select('scene');
    return container;
}
exports.Sidebar = Sidebar;
