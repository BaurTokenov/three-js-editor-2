"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidebarProject = void 0;
const ui_1 = require("./libs/ui");
/* import { SidebarProjectMaterials } from './Sidebar.Project.Materials'; */
const Sidebar_Project_Renderer_1 = require("./Sidebar.Project.Renderer");
const Sidebar_Project_Video_1 = require("./Sidebar.Project.Video");
function SidebarProject(editor) {
    const config = editor.config;
    const signals = editor.signals;
    const strings = editor.strings;
    const container = new ui_1.UISpan();
    const settings = new ui_1.UIPanel();
    settings.setBorderTop('0');
    settings.setPaddingTop('20px');
    container.add(settings);
    // Title
    const titleRow = new ui_1.UIRow();
    const title = new ui_1.UIInput(config.getKey('project/title'))
        .setLeft('100px')
        .setWidth('150px')
        .onChange(function () {
        config.setKey('project/title', this.getValue());
    });
    titleRow.add(new ui_1.UIText(strings.getKey('sidebar/project/title')).setWidth('90px'));
    titleRow.add(title);
    settings.add(titleRow);
    // Editable
    const editableRow = new ui_1.UIRow();
    const editable = new ui_1.UICheckbox(config.getKey('project/editable')).setLeft('100px').onChange(function () {
        config.setKey('project/editable', this.getValue());
    });
    editableRow.add(new ui_1.UIText(strings.getKey('sidebar/project/editable')).setWidth('90px'));
    editableRow.add(editable);
    settings.add(editableRow);
    // WebVR
    const vrRow = new ui_1.UIRow();
    const vr = new ui_1.UICheckbox(config.getKey('project/vr')).setLeft('100px').onChange(function () {
        config.setKey('project/vr', this.getValue());
    });
    vrRow.add(new ui_1.UIText(strings.getKey('sidebar/project/vr')).setWidth('90px'));
    vrRow.add(vr);
    settings.add(vrRow);
    //
    /* container.add( new SidebarProjectMaterials( editor ) ); */
    container.add(new Sidebar_Project_Renderer_1.SidebarProjectRenderer(editor));
    if ('SharedArrayBuffer' in window) {
        container.add(new Sidebar_Project_Video_1.SidebarProjectVideo(editor));
    }
    // Signals
    signals.editorCleared.add(function () {
        title.setValue('');
        config.setKey('project/title', '');
    });
    return container;
}
exports.SidebarProject = SidebarProject;
