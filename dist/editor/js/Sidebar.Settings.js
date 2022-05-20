"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidebarSettings = void 0;
const ui_1 = require("./libs/ui");
const Sidebar_Settings_Viewport_1 = require("./Sidebar.Settings.Viewport");
const Sidebar_Settings_Shortcuts_1 = require("./Sidebar.Settings.Shortcuts");
const Sidebar_Settings_History_1 = require("./Sidebar.Settings.History");
function SidebarSettings(editor) {
    const config = editor.config;
    const strings = editor.strings;
    const container = new ui_1.UISpan();
    const settings = new ui_1.UIPanel();
    settings.setBorderTop('0');
    settings.setPaddingTop('20px');
    container.add(settings);
    // language
    const options = {
        en: 'English',
        fr: 'Français',
        zh: '中文',
    };
    const languageRow = new ui_1.UIRow();
    const language = new ui_1.UISelect().setWidth('150px');
    language.setOptions(options);
    if (config.getKey('language') !== undefined) {
        language.setValue(config.getKey('language'));
    }
    language.onChange(function () {
        const value = this.getValue();
        editor.config.setKey('language', value);
    });
    languageRow.add(new ui_1.UIText(strings.getKey('sidebar/settings/language')).setWidth('90px'));
    languageRow.add(language);
    settings.add(languageRow);
    //
    container.add(new Sidebar_Settings_Viewport_1.SidebarSettingsViewport(editor));
    container.add(new Sidebar_Settings_Shortcuts_1.SidebarSettingsShortcuts(editor));
    container.add(new Sidebar_Settings_History_1.SidebarSettingsHistory(editor));
    return container;
}
exports.SidebarSettings = SidebarSettings;
