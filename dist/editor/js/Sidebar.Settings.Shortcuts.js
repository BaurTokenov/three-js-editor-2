"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidebarSettingsShortcuts = void 0;
const ui_1 = require("./libs/ui");
const RemoveObjectCommand_1 = require("./commands/RemoveObjectCommand");
function SidebarSettingsShortcuts(editor) {
    const strings = editor.strings;
    const IS_MAC = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    function isValidKeyBinding(key) {
        return key.match(/^[A-Za-z0-9]$/i); // Can't use z currently due to undo/redo
    }
    const config = editor.config;
    const signals = editor.signals;
    const container = new ui_1.UIPanel();
    const headerRow = new ui_1.UIRow();
    headerRow.add(new ui_1.UIText(strings.getKey('sidebar/settings/shortcuts').toUpperCase()));
    container.add(headerRow);
    const shortcuts = ['translate', 'rotate', 'scale', 'undo', 'focus'];
    function createShortcutInput(name) {
        const configName = 'settings/shortcuts/' + name;
        const shortcutRow = new ui_1.UIRow();
        const shortcutInput = new ui_1.UIInput().setWidth('15px').setFontSize('12px');
        shortcutInput.setTextAlign('center');
        shortcutInput.setTextTransform('lowercase');
        shortcutInput.onChange(function () {
            const value = shortcutInput.getValue().toLowerCase();
            if (isValidKeyBinding(value)) {
                config.setKey(configName, value);
            }
        });
        // Automatically highlight when selecting an input field
        shortcutInput.dom.addEventListener('click', function () {
            shortcutInput.dom.select();
        });
        // If the value of the input field is invalid, revert the input field
        // to contain the key binding stored in config
        shortcutInput.dom.addEventListener('blur', function () {
            if (!isValidKeyBinding(shortcutInput.getValue())) {
                shortcutInput.setValue(config.getKey(configName));
            }
        });
        // If a valid key binding character is entered, blur the input field
        shortcutInput.dom.addEventListener('keyup', function (event) {
            if (isValidKeyBinding(event.key)) {
                shortcutInput.dom.blur();
            }
        });
        if (config.getKey(configName) !== undefined) {
            shortcutInput.setValue(config.getKey(configName));
        }
        shortcutInput.dom.maxLength = 1;
        shortcutRow.add(new ui_1.UIText(strings.getKey('sidebar/settings/shortcuts/' + name))
            .setTextTransform('capitalize')
            .setWidth('90px'));
        shortcutRow.add(shortcutInput);
        container.add(shortcutRow);
    }
    for (let i = 0; i < shortcuts.length; i += 1) {
        createShortcutInput(shortcuts[i]);
    }
    editor.domElement.addEventListener('keydown', function (event) {
        switch (event.key.toLowerCase()) {
            case 'backspace':
            // event.preventDefault(); // prevent browser back
            // fall-through
            case 'delete':
                const object = editor.selected;
                if (object === null)
                    return;
                const parent = object.parent;
                if (parent !== null)
                    editor.execute(new RemoveObjectCommand_1.RemoveObjectCommand(editor, object));
                break;
            case config.getKey('settings/shortcuts/translate'):
                signals.transformModeChanged.dispatch('translate');
                break;
            case config.getKey('settings/shortcuts/rotate'):
                signals.transformModeChanged.dispatch('rotate');
                break;
            case config.getKey('settings/shortcuts/scale'):
                signals.transformModeChanged.dispatch('scale');
                break;
            case config.getKey('settings/shortcuts/undo'):
                if (IS_MAC ? event.metaKey : event.ctrlKey) {
                    event.preventDefault(); // Prevent browser specific hotkeys
                    if (event.shiftKey) {
                        editor.redo();
                    }
                    else {
                        editor.undo();
                    }
                }
                break;
            case config.getKey('settings/shortcuts/focus'):
                if (editor.selected !== null) {
                    editor.focus(editor.selected);
                }
                break;
        }
    });
    return container;
}
exports.SidebarSettingsShortcuts = SidebarSettingsShortcuts;
