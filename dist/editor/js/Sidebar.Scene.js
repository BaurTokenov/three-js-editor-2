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
exports.SidebarScene = void 0;
const THREE = __importStar(require("three"));
const ui_1 = require("./libs/ui");
const ui_three_1 = require("./libs/ui.three");
function SidebarScene(editor) {
    const signals = editor.signals;
    const strings = editor.strings;
    const container = new ui_1.UIPanel();
    container.setBorderTop('0');
    container.setPaddingTop('20px');
    // outliner
    const nodeStates = new WeakMap();
    function buildOption(object, draggable) {
        const option = document.createElement('div');
        option.draggable = draggable;
        option.innerHTML = buildHTML(object);
        option.value = object.id;
        // opener
        if (nodeStates.has(object)) {
            const state = nodeStates.get(object);
            const opener = document.createElement('span');
            opener.classList.add('opener');
            if (object.children.length > 0) {
                opener.classList.add(state ? 'open' : 'closed');
            }
            opener.addEventListener('click', function () {
                nodeStates.set(object, nodeStates.get(object) === false); // toggle
                refreshUI();
            });
            option.insertBefore(opener, option.firstChild);
        }
        return option;
    }
    function getMaterialName(material) {
        if (Array.isArray(material)) {
            const array = [];
            for (let i = 0; i < material.length; i += 1) {
                array.push(material[i].name);
            }
            return array.join(',');
        }
        return material.name;
    }
    function escapeHTML(html) {
        return html
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }
    function getObjectType(object) {
        if (object.isScene)
            return 'Scene';
        if (object.isCamera)
            return 'Camera';
        if (object.isLight)
            return 'Light';
        if (object.isMesh)
            return 'Mesh';
        if (object.isLine)
            return 'Line';
        if (object.isPoints)
            return 'Points';
        return 'Object3D';
    }
    function buildHTML(object) {
        let html = `<span class="type ${getObjectType(object)}"></span> ${escapeHTML(object.name)}`;
        if (object.isMesh) {
            const geometry = object.geometry;
            const material = object.material;
            html += ` <span class="type Geometry"></span> ${escapeHTML(geometry.name)}`;
            html += ` <span class="type Material"></span> ${escapeHTML(getMaterialName(material))}`;
        }
        html += getScript(object.uuid);
        return html;
    }
    function getScript(uuid) {
        if (editor.scripts[uuid] !== undefined) {
            return ' <span class="type Script"></span>';
        }
        return '';
    }
    let ignoreObjectSelectedSignal = false;
    const outliner = new ui_three_1.UIOutliner(editor);
    outliner.setId('outliner');
    outliner.onChange(function () {
        ignoreObjectSelectedSignal = true;
        editor.selectById(parseInt(outliner.getValue()));
        ignoreObjectSelectedSignal = false;
    });
    outliner.onDblClick(function () {
        editor.focusById(parseInt(outliner.getValue()));
    });
    container.add(outliner);
    container.add(new ui_1.UIBreak());
    // background
    const backgroundRow = new ui_1.UIRow();
    const backgroundType = new ui_1.UISelect()
        .setOptions({
        None: '',
        Color: 'Color',
        Texture: 'Texture',
        Equirectangular: 'Equirect',
    })
        .setWidth('150px');
    backgroundType.onChange(function () {
        onBackgroundChanged();
        refreshBackgroundUI();
    });
    backgroundRow.add(new ui_1.UIText(strings.getKey('sidebar/scene/background')).setWidth('90px'));
    backgroundRow.add(backgroundType);
    const backgroundColor = new ui_1.UIColor().setValue('#000000').setMarginLeft('8px').onInput(onBackgroundChanged);
    backgroundRow.add(backgroundColor);
    const backgroundTexture = new ui_three_1.UITexture().setMarginLeft('8px').onChange(onBackgroundChanged);
    backgroundTexture.setDisplay('none');
    backgroundRow.add(backgroundTexture);
    const backgroundEquirectangularTexture = new ui_three_1.UITexture().setMarginLeft('8px').onChange(onBackgroundChanged);
    backgroundEquirectangularTexture.setDisplay('none');
    backgroundRow.add(backgroundEquirectangularTexture);
    container.add(backgroundRow);
    function onBackgroundChanged() {
        signals.sceneBackgroundChanged.dispatch(backgroundType.getValue(), backgroundColor.getHexValue(), backgroundTexture.getValue(), backgroundEquirectangularTexture.getValue());
    }
    function refreshBackgroundUI() {
        const type = backgroundType.getValue();
        backgroundType.setWidth(type === 'None' ? '150px' : '110px');
        backgroundColor.setDisplay(type === 'Color' ? '' : 'none');
        backgroundTexture.setDisplay(type === 'Texture' ? '' : 'none');
        backgroundEquirectangularTexture.setDisplay(type === 'Equirectangular' ? '' : 'none');
    }
    // environment
    const environmentRow = new ui_1.UIRow();
    const environmentType = new ui_1.UISelect()
        .setOptions({
        None: '',
        Equirectangular: 'Equirect',
        ModelViewer: 'ModelViewer',
    })
        .setWidth('150px');
    environmentType.setValue('None');
    environmentType.onChange(function () {
        onEnvironmentChanged();
        refreshEnvironmentUI();
    });
    environmentRow.add(new ui_1.UIText(strings.getKey('sidebar/scene/environment')).setWidth('90px'));
    environmentRow.add(environmentType);
    const environmentEquirectangularTexture = new ui_three_1.UITexture().setMarginLeft('8px').onChange(onEnvironmentChanged);
    environmentEquirectangularTexture.setDisplay('none');
    environmentRow.add(environmentEquirectangularTexture);
    container.add(environmentRow);
    function onEnvironmentChanged() {
        signals.sceneEnvironmentChanged.dispatch(environmentType.getValue(), environmentEquirectangularTexture.getValue());
    }
    function refreshEnvironmentUI() {
        const type = environmentType.getValue();
        environmentType.setWidth(type !== 'Equirectangular' ? '150px' : '110px');
        environmentEquirectangularTexture.setDisplay(type === 'Equirectangular' ? '' : 'none');
    }
    // fog
    function onFogChanged() {
        signals.sceneFogChanged.dispatch(fogType.getValue(), fogColor.getHexValue(), fogNear.getValue(), fogFar.getValue(), fogDensity.getValue());
    }
    function onFogSettingsChanged() {
        signals.sceneFogSettingsChanged.dispatch(fogType.getValue(), fogColor.getHexValue(), fogNear.getValue(), fogFar.getValue(), fogDensity.getValue());
    }
    const fogTypeRow = new ui_1.UIRow();
    const fogType = new ui_1.UISelect()
        .setOptions({
        None: '',
        Fog: 'Linear',
        FogExp2: 'Exponential',
    })
        .setWidth('150px');
    fogType.onChange(function () {
        onFogChanged();
        refreshFogUI();
    });
    fogTypeRow.add(new ui_1.UIText(strings.getKey('sidebar/scene/fog')).setWidth('90px'));
    fogTypeRow.add(fogType);
    container.add(fogTypeRow);
    // fog color
    const fogPropertiesRow = new ui_1.UIRow();
    fogPropertiesRow.setDisplay('none');
    fogPropertiesRow.setMarginLeft('90px');
    container.add(fogPropertiesRow);
    const fogColor = new ui_1.UIColor().setValue('#aaaaaa');
    fogColor.onInput(onFogSettingsChanged);
    fogPropertiesRow.add(fogColor);
    // fog near
    const fogNear = new ui_1.UINumber(0.1).setWidth('40px').setRange(0, Infinity).onChange(onFogSettingsChanged);
    fogPropertiesRow.add(fogNear);
    // fog far
    const fogFar = new ui_1.UINumber(50).setWidth('40px').setRange(0, Infinity).onChange(onFogSettingsChanged);
    fogPropertiesRow.add(fogFar);
    // fog density
    const fogDensity = new ui_1.UINumber(0.05)
        .setWidth('40px')
        .setRange(0, 0.1)
        .setStep(0.001)
        .setPrecision(3)
        .onChange(onFogSettingsChanged);
    fogPropertiesRow.add(fogDensity);
    //
    function refreshUI() {
        const camera = editor.camera;
        const scene = editor.scene;
        const options = [];
        options.push(buildOption(camera, false));
        options.push(buildOption(scene, false));
        (function addObjects(objects, pad) {
            for (let i = 0, l = objects.length; i < l; i += 1) {
                const object = objects[i];
                if (nodeStates.has(object) === false) {
                    nodeStates.set(object, false);
                }
                const option = buildOption(object, true);
                option.style.paddingLeft = pad * 18 + 'px';
                options.push(option);
                if (nodeStates.get(object) === true) {
                    addObjects(object.children, pad + 1);
                }
            }
        })(scene.children, 0);
        outliner.setOptions(options);
        if (editor.selected !== null) {
            outliner.setValue(editor.selected.id);
        }
        if (scene.background) {
            if (scene.background.isColor) {
                backgroundType.setValue('Color');
                backgroundColor.setHexValue(scene.background.getHex());
            }
            else if (scene.background.isTexture) {
                if (scene.background.mapping === THREE.EquirectangularReflectionMapping) {
                    backgroundType.setValue('Equirectangular');
                    backgroundEquirectangularTexture.setValue(scene.background);
                }
                else {
                    backgroundType.setValue('Texture');
                    backgroundTexture.setValue(scene.background);
                }
            }
        }
        else {
            backgroundType.setValue('None');
        }
        if (scene.environment) {
            if (scene.environment.mapping === THREE.EquirectangularReflectionMapping) {
                environmentType.setValue('Equirectangular');
                environmentEquirectangularTexture.setValue(scene.environment);
            }
        }
        else {
            environmentType.setValue('None');
        }
        if (scene.fog) {
            fogColor.setHexValue(scene.fog.color.getHex());
            if (scene.fog.isFog) {
                fogType.setValue('Fog');
                fogNear.setValue(scene.fog.near);
                fogFar.setValue(scene.fog.far);
            }
            else if (scene.fog.isFogExp2) {
                fogType.setValue('FogExp2');
                fogDensity.setValue(scene.fog.density);
            }
        }
        else {
            fogType.setValue('None');
        }
        refreshBackgroundUI();
        refreshEnvironmentUI();
        refreshFogUI();
    }
    function refreshFogUI() {
        const type = fogType.getValue();
        fogPropertiesRow.setDisplay(type === 'None' ? 'none' : '');
        fogNear.setDisplay(type === 'Fog' ? '' : 'none');
        fogFar.setDisplay(type === 'Fog' ? '' : 'none');
        fogDensity.setDisplay(type === 'FogExp2' ? '' : 'none');
    }
    refreshUI();
    // events
    signals.editorCleared.add(refreshUI);
    signals.sceneGraphChanged.add(refreshUI);
    /*
      signals.objectChanged.add( function ( object ) {
  
          let options = outliner.options;
  
          for ( let i = 0; i < options.length; i ++ ) {
  
              let option = options[ i ];
  
              if ( option.value === object.id ) {
  
                  option.innerHTML = buildHTML( object );
                  return;
  
              }
  
          }
  
      } );
      */
    signals.objectSelected.add(function (object) {
        if (ignoreObjectSelectedSignal === true)
            return;
        if (object !== null && object.parent !== null) {
            let needsRefresh = false;
            let parent = object.parent;
            while (parent !== editor.scene) {
                if (nodeStates.get(parent) !== true) {
                    nodeStates.set(parent, true);
                    needsRefresh = true;
                }
                parent = parent.parent;
            }
            if (needsRefresh)
                refreshUI();
            outliner.setValue(object.id);
        }
        else {
            outliner.setValue(null);
        }
    });
    return container;
}
exports.SidebarScene = SidebarScene;
