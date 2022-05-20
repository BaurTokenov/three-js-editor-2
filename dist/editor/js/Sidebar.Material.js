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
exports.SidebarMaterial = void 0;
const THREE = __importStar(require("three"));
const ui_1 = require("./libs/ui");
const SetMaterialCommand_1 = require("./commands/SetMaterialCommand");
const SetMaterialValueCommand_1 = require("./commands/SetMaterialValueCommand");
const Sidebar_Material_BooleanProperty_1 = require("./Sidebar.Material.BooleanProperty");
const Sidebar_Material_ColorProperty_1 = require("./Sidebar.Material.ColorProperty");
const Sidebar_Material_ConstantProperty_1 = require("./Sidebar.Material.ConstantProperty");
const Sidebar_Material_MapProperty_1 = require("./Sidebar.Material.MapProperty");
const Sidebar_Material_NumberProperty_1 = require("./Sidebar.Material.NumberProperty");
const Sidebar_Material_Program_1 = require("./Sidebar.Material.Program");
function SidebarMaterial(editor) {
    const signals = editor.signals;
    const strings = editor.strings;
    let currentObject;
    let currentMaterialSlot = 0;
    const container = new ui_1.UIPanel();
    container.setBorderTop('0');
    container.setDisplay('none');
    container.setPaddingTop('20px');
    // Current material slot
    const materialSlotRow = new ui_1.UIRow();
    materialSlotRow.add(new ui_1.UIText(strings.getKey('sidebar/material/slot')).setWidth('90px'));
    const materialSlotSelect = new ui_1.UISelect().setWidth('170px').setFontSize('12px').onChange(update);
    materialSlotSelect.setOptions({ 0: '' }).setValue(0);
    materialSlotRow.add(materialSlotSelect);
    container.add(materialSlotRow);
    // type
    const materialClassRow = new ui_1.UIRow();
    const materialClass = new ui_1.UISelect().setWidth('150px').setFontSize('12px').onChange(update);
    materialClassRow.add(new ui_1.UIText(strings.getKey('sidebar/material/type')).setWidth('90px'));
    materialClassRow.add(materialClass);
    container.add(materialClassRow);
    // uuid
    const materialUUIDRow = new ui_1.UIRow();
    const materialUUID = new ui_1.UIInput().setWidth('102px').setFontSize('12px').setDisabled(true);
    const materialUUIDRenew = new ui_1.UIButton(strings.getKey('sidebar/material/new')).setMarginLeft('7px');
    materialUUIDRenew.onClick(function () {
        materialUUID.setValue(THREE.MathUtils.generateUUID());
        update();
    });
    materialUUIDRow.add(new ui_1.UIText(strings.getKey('sidebar/material/uuid')).setWidth('90px'));
    materialUUIDRow.add(materialUUID);
    materialUUIDRow.add(materialUUIDRenew);
    container.add(materialUUIDRow);
    // name
    const materialNameRow = new ui_1.UIRow();
    const materialName = new ui_1.UIInput()
        .setWidth('150px')
        .setFontSize('12px')
        .onChange(function () {
        editor.execute(new SetMaterialValueCommand_1.SetMaterialValueCommand(editor, editor.selected, 'name', materialName.getValue(), currentMaterialSlot));
    });
    materialNameRow.add(new ui_1.UIText(strings.getKey('sidebar/material/name')).setWidth('90px'));
    materialNameRow.add(materialName);
    container.add(materialNameRow);
    // program
    const materialProgram = new Sidebar_Material_Program_1.SidebarMaterialProgram(editor, 'vertexShader');
    container.add(materialProgram);
    // color
    const materialColor = new Sidebar_Material_ColorProperty_1.SidebarMaterialColorProperty(editor, 'color', strings.getKey('sidebar/material/color'));
    container.add(materialColor);
    // specular
    const materialSpecular = new Sidebar_Material_ColorProperty_1.SidebarMaterialColorProperty(editor, 'specular', strings.getKey('sidebar/material/specular'));
    container.add(materialSpecular);
    // shininess
    const materialShininess = new Sidebar_Material_NumberProperty_1.SidebarMaterialNumberProperty(editor, 'shininess', strings.getKey('sidebar/material/shininess'));
    container.add(materialShininess);
    // emissive
    const materialEmissive = new Sidebar_Material_ColorProperty_1.SidebarMaterialColorProperty(editor, 'emissive', strings.getKey('sidebar/material/emissive'));
    container.add(materialEmissive);
    // reflectivity
    const materialReflectivity = new Sidebar_Material_NumberProperty_1.SidebarMaterialNumberProperty(editor, 'reflectivity', strings.getKey('sidebar/material/reflectivity'));
    container.add(materialReflectivity);
    // roughness
    const materialRoughness = new Sidebar_Material_NumberProperty_1.SidebarMaterialNumberProperty(editor, 'roughness', strings.getKey('sidebar/material/roughness'), [0, 1]);
    container.add(materialRoughness);
    // metalness
    const materialMetalness = new Sidebar_Material_NumberProperty_1.SidebarMaterialNumberProperty(editor, 'metalness', strings.getKey('sidebar/material/metalness'), [0, 1]);
    container.add(materialMetalness);
    // clearcoat
    const materialClearcoat = new Sidebar_Material_NumberProperty_1.SidebarMaterialNumberProperty(editor, 'clearcoat', strings.getKey('sidebar/material/clearcoat'), [0, 1]);
    container.add(materialClearcoat);
    // clearcoatRoughness
    const materialClearcoatRoughness = new Sidebar_Material_NumberProperty_1.SidebarMaterialNumberProperty(editor, 'clearcoatRoughness', strings.getKey('sidebar/material/clearcoatroughness'), [0, 1]);
    container.add(materialClearcoatRoughness);
    // transmission
    const materialTransmission = new Sidebar_Material_NumberProperty_1.SidebarMaterialNumberProperty(editor, 'transmission', strings.getKey('sidebar/material/transmission'), [0, 1]);
    container.add(materialTransmission);
    // attenuation distance
    const materialAttenuationDistance = new Sidebar_Material_NumberProperty_1.SidebarMaterialNumberProperty(editor, 'attenuationDistance', strings.getKey('sidebar/material/attenuationDistance'));
    container.add(materialAttenuationDistance);
    // attenuation tint
    const materialAttenuationColor = new Sidebar_Material_ColorProperty_1.SidebarMaterialColorProperty(editor, 'attenuationColor', strings.getKey('sidebar/material/attenuationColor'));
    container.add(materialAttenuationColor);
    // thickness
    const materialThickness = new Sidebar_Material_NumberProperty_1.SidebarMaterialNumberProperty(editor, 'thickness', strings.getKey('sidebar/material/thickness'));
    container.add(materialThickness);
    // vertex colors
    const materialVertexColors = new Sidebar_Material_BooleanProperty_1.SidebarMaterialBooleanProperty(editor, 'vertexColors', strings.getKey('sidebar/material/vertexcolors'));
    container.add(materialVertexColors);
    // depth packing
    const materialDepthPackingOptions = {
        [THREE.BasicDepthPacking]: 'Basic',
        [THREE.RGBADepthPacking]: 'RGBA',
    };
    const materialDepthPacking = new Sidebar_Material_ConstantProperty_1.SidebarMaterialConstantProperty(editor, 'depthPacking', strings.getKey('sidebar/material/depthPacking'), materialDepthPackingOptions);
    container.add(materialDepthPacking);
    // map
    const materialMap = new Sidebar_Material_MapProperty_1.SidebarMaterialMapProperty(editor, 'map', strings.getKey('sidebar/material/map'));
    container.add(materialMap);
    // specular map
    const materialSpecularMap = new Sidebar_Material_MapProperty_1.SidebarMaterialMapProperty(editor, 'specularMap', strings.getKey('sidebar/material/specularmap'));
    container.add(materialSpecularMap);
    // emissive map
    const materialEmissiveMap = new Sidebar_Material_MapProperty_1.SidebarMaterialMapProperty(editor, 'emissiveMap', strings.getKey('sidebar/material/emissivemap'));
    container.add(materialEmissiveMap);
    // matcap map
    const materialMatcapMap = new Sidebar_Material_MapProperty_1.SidebarMaterialMapProperty(editor, 'matcap', strings.getKey('sidebar/material/matcap'));
    container.add(materialMatcapMap);
    // alpha map
    const materialAlphaMap = new Sidebar_Material_MapProperty_1.SidebarMaterialMapProperty(editor, 'alphaMap', strings.getKey('sidebar/material/alphamap'));
    container.add(materialAlphaMap);
    // bump map
    const materialBumpMap = new Sidebar_Material_MapProperty_1.SidebarMaterialMapProperty(editor, 'bumpMap', strings.getKey('sidebar/material/bumpmap'));
    container.add(materialBumpMap);
    // normal map
    const materialNormalMap = new Sidebar_Material_MapProperty_1.SidebarMaterialMapProperty(editor, 'normalMap', strings.getKey('sidebar/material/normalmap'));
    container.add(materialNormalMap);
    // clearcoat normal map
    const materialClearcoatNormalMap = new Sidebar_Material_MapProperty_1.SidebarMaterialMapProperty(editor, 'clearcoatNormalMap', strings.getKey('sidebar/material/clearcoatnormalmap'));
    container.add(materialClearcoatNormalMap);
    // displacement map
    const materialDisplacementMap = new Sidebar_Material_MapProperty_1.SidebarMaterialMapProperty(editor, 'displacementMap', strings.getKey('sidebar/material/displacementmap'));
    container.add(materialDisplacementMap);
    // roughness map
    const materialRoughnessMap = new Sidebar_Material_MapProperty_1.SidebarMaterialMapProperty(editor, 'roughnessMap', strings.getKey('sidebar/material/roughnessmap'));
    container.add(materialRoughnessMap);
    // metalness map
    const materialMetalnessMap = new Sidebar_Material_MapProperty_1.SidebarMaterialMapProperty(editor, 'metalnessMap', strings.getKey('sidebar/material/metalnessmap'));
    container.add(materialMetalnessMap);
    // env map
    const materialEnvMap = new Sidebar_Material_MapProperty_1.SidebarMaterialMapProperty(editor, 'envMap', strings.getKey('sidebar/material/envmap'));
    container.add(materialEnvMap);
    // light map
    const materialLightMap = new Sidebar_Material_MapProperty_1.SidebarMaterialMapProperty(editor, 'lightMap', strings.getKey('sidebar/material/lightmap'));
    container.add(materialLightMap);
    // ambient occlusion map
    const materialAOMap = new Sidebar_Material_MapProperty_1.SidebarMaterialMapProperty(editor, 'aoMap', strings.getKey('sidebar/material/aomap'));
    container.add(materialAOMap);
    // gradient map
    const materialGradientMap = new Sidebar_Material_MapProperty_1.SidebarMaterialMapProperty(editor, 'gradientMap', strings.getKey('sidebar/material/gradientmap'));
    container.add(materialGradientMap);
    // side
    const materialSideOptions = {
        0: 'Front',
        1: 'Back',
        2: 'Double',
    };
    const materialSide = new Sidebar_Material_ConstantProperty_1.SidebarMaterialConstantProperty(editor, 'side', strings.getKey('sidebar/material/side'), materialSideOptions);
    container.add(materialSide);
    // size
    const materialSize = new Sidebar_Material_NumberProperty_1.SidebarMaterialNumberProperty(editor, 'size', strings.getKey('sidebar/material/size'), [
        0,
        Infinity,
    ]);
    container.add(materialSize);
    // sizeAttenuation
    const materialSizeAttenuation = new Sidebar_Material_BooleanProperty_1.SidebarMaterialBooleanProperty(editor, 'sizeAttenuation', strings.getKey('sidebar/material/sizeAttenuation'));
    container.add(materialSizeAttenuation);
    // flatShading
    const materialFlatShading = new Sidebar_Material_BooleanProperty_1.SidebarMaterialBooleanProperty(editor, 'flatShading', strings.getKey('sidebar/material/flatShading'));
    container.add(materialFlatShading);
    // blending
    const materialBlendingOptions = {
        0: 'No',
        1: 'Normal',
        2: 'Additive',
        3: 'Subtractive',
        4: 'Multiply',
        5: 'Custom',
    };
    const materialBlending = new Sidebar_Material_ConstantProperty_1.SidebarMaterialConstantProperty(editor, 'blending', strings.getKey('sidebar/material/blending'), materialBlendingOptions);
    container.add(materialBlending);
    // opacity
    const materialOpacity = new Sidebar_Material_NumberProperty_1.SidebarMaterialNumberProperty(editor, 'opacity', strings.getKey('sidebar/material/opacity'), [0, 1]);
    container.add(materialOpacity);
    // transparent
    const materialTransparent = new Sidebar_Material_BooleanProperty_1.SidebarMaterialBooleanProperty(editor, 'transparent', strings.getKey('sidebar/material/transparent'));
    container.add(materialTransparent);
    // alpha test
    const materialAlphaTest = new Sidebar_Material_NumberProperty_1.SidebarMaterialNumberProperty(editor, 'alphaTest', strings.getKey('sidebar/material/alphatest'), [0, 1]);
    container.add(materialAlphaTest);
    // depth test
    const materialDepthTest = new Sidebar_Material_BooleanProperty_1.SidebarMaterialBooleanProperty(editor, 'depthTest', strings.getKey('sidebar/material/depthtest'));
    container.add(materialDepthTest);
    // depth write
    const materialDepthWrite = new Sidebar_Material_BooleanProperty_1.SidebarMaterialBooleanProperty(editor, 'depthWrite', strings.getKey('sidebar/material/depthwrite'));
    container.add(materialDepthWrite);
    // wireframe
    const materialWireframe = new Sidebar_Material_BooleanProperty_1.SidebarMaterialBooleanProperty(editor, 'wireframe', strings.getKey('sidebar/material/wireframe'));
    container.add(materialWireframe);
    // userData
    const materialUserDataRow = new ui_1.UIRow();
    const materialUserData = new ui_1.UITextArea().setWidth('150px').setHeight('40px').setFontSize('12px').onChange(update);
    materialUserData.onKeyUp(function () {
        try {
            JSON.parse(materialUserData.getValue());
            materialUserData.dom.classList.add('success');
            materialUserData.dom.classList.remove('fail');
        }
        catch (error) {
            materialUserData.dom.classList.remove('success');
            materialUserData.dom.classList.add('fail');
        }
    });
    materialUserDataRow.add(new ui_1.UIText(strings.getKey('sidebar/material/userdata')).setWidth('90px'));
    materialUserDataRow.add(materialUserData);
    container.add(materialUserDataRow);
    //
    function update() {
        const previousSelectedSlot = currentMaterialSlot;
        currentMaterialSlot = parseInt(materialSlotSelect.getValue());
        if (currentMaterialSlot !== previousSelectedSlot)
            refreshUI();
        let material = editor.getObjectMaterial(currentObject, currentMaterialSlot);
        if (material) {
            if (material.uuid !== undefined && material.uuid !== materialUUID.getValue()) {
                editor.execute(new SetMaterialValueCommand_1.SetMaterialValueCommand(editor, currentObject, 'uuid', materialUUID.getValue(), currentMaterialSlot));
            }
            if (material.type !== materialClass.getValue()) {
                material = new materialClasses[materialClass.getValue()]();
                if (material.type === 'RawShaderMaterial') {
                    material.vertexShader = vertexShaderVariables + material.vertexShader;
                }
                if (Array.isArray(currentObject.material)) {
                    // don't remove the entire multi-material. just the material of the selected slot
                    editor.removeMaterial(currentObject.material[currentMaterialSlot]);
                }
                else {
                    editor.removeMaterial(currentObject.material);
                }
                editor.execute(new SetMaterialCommand_1.SetMaterialCommand(editor, currentObject, material, currentMaterialSlot), 'New Material: ' + materialClass.getValue());
                editor.addMaterial(material);
                // TODO Copy other references in the scene graph
                // keeping name and UUID then.
                // Also there should be means to create a unique
                // copy for the current object explicitly and to
                // attach the current material to other objects.
            }
            try {
                const userData = JSON.parse(materialUserData.getValue());
                if (JSON.stringify(material.userData) != JSON.stringify(userData)) {
                    editor.execute(new SetMaterialValueCommand_1.SetMaterialValueCommand(editor, currentObject, 'userData', userData, currentMaterialSlot));
                }
            }
            catch (exception) {
                console.warn(exception);
            }
            refreshUI();
        }
    }
    //
    function setRowVisibility() {
        const material = currentObject.material;
        if (Array.isArray(material)) {
            materialSlotRow.setDisplay('');
        }
        else {
            materialSlotRow.setDisplay('none');
        }
    }
    function refreshUI() {
        if (!currentObject)
            return;
        let material = currentObject.material;
        if (Array.isArray(material)) {
            const slotOptions = {};
            currentMaterialSlot = Math.max(0, Math.min(material.length, currentMaterialSlot));
            for (let i = 0; i < material.length; i += 1) {
                slotOptions[i] = String(i + 1) + ': ' + material[i].name;
            }
            materialSlotSelect.setOptions(slotOptions).setValue(currentMaterialSlot);
        }
        material = editor.getObjectMaterial(currentObject, currentMaterialSlot);
        if (material.uuid !== undefined) {
            materialUUID.setValue(material.uuid);
        }
        if (material.name !== undefined) {
            materialName.setValue(material.name);
        }
        if (currentObject.isMesh) {
            materialClass.setOptions(meshMaterialOptions);
        }
        else if (currentObject.isSprite) {
            materialClass.setOptions(spriteMaterialOptions);
        }
        else if (currentObject.isPoints) {
            materialClass.setOptions(pointsMaterialOptions);
        }
        else if (currentObject.isLine) {
            materialClass.setOptions(lineMaterialOptions);
        }
        materialClass.setValue(material.type);
        setRowVisibility();
        try {
            materialUserData.setValue(JSON.stringify(material.userData, null, '  '));
        }
        catch (error) {
            console.log(error);
        }
        materialUserData.setBorderColor('transparent');
        materialUserData.setBackgroundColor('');
    }
    // events
    signals.objectSelected.add(function (object) {
        let hasMaterial = false;
        if (object && object.material) {
            hasMaterial = true;
            if (Array.isArray(object.material) && object.material.length === 0) {
                hasMaterial = false;
            }
        }
        if (hasMaterial) {
            currentObject = object;
            refreshUI();
            container.setDisplay('');
        }
        else {
            currentObject = null;
            container.setDisplay('none');
        }
    });
    signals.materialChanged.add(refreshUI);
    return container;
}
exports.SidebarMaterial = SidebarMaterial;
const materialClasses = {
    LineBasicMaterial: THREE.LineBasicMaterial,
    LineDashedMaterial: THREE.LineDashedMaterial,
    MeshBasicMaterial: THREE.MeshBasicMaterial,
    MeshDepthMaterial: THREE.MeshDepthMaterial,
    MeshNormalMaterial: THREE.MeshNormalMaterial,
    MeshLambertMaterial: THREE.MeshLambertMaterial,
    MeshMatcapMaterial: THREE.MeshMatcapMaterial,
    MeshPhongMaterial: THREE.MeshPhongMaterial,
    MeshToonMaterial: THREE.MeshToonMaterial,
    MeshStandardMaterial: THREE.MeshStandardMaterial,
    MeshPhysicalMaterial: THREE.MeshPhysicalMaterial,
    RawShaderMaterial: THREE.RawShaderMaterial,
    ShaderMaterial: THREE.ShaderMaterial,
    ShadowMaterial: THREE.ShadowMaterial,
    SpriteMaterial: THREE.SpriteMaterial,
    PointsMaterial: THREE.PointsMaterial,
};
const vertexShaderVariables = [
    'uniform mat4 projectionMatrix;',
    'uniform mat4 modelViewMatrix;\n',
    'attribute vec3 position;\n\n',
].join('\n');
const meshMaterialOptions = {
    MeshBasicMaterial: 'MeshBasicMaterial',
    MeshDepthMaterial: 'MeshDepthMaterial',
    MeshNormalMaterial: 'MeshNormalMaterial',
    MeshLambertMaterial: 'MeshLambertMaterial',
    MeshMatcapMaterial: 'MeshMatcapMaterial',
    MeshPhongMaterial: 'MeshPhongMaterial',
    MeshToonMaterial: 'MeshToonMaterial',
    MeshStandardMaterial: 'MeshStandardMaterial',
    MeshPhysicalMaterial: 'MeshPhysicalMaterial',
    RawShaderMaterial: 'RawShaderMaterial',
    ShaderMaterial: 'ShaderMaterial',
    ShadowMaterial: 'ShadowMaterial',
};
const lineMaterialOptions = {
    LineBasicMaterial: 'LineBasicMaterial',
    LineDashedMaterial: 'LineDashedMaterial',
    RawShaderMaterial: 'RawShaderMaterial',
    ShaderMaterial: 'ShaderMaterial',
};
const spriteMaterialOptions = {
    SpriteMaterial: 'SpriteMaterial',
    RawShaderMaterial: 'RawShaderMaterial',
    ShaderMaterial: 'ShaderMaterial',
};
const pointsMaterialOptions = {
    PointsMaterial: 'PointsMaterial',
    RawShaderMaterial: 'RawShaderMaterial',
    ShaderMaterial: 'ShaderMaterial',
};
