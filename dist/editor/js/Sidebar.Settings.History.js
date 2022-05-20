"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidebarSettingsHistory = void 0;
const ui_1 = require("./libs/ui");
const ui_three_1 = require("./libs/ui.three");
function SidebarSettingsHistory(editor) {
    const strings = editor.strings;
    const signals = editor.signals;
    const config = editor.config;
    const history = editor.history;
    const container = new ui_1.UIPanel();
    container.add(new ui_1.UIText(strings.getKey('sidebar/history').toUpperCase()));
    //
    const persistent = new ui_three_1.UIBoolean(config.getKey('settings/history'), strings.getKey('sidebar/history/persistent'));
    persistent.setPosition('absolute').setRight('8px');
    persistent.onChange(function () {
        const value = this.getValue();
        config.setKey('settings/history', value);
        if (value) {
            alert('The history will be preserved across sessions.\nThis can have an impact on performance when working with textures.');
            const lastUndoCmd = history.undos[history.undos.length - 1];
            const lastUndoId = lastUndoCmd !== undefined ? lastUndoCmd.id : 0;
            editor.history.enableSerialization(lastUndoId);
        }
        else {
            signals.historyChanged.dispatch();
        }
    });
    container.add(persistent);
    container.add(new ui_1.UIBreak(), new ui_1.UIBreak());
    let ignoreObjectSelectedSignal = false;
    const outliner = new ui_three_1.UIOutliner(editor);
    outliner.onChange(function () {
        ignoreObjectSelectedSignal = true;
        editor.history.goToState(parseInt(outliner.getValue()));
        ignoreObjectSelectedSignal = false;
    });
    container.add(outliner);
    //
    const refreshUI = function () {
        const options = [];
        function buildOption(object) {
            const option = document.createElement('div');
            option.value = object.id;
            return option;
        }
        (function addObjects(objects) {
            for (let i = 0, l = objects.length; i < l; i += 1) {
                const object = objects[i];
                const option = buildOption(object);
                option.innerHTML = '&nbsp;' + object.name;
                options.push(option);
            }
        })(history.undos);
        (function addObjects(objects) {
            for (let i = objects.length - 1; i >= 0; i -= 1) {
                const object = objects[i];
                const option = buildOption(object);
                option.innerHTML = '&nbsp;' + object.name;
                option.style.opacity = 0.3;
                options.push(option);
            }
        })(history.redos);
        outliner.setOptions(options);
    };
    refreshUI();
    // events
    signals.editorCleared.add(refreshUI);
    signals.historyChanged.add(refreshUI);
    signals.historyChanged.add(function (cmd) {
        if (ignoreObjectSelectedSignal === true)
            return;
        outliner.setValue(cmd !== undefined ? cmd.id : null);
    });
    return container;
}
exports.SidebarSettingsHistory = SidebarSettingsHistory;
