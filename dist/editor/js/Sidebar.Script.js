"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidebarScript = void 0;
const ui_1 = require("./libs/ui");
const AddScriptCommand_1 = require("./commands/AddScriptCommand");
const SetScriptValueCommand_1 = require("./commands/SetScriptValueCommand");
const RemoveScriptCommand_1 = require("./commands/RemoveScriptCommand");
function SidebarScript(editor) {
    const strings = editor.strings;
    const signals = editor.signals;
    const container = new ui_1.UIPanel();
    container.setDisplay('none');
    container.add(new ui_1.UIText(strings.getKey('sidebar/script')).setTextTransform('uppercase'));
    container.add(new ui_1.UIBreak());
    container.add(new ui_1.UIBreak());
    //
    const scriptsContainer = new ui_1.UIRow();
    container.add(scriptsContainer);
    const newScript = new ui_1.UIButton(strings.getKey('sidebar/script/new'));
    newScript.onClick(function () {
        const script = { name: '', source: 'function update( event ) {}' };
        editor.execute(new AddScriptCommand_1.AddScriptCommand(editor, editor.selected, script));
    });
    container.add(newScript);
    /*
      let loadScript = new UI.Button( 'Load' );
      loadScript.setMarginLeft( '4px' );
      container.add( loadScript );
      */
    //
    function update() {
        scriptsContainer.clear();
        scriptsContainer.setDisplay('none');
        const object = editor.selected;
        if (object === null) {
            return;
        }
        const scripts = editor.scripts[object.uuid];
        if (scripts !== undefined && scripts.length > 0) {
            scriptsContainer.setDisplay('block');
            for (let i = 0; i < scripts.length; i += 1) {
                (function (object, script) {
                    const name = new ui_1.UIInput(script.name).setWidth('130px').setFontSize('12px');
                    name.onChange(function () {
                        editor.execute(new SetScriptValueCommand_1.SetScriptValueCommand(editor, editor.selected, script, 'name', this.getValue()));
                    });
                    scriptsContainer.add(name);
                    const edit = new ui_1.UIButton(strings.getKey('sidebar/script/edit'));
                    edit.setMarginLeft('4px');
                    edit.onClick(function () {
                        signals.editScript.dispatch(object, script);
                    });
                    scriptsContainer.add(edit);
                    const remove = new ui_1.UIButton(strings.getKey('sidebar/script/remove'));
                    remove.setMarginLeft('4px');
                    remove.onClick(function () {
                        if (confirm('Are you sure?')) {
                            editor.execute(new RemoveScriptCommand_1.RemoveScriptCommand(editor, editor.selected, script));
                        }
                    });
                    scriptsContainer.add(remove);
                    scriptsContainer.add(new ui_1.UIBreak());
                })(object, scripts[i]);
            }
        }
    }
    // signals
    signals.objectSelected.add(function (object) {
        if (object !== null && editor.camera !== object) {
            container.setDisplay('block');
            update();
        }
        else {
            container.setDisplay('none');
        }
    });
    signals.scriptAdded.add(update);
    signals.scriptRemoved.add(update);
    signals.scriptChanged.add(update);
    return container;
}
exports.SidebarScript = SidebarScript;
