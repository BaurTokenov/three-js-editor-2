"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidebarSettingsViewport = void 0;
const ui_1 = require("./libs/ui");
const ui_three_1 = require("./libs/ui.three");
function SidebarSettingsViewport(editor) {
    const signals = editor.signals;
    const strings = editor.strings;
    const container = new ui_1.UIPanel();
    const headerRow = new ui_1.UIRow();
    headerRow.add(new ui_1.UIText(strings.getKey('sidebar/settings/viewport').toUpperCase()));
    container.add(headerRow);
    // grid
    const showGridRow = new ui_1.UIRow();
    showGridRow.add(new ui_1.UIText(strings.getKey('sidebar/settings/viewport/grid')).setWidth('90px'));
    const showGrid = new ui_three_1.UIBoolean(true).onChange(function () {
        signals.showGridChanged.dispatch(showGrid.getValue());
    });
    showGridRow.add(showGrid);
    container.add(showGridRow);
    // helpers
    const showHelpersRow = new ui_1.UIRow();
    showHelpersRow.add(new ui_1.UIText(strings.getKey('sidebar/settings/viewport/helpers')).setWidth('90px'));
    const showHelpers = new ui_three_1.UIBoolean(true).onChange(function () {
        signals.showHelpersChanged.dispatch(showHelpers.getValue());
    });
    showHelpersRow.add(showHelpers);
    container.add(showHelpersRow);
    return container;
}
exports.SidebarSettingsViewport = SidebarSettingsViewport;
