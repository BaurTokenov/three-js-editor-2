"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidebarMaterialMapProperty = void 0;
const THREE = __importStar(require("three"));
const ui_1 = require("./libs/ui");
const ui_three_1 = require("./libs/ui.three");
const SetMaterialMapCommand_1 = require("./commands/SetMaterialMapCommand");
const SetMaterialValueCommand_1 = require("./commands/SetMaterialValueCommand");
const SetMaterialVectorCommand_1 = require("./commands/SetMaterialVectorCommand");
function SidebarMaterialMapProperty(editor, property, name) {
    const signals = editor.signals;
    const container = new ui_1.UIRow();
    container.add(new ui_1.UIText(name).setWidth('90px'));
    const enabled = new ui_1.UICheckbox(false).setMarginRight('8px').onChange(onChange);
    container.add(enabled);
    const map = new ui_three_1.UITexture().onChange(onMapChange);
    container.add(map);
    const mapType = property.replace('Map', '');
    let intensity;
    if (property === 'aoMap') {
        intensity = new ui_1.UINumber().setWidth('30px').onChange(onIntensityChange);
        container.add(intensity);
    }
    let scale;
    if (property === 'bumpMap' || property === 'displacementMap') {
        scale = new ui_1.UINumber().setWidth('30px').onChange(onScaleChange);
        container.add(scale);
    }
    let scaleX, scaleY;
    if (property === 'normalMap' || property === 'clearcoatNormalMap') {
        scaleX = new ui_1.UINumber().setWidth('30px').onChange(onScaleXYChange);
        container.add(scaleX);
        scaleY = new ui_1.UINumber().setWidth('30px').onChange(onScaleXYChange);
        container.add(scaleY);
    }
    let object = null;
    let material = null;
    function onChange() {
        const newMap = enabled.getValue() ? map.getValue() : null;
        if (material[property] !== newMap) {
            if (newMap !== null) {
                const geometry = object.geometry;
                if (geometry.hasAttribute('uv') === false)
                    console.warn("Geometry doesn't have uvs:", geometry);
                if (property === 'envMap')
                    newMap.mapping = THREE.EquirectangularReflectionMapping;
            }
            editor.execute(new SetMaterialMapCommand_1.SetMaterialMapCommand(editor, object, property, newMap, 0 /* TODO: currentMaterialSlot */));
        }
    }
    function onMapChange(texture) {
        if (texture !== null) {
            if (texture.isDataTexture !== true && texture.encoding !== THREE.sRGBEncoding) {
                texture.encoding = THREE.sRGBEncoding;
                material.needsUpdate = true;
            }
        }
        enabled.setDisabled(false);
        onChange();
    }
    function onIntensityChange() {
        if (material[`${property}Intensity`] !== intensity.getValue()) {
            editor.execute(new SetMaterialValueCommand_1.SetMaterialValueCommand(editor, object, `${property}Intensity`, intensity.getValue(), 0 /* TODO: currentMaterialSlot */));
        }
    }
    function onScaleChange() {
        if (material[`${mapType}Scale`] !== scale.getValue()) {
            editor.execute(new SetMaterialValueCommand_1.SetMaterialValueCommand(editor, object, `${mapType}Scale`, scale.getValue(), 0 /* TODO: currentMaterialSlot */));
        }
    }
    function onScaleXYChange() {
        const value = [scaleX.getValue(), scaleY.getValue()];
        if (material[`${mapType}Scale`].x !== value[0] || material[`${mapType}Scale`].y !== value[1]) {
            editor.execute(new SetMaterialVectorCommand_1.SetMaterialVectorCommand(editor, object, `${mapType}Scale`, value, 0 /* TODOL currentMaterialSlot */));
        }
    }
    function update() {
        if (object === null)
            return;
        if (object.material === undefined)
            return;
        material = object.material;
        if (property in material) {
            if (material[property] !== null) {
                map.setValue(material[property]);
            }
            enabled.setValue(material[property] !== null);
            enabled.setDisabled(map.getValue() === null);
            if (intensity !== undefined) {
                intensity.setValue(material[`${property}Intensity`]);
            }
            if (scale !== undefined) {
                scale.setValue(material[`${mapType}Scale`]);
            }
            if (scaleX !== undefined) {
                scaleX.setValue(material[`${mapType}Scale`].x);
                scaleY.setValue(material[`${mapType}Scale`].y);
            }
            container.setDisplay('');
        }
        else {
            container.setDisplay('none');
        }
    }
    //
    signals.objectSelected.add(function (selected) {
        object = selected;
        map.setValue(null);
        update();
    });
    signals.materialChanged.add(update);
    return container;
}
exports.SidebarMaterialMapProperty = SidebarMaterialMapProperty;
