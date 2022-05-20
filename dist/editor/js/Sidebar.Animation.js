"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidebarAnimation = void 0;
const ui_1 = require("./libs/ui");
function SidebarAnimation(editor) {
    const strings = editor.strings;
    const signals = editor.signals;
    const mixer = editor.mixer;
    function getButtonText(action) {
        return action.isRunning() ? strings.getKey('sidebar/animations/stop') : strings.getKey('sidebar/animations/play');
    }
    function Animation(animation, object) {
        const action = mixer.clipAction(animation, object);
        const container = new ui_1.UIRow();
        const name = new ui_1.UIText(animation.name).setWidth('200px');
        container.add(name);
        const button = new ui_1.UIButton(getButtonText(action));
        button.onClick(function () {
            console.log(action);
            action.isRunning() ? action.stop() : action.play();
            button.setTextContent(getButtonText(action));
        });
        container.add(button);
        return container;
    }
    signals.objectSelected.add(function (object) {
        if (object !== null && object.animations.length > 0) {
            animationsList.clear();
            const animations = object.animations;
            for (const animation of animations) {
                animationsList.add(new Animation(animation, object));
            }
            container.setDisplay('');
        }
        else {
            container.setDisplay('none');
        }
    });
    signals.objectRemoved.add(function (object) {
        if (object !== null && object.animations.length > 0) {
            mixer.uncacheRoot(object);
        }
    });
    const container = new ui_1.UIPanel();
    container.setDisplay('none');
    container.add(new ui_1.UIText(strings.getKey('sidebar/animations')).setTextTransform('uppercase'));
    container.add(new ui_1.UIBreak());
    container.add(new ui_1.UIBreak());
    const animationsList = new ui_1.UIDiv();
    container.add(animationsList);
    const mixerTimeScaleRow = new ui_1.UIRow();
    const mixerTimeScaleNumber = new ui_1.UINumber(0.5).setWidth('60px').setRange(-10, 10);
    mixerTimeScaleNumber.onChange(function () {
        mixer.timeScale = mixerTimeScaleNumber.getValue();
    });
    mixerTimeScaleRow.add(new ui_1.UIText(strings.getKey('sidebar/animations/timescale')).setWidth('90px'));
    mixerTimeScaleRow.add(mixerTimeScaleNumber);
    container.add(mixerTimeScaleRow);
    return container;
}
exports.SidebarAnimation = SidebarAnimation;
