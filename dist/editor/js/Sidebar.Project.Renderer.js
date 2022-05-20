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
exports.SidebarProjectRenderer = void 0;
const THREE = __importStar(require("three"));
const ui_1 = require("./libs/ui");
const ui_three_1 = require("./libs/ui.three");
function SidebarProjectRenderer(editor) {
    const config = editor.config;
    const signals = editor.signals;
    const strings = editor.strings;
    let currentRenderer = null;
    const container = new ui_1.UIPanel();
    const headerRow = new ui_1.UIRow();
    headerRow.add(new ui_1.UIText(strings.getKey('sidebar/project/renderer').toUpperCase()));
    container.add(headerRow);
    // Antialias
    const antialiasRow = new ui_1.UIRow();
    container.add(antialiasRow);
    antialiasRow.add(new ui_1.UIText(strings.getKey('sidebar/project/antialias')).setWidth('90px'));
    const antialiasBoolean = new ui_three_1.UIBoolean(config.getKey('project/renderer/antialias')).onChange(createRenderer);
    antialiasRow.add(antialiasBoolean);
    // Physically Correct lights
    const physicallyCorrectLightsRow = new ui_1.UIRow();
    container.add(physicallyCorrectLightsRow);
    physicallyCorrectLightsRow.add(new ui_1.UIText(strings.getKey('sidebar/project/physicallyCorrectLights')).setWidth('90px'));
    const physicallyCorrectLightsBoolean = new ui_three_1.UIBoolean(config.getKey('project/renderer/physicallyCorrectLights')).onChange(function () {
        currentRenderer.physicallyCorrectLights = this.getValue();
        signals.rendererUpdated.dispatch();
    });
    physicallyCorrectLightsRow.add(physicallyCorrectLightsBoolean);
    // Shadows
    const shadowsRow = new ui_1.UIRow();
    container.add(shadowsRow);
    shadowsRow.add(new ui_1.UIText(strings.getKey('sidebar/project/shadows')).setWidth('90px'));
    const shadowsBoolean = new ui_three_1.UIBoolean(config.getKey('project/renderer/shadows')).onChange(updateShadows);
    shadowsRow.add(shadowsBoolean);
    const shadowTypeSelect = new ui_1.UISelect()
        .setOptions({
        0: 'Basic',
        1: 'PCF',
        2: 'PCF Soft',
        //	3: 'VSM'
    })
        .setWidth('125px')
        .onChange(updateShadows);
    shadowTypeSelect.setValue(config.getKey('project/renderer/shadowType'));
    shadowsRow.add(shadowTypeSelect);
    function updateShadows() {
        currentRenderer.shadowMap.enabled = shadowsBoolean.getValue();
        currentRenderer.shadowMap.type = parseFloat(shadowTypeSelect.getValue());
        signals.rendererUpdated.dispatch();
    }
    // Tonemapping
    const toneMappingRow = new ui_1.UIRow();
    container.add(toneMappingRow);
    toneMappingRow.add(new ui_1.UIText(strings.getKey('sidebar/project/toneMapping')).setWidth('90px'));
    const toneMappingSelect = new ui_1.UISelect()
        .setOptions({
        0: 'No',
        1: 'Linear',
        2: 'Reinhard',
        3: 'Cineon',
        4: 'ACESFilmic',
    })
        .setWidth('120px')
        .onChange(updateToneMapping);
    toneMappingSelect.setValue(config.getKey('project/renderer/toneMapping'));
    toneMappingRow.add(toneMappingSelect);
    const toneMappingExposure = new ui_1.UINumber(config.getKey('project/renderer/toneMappingExposure'));
    toneMappingExposure.setDisplay(toneMappingSelect.getValue() === '0' ? 'none' : '');
    toneMappingExposure.setWidth('30px').setMarginLeft('10px');
    toneMappingExposure.setRange(0, 10);
    toneMappingExposure.onChange(updateToneMapping);
    toneMappingRow.add(toneMappingExposure);
    function updateToneMapping() {
        toneMappingExposure.setDisplay(toneMappingSelect.getValue() === '0' ? 'none' : '');
        currentRenderer.toneMapping = parseFloat(toneMappingSelect.getValue());
        currentRenderer.toneMappingExposure = toneMappingExposure.getValue();
        signals.rendererUpdated.dispatch();
    }
    //
    function createRenderer() {
        currentRenderer = new THREE.WebGLRenderer({ antialias: antialiasBoolean.getValue() });
        currentRenderer.outputEncoding = THREE.sRGBEncoding;
        currentRenderer.physicallyCorrectLights = physicallyCorrectLightsBoolean.getValue();
        currentRenderer.shadowMap.enabled = shadowsBoolean.getValue();
        currentRenderer.shadowMap.type = parseFloat(shadowTypeSelect.getValue());
        currentRenderer.toneMapping = parseFloat(toneMappingSelect.getValue());
        currentRenderer.toneMappingExposure = toneMappingExposure.getValue();
        signals.rendererCreated.dispatch(currentRenderer);
        signals.rendererUpdated.dispatch();
    }
    createRenderer();
    // Signals
    signals.editorCleared.add(function () {
        currentRenderer.physicallyCorrectLights = false;
        currentRenderer.shadowMap.enabled = true;
        currentRenderer.shadowMap.type = THREE.PCFShadowMap;
        currentRenderer.toneMapping = THREE.NoToneMapping;
        currentRenderer.toneMappingExposure = 1;
        physicallyCorrectLightsBoolean.setValue(currentRenderer.physicallyCorrectLights);
        shadowsBoolean.setValue(currentRenderer.shadowMap.enabled);
        shadowTypeSelect.setValue(currentRenderer.shadowMap.type);
        toneMappingSelect.setValue(currentRenderer.toneMapping);
        toneMappingExposure.setValue(currentRenderer.toneMappingExposure);
        toneMappingExposure.setDisplay(currentRenderer.toneMapping === 0 ? 'none' : '');
        signals.rendererUpdated.dispatch();
    });
    signals.rendererUpdated.add(function () {
        config.setKey('project/renderer/antialias', antialiasBoolean.getValue(), 'project/renderer/physicallyCorrectLights', physicallyCorrectLightsBoolean.getValue(), 'project/renderer/shadows', shadowsBoolean.getValue(), 'project/renderer/shadowType', parseFloat(shadowTypeSelect.getValue()), 'project/renderer/toneMapping', parseFloat(toneMappingSelect.getValue()), 'project/renderer/toneMappingExposure', toneMappingExposure.getValue());
    });
    return container;
}
exports.SidebarProjectRenderer = SidebarProjectRenderer;
