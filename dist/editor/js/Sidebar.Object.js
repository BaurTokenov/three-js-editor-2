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
exports.SidebarObject = void 0;
const THREE = __importStar(require("three"));
const ui_1 = require("./libs/ui");
const ui_three_1 = require("./libs/ui.three");
const SetUuidCommand_1 = require("./commands/SetUuidCommand");
const SetValueCommand_1 = require("./commands/SetValueCommand");
const SetPositionCommand_1 = require("./commands/SetPositionCommand");
const SetRotationCommand_1 = require("./commands/SetRotationCommand");
const SetScaleCommand_1 = require("./commands/SetScaleCommand");
const SetColorCommand_1 = require("./commands/SetColorCommand");
function SidebarObject(editor) {
    const strings = editor.strings;
    const signals = editor.signals;
    const container = new ui_1.UIPanel();
    container.setBorderTop('0');
    container.setPaddingTop('20px');
    container.setDisplay('none');
    // Actions
    /*
      let objectActions = new UI.Select().setPosition( 'absolute' ).setRight( '8px' ).setFontSize( '11px' );
      objectActions.setOptions( {
  
          'Actions': 'Actions',
          'Reset Position': 'Reset Position',
          'Reset Rotation': 'Reset Rotation',
          'Reset Scale': 'Reset Scale'
  
      } );
      objectActions.onClick( function ( event ) {
  
          event.stopPropagation(); // Avoid panel collapsing
  
      } );
      objectActions.onChange( function ( event ) {
  
          let object = editor.selected;
  
          switch ( this.getValue() ) {
  
              case 'Reset Position':
                  editor.execute( new SetPositionCommand( editor, object, new Vector3( 0, 0, 0 ) ) );
                  break;
  
              case 'Reset Rotation':
                  editor.execute( new SetRotationCommand( editor, object, new Euler( 0, 0, 0 ) ) );
                  break;
  
              case 'Reset Scale':
                  editor.execute( new SetScaleCommand( editor, object, new Vector3( 1, 1, 1 ) ) );
                  break;
  
          }
  
          this.setValue( 'Actions' );
  
      } );
      container.addStatic( objectActions );
      */
    // type
    const objectTypeRow = new ui_1.UIRow();
    const objectType = new ui_1.UIText();
    objectTypeRow.add(new ui_1.UIText(strings.getKey('sidebar/object/type')).setWidth('90px'));
    objectTypeRow.add(objectType);
    container.add(objectTypeRow);
    // uuid
    const objectUUIDRow = new ui_1.UIRow();
    const objectUUID = new ui_1.UIInput().setWidth('102px').setFontSize('12px').setDisabled(true);
    const objectUUIDRenew = new ui_1.UIButton(strings.getKey('sidebar/object/new')).setMarginLeft('7px').onClick(function () {
        objectUUID.setValue(THREE.MathUtils.generateUUID());
        editor.execute(new SetUuidCommand_1.SetUuidCommand(editor, editor.selected, objectUUID.getValue()));
    });
    objectUUIDRow.add(new ui_1.UIText(strings.getKey('sidebar/object/uuid')).setWidth('90px'));
    objectUUIDRow.add(objectUUID);
    objectUUIDRow.add(objectUUIDRenew);
    container.add(objectUUIDRow);
    // name
    const objectNameRow = new ui_1.UIRow();
    const objectName = new ui_1.UIInput()
        .setWidth('150px')
        .setFontSize('12px')
        .onChange(function () {
        editor.execute(new SetValueCommand_1.SetValueCommand(editor, editor.selected, 'name', objectName.getValue()));
    });
    objectNameRow.add(new ui_1.UIText(strings.getKey('sidebar/object/name')).setWidth('90px'));
    objectNameRow.add(objectName);
    container.add(objectNameRow);
    // position
    const objectPositionRow = new ui_1.UIRow();
    const objectPositionX = new ui_1.UINumber().setPrecision(3).setWidth('50px').onChange(update);
    const objectPositionY = new ui_1.UINumber().setPrecision(3).setWidth('50px').onChange(update);
    const objectPositionZ = new ui_1.UINumber().setPrecision(3).setWidth('50px').onChange(update);
    objectPositionRow.add(new ui_1.UIText(strings.getKey('sidebar/object/position')).setWidth('90px'));
    objectPositionRow.add(objectPositionX, objectPositionY, objectPositionZ);
    container.add(objectPositionRow);
    // rotation
    const objectRotationRow = new ui_1.UIRow();
    const objectRotationX = new ui_1.UINumber().setStep(10).setNudge(0.1).setUnit('°').setWidth('50px').onChange(update);
    const objectRotationY = new ui_1.UINumber().setStep(10).setNudge(0.1).setUnit('°').setWidth('50px').onChange(update);
    const objectRotationZ = new ui_1.UINumber().setStep(10).setNudge(0.1).setUnit('°').setWidth('50px').onChange(update);
    objectRotationRow.add(new ui_1.UIText(strings.getKey('sidebar/object/rotation')).setWidth('90px'));
    objectRotationRow.add(objectRotationX, objectRotationY, objectRotationZ);
    container.add(objectRotationRow);
    // scale
    const objectScaleRow = new ui_1.UIRow();
    const objectScaleX = new ui_1.UINumber(1).setPrecision(3).setWidth('50px').onChange(update);
    const objectScaleY = new ui_1.UINumber(1).setPrecision(3).setWidth('50px').onChange(update);
    const objectScaleZ = new ui_1.UINumber(1).setPrecision(3).setWidth('50px').onChange(update);
    objectScaleRow.add(new ui_1.UIText(strings.getKey('sidebar/object/scale')).setWidth('90px'));
    objectScaleRow.add(objectScaleX, objectScaleY, objectScaleZ);
    container.add(objectScaleRow);
    // fov
    const objectFovRow = new ui_1.UIRow();
    const objectFov = new ui_1.UINumber().onChange(update);
    objectFovRow.add(new ui_1.UIText(strings.getKey('sidebar/object/fov')).setWidth('90px'));
    objectFovRow.add(objectFov);
    container.add(objectFovRow);
    // left
    const objectLeftRow = new ui_1.UIRow();
    const objectLeft = new ui_1.UINumber().onChange(update);
    objectLeftRow.add(new ui_1.UIText(strings.getKey('sidebar/object/left')).setWidth('90px'));
    objectLeftRow.add(objectLeft);
    container.add(objectLeftRow);
    // right
    const objectRightRow = new ui_1.UIRow();
    const objectRight = new ui_1.UINumber().onChange(update);
    objectRightRow.add(new ui_1.UIText(strings.getKey('sidebar/object/right')).setWidth('90px'));
    objectRightRow.add(objectRight);
    container.add(objectRightRow);
    // top
    const objectTopRow = new ui_1.UIRow();
    const objectTop = new ui_1.UINumber().onChange(update);
    objectTopRow.add(new ui_1.UIText(strings.getKey('sidebar/object/top')).setWidth('90px'));
    objectTopRow.add(objectTop);
    container.add(objectTopRow);
    // bottom
    const objectBottomRow = new ui_1.UIRow();
    const objectBottom = new ui_1.UINumber().onChange(update);
    objectBottomRow.add(new ui_1.UIText(strings.getKey('sidebar/object/bottom')).setWidth('90px'));
    objectBottomRow.add(objectBottom);
    container.add(objectBottomRow);
    // near
    const objectNearRow = new ui_1.UIRow();
    const objectNear = new ui_1.UINumber().onChange(update);
    objectNearRow.add(new ui_1.UIText(strings.getKey('sidebar/object/near')).setWidth('90px'));
    objectNearRow.add(objectNear);
    container.add(objectNearRow);
    // far
    const objectFarRow = new ui_1.UIRow();
    const objectFar = new ui_1.UINumber().onChange(update);
    objectFarRow.add(new ui_1.UIText(strings.getKey('sidebar/object/far')).setWidth('90px'));
    objectFarRow.add(objectFar);
    container.add(objectFarRow);
    // intensity
    const objectIntensityRow = new ui_1.UIRow();
    const objectIntensity = new ui_1.UINumber().onChange(update);
    objectIntensityRow.add(new ui_1.UIText(strings.getKey('sidebar/object/intensity')).setWidth('90px'));
    objectIntensityRow.add(objectIntensity);
    container.add(objectIntensityRow);
    // color
    const objectColorRow = new ui_1.UIRow();
    const objectColor = new ui_1.UIColor().onInput(update);
    objectColorRow.add(new ui_1.UIText(strings.getKey('sidebar/object/color')).setWidth('90px'));
    objectColorRow.add(objectColor);
    container.add(objectColorRow);
    // ground color
    const objectGroundColorRow = new ui_1.UIRow();
    const objectGroundColor = new ui_1.UIColor().onInput(update);
    objectGroundColorRow.add(new ui_1.UIText(strings.getKey('sidebar/object/groundcolor')).setWidth('90px'));
    objectGroundColorRow.add(objectGroundColor);
    container.add(objectGroundColorRow);
    // distance
    const objectDistanceRow = new ui_1.UIRow();
    const objectDistance = new ui_1.UINumber().setRange(0, Infinity).onChange(update);
    objectDistanceRow.add(new ui_1.UIText(strings.getKey('sidebar/object/distance')).setWidth('90px'));
    objectDistanceRow.add(objectDistance);
    container.add(objectDistanceRow);
    // angle
    const objectAngleRow = new ui_1.UIRow();
    const objectAngle = new ui_1.UINumber()
        .setPrecision(3)
        .setRange(0, Math.PI / 2)
        .onChange(update);
    objectAngleRow.add(new ui_1.UIText(strings.getKey('sidebar/object/angle')).setWidth('90px'));
    objectAngleRow.add(objectAngle);
    container.add(objectAngleRow);
    // penumbra
    const objectPenumbraRow = new ui_1.UIRow();
    const objectPenumbra = new ui_1.UINumber().setRange(0, 1).onChange(update);
    objectPenumbraRow.add(new ui_1.UIText(strings.getKey('sidebar/object/penumbra')).setWidth('90px'));
    objectPenumbraRow.add(objectPenumbra);
    container.add(objectPenumbraRow);
    // decay
    const objectDecayRow = new ui_1.UIRow();
    const objectDecay = new ui_1.UINumber().setRange(0, Infinity).onChange(update);
    objectDecayRow.add(new ui_1.UIText(strings.getKey('sidebar/object/decay')).setWidth('90px'));
    objectDecayRow.add(objectDecay);
    container.add(objectDecayRow);
    // shadow
    const objectShadowRow = new ui_1.UIRow();
    objectShadowRow.add(new ui_1.UIText(strings.getKey('sidebar/object/shadow')).setWidth('90px'));
    const objectCastShadow = new ui_three_1.UIBoolean(false, strings.getKey('sidebar/object/cast')).onChange(update);
    objectShadowRow.add(objectCastShadow);
    const objectReceiveShadow = new ui_three_1.UIBoolean(false, strings.getKey('sidebar/object/receive')).onChange(update);
    objectShadowRow.add(objectReceiveShadow);
    container.add(objectShadowRow);
    // shadow bias
    const objectShadowBiasRow = new ui_1.UIRow();
    objectShadowBiasRow.add(new ui_1.UIText(strings.getKey('sidebar/object/shadowBias')).setWidth('90px'));
    const objectShadowBias = new ui_1.UINumber(0).setPrecision(5).setStep(0.0001).setNudge(0.00001).onChange(update);
    objectShadowBiasRow.add(objectShadowBias);
    container.add(objectShadowBiasRow);
    // shadow normal offset
    const objectShadowNormalBiasRow = new ui_1.UIRow();
    objectShadowNormalBiasRow.add(new ui_1.UIText(strings.getKey('sidebar/object/shadowNormalBias')).setWidth('90px'));
    const objectShadowNormalBias = new ui_1.UINumber(0).onChange(update);
    objectShadowNormalBiasRow.add(objectShadowNormalBias);
    container.add(objectShadowNormalBiasRow);
    // shadow radius
    const objectShadowRadiusRow = new ui_1.UIRow();
    objectShadowRadiusRow.add(new ui_1.UIText(strings.getKey('sidebar/object/shadowRadius')).setWidth('90px'));
    const objectShadowRadius = new ui_1.UINumber(1).onChange(update);
    objectShadowRadiusRow.add(objectShadowRadius);
    container.add(objectShadowRadiusRow);
    // visible
    const objectVisibleRow = new ui_1.UIRow();
    const objectVisible = new ui_1.UICheckbox().onChange(update);
    objectVisibleRow.add(new ui_1.UIText(strings.getKey('sidebar/object/visible')).setWidth('90px'));
    objectVisibleRow.add(objectVisible);
    container.add(objectVisibleRow);
    // frustumCulled
    const objectFrustumCulledRow = new ui_1.UIRow();
    const objectFrustumCulled = new ui_1.UICheckbox().onChange(update);
    objectFrustumCulledRow.add(new ui_1.UIText(strings.getKey('sidebar/object/frustumcull')).setWidth('90px'));
    objectFrustumCulledRow.add(objectFrustumCulled);
    container.add(objectFrustumCulledRow);
    // renderOrder
    const objectRenderOrderRow = new ui_1.UIRow();
    const objectRenderOrder = new ui_1.UIInteger().setWidth('50px').onChange(update);
    objectRenderOrderRow.add(new ui_1.UIText(strings.getKey('sidebar/object/renderorder')).setWidth('90px'));
    objectRenderOrderRow.add(objectRenderOrder);
    container.add(objectRenderOrderRow);
    // user data
    const objectUserDataRow = new ui_1.UIRow();
    const objectUserData = new ui_1.UITextArea().setWidth('150px').setHeight('40px').setFontSize('12px').onChange(update);
    objectUserData.onKeyUp(function () {
        try {
            JSON.parse(objectUserData.getValue());
            objectUserData.dom.classList.add('success');
            objectUserData.dom.classList.remove('fail');
        }
        catch (error) {
            objectUserData.dom.classList.remove('success');
            objectUserData.dom.classList.add('fail');
        }
    });
    objectUserDataRow.add(new ui_1.UIText(strings.getKey('sidebar/object/userdata')).setWidth('90px'));
    objectUserDataRow.add(objectUserData);
    container.add(objectUserDataRow);
    //
    function update() {
        const object = editor.selected;
        if (object !== null) {
            const newPosition = new THREE.Vector3(objectPositionX.getValue(), objectPositionY.getValue(), objectPositionZ.getValue());
            if (object.position.distanceTo(newPosition) >= 0.01) {
                editor.execute(new SetPositionCommand_1.SetPositionCommand(editor, object, newPosition));
            }
            const newRotation = new THREE.Euler(objectRotationX.getValue() * THREE.MathUtils.DEG2RAD, objectRotationY.getValue() * THREE.MathUtils.DEG2RAD, objectRotationZ.getValue() * THREE.MathUtils.DEG2RAD);
            if (new THREE.Vector3().setFromEuler(object.rotation).distanceTo(new THREE.Vector3().setFromEuler(newRotation)) >=
                0.01) {
                editor.execute(new SetRotationCommand_1.SetRotationCommand(editor, object, newRotation));
            }
            const newScale = new THREE.Vector3(objectScaleX.getValue(), objectScaleY.getValue(), objectScaleZ.getValue());
            if (object.scale.distanceTo(newScale) >= 0.01) {
                editor.execute(new SetScaleCommand_1.SetScaleCommand(editor, object, newScale));
            }
            if (object.fov !== undefined && Math.abs(object.fov - objectFov.getValue()) >= 0.01) {
                editor.execute(new SetValueCommand_1.SetValueCommand(editor, object, 'fov', objectFov.getValue()));
                object.updateProjectionMatrix();
            }
            if (object.left !== undefined && Math.abs(object.left - objectLeft.getValue()) >= 0.01) {
                editor.execute(new SetValueCommand_1.SetValueCommand(editor, object, 'left', objectLeft.getValue()));
                object.updateProjectionMatrix();
            }
            if (object.right !== undefined && Math.abs(object.right - objectRight.getValue()) >= 0.01) {
                editor.execute(new SetValueCommand_1.SetValueCommand(editor, object, 'right', objectRight.getValue()));
                object.updateProjectionMatrix();
            }
            if (object.top !== undefined && Math.abs(object.top - objectTop.getValue()) >= 0.01) {
                editor.execute(new SetValueCommand_1.SetValueCommand(editor, object, 'top', objectTop.getValue()));
                object.updateProjectionMatrix();
            }
            if (object.bottom !== undefined && Math.abs(object.bottom - objectBottom.getValue()) >= 0.01) {
                editor.execute(new SetValueCommand_1.SetValueCommand(editor, object, 'bottom', objectBottom.getValue()));
                object.updateProjectionMatrix();
            }
            if (object.near !== undefined && Math.abs(object.near - objectNear.getValue()) >= 0.01) {
                editor.execute(new SetValueCommand_1.SetValueCommand(editor, object, 'near', objectNear.getValue()));
                if (object.isOrthographicCamera) {
                    object.updateProjectionMatrix();
                }
            }
            if (object.far !== undefined && Math.abs(object.far - objectFar.getValue()) >= 0.01) {
                editor.execute(new SetValueCommand_1.SetValueCommand(editor, object, 'far', objectFar.getValue()));
                if (object.isOrthographicCamera) {
                    object.updateProjectionMatrix();
                }
            }
            if (object.intensity !== undefined && Math.abs(object.intensity - objectIntensity.getValue()) >= 0.01) {
                editor.execute(new SetValueCommand_1.SetValueCommand(editor, object, 'intensity', objectIntensity.getValue()));
            }
            if (object.color !== undefined && object.color.getHex() !== objectColor.getHexValue()) {
                editor.execute(new SetColorCommand_1.SetColorCommand(editor, object, 'color', objectColor.getHexValue()));
            }
            if (object.groundColor !== undefined && object.groundColor.getHex() !== objectGroundColor.getHexValue()) {
                editor.execute(new SetColorCommand_1.SetColorCommand(editor, object, 'groundColor', objectGroundColor.getHexValue()));
            }
            if (object.distance !== undefined && Math.abs(object.distance - objectDistance.getValue()) >= 0.01) {
                editor.execute(new SetValueCommand_1.SetValueCommand(editor, object, 'distance', objectDistance.getValue()));
            }
            if (object.angle !== undefined && Math.abs(object.angle - objectAngle.getValue()) >= 0.01) {
                editor.execute(new SetValueCommand_1.SetValueCommand(editor, object, 'angle', objectAngle.getValue()));
            }
            if (object.penumbra !== undefined && Math.abs(object.penumbra - objectPenumbra.getValue()) >= 0.01) {
                editor.execute(new SetValueCommand_1.SetValueCommand(editor, object, 'penumbra', objectPenumbra.getValue()));
            }
            if (object.decay !== undefined && Math.abs(object.decay - objectDecay.getValue()) >= 0.01) {
                editor.execute(new SetValueCommand_1.SetValueCommand(editor, object, 'decay', objectDecay.getValue()));
            }
            if (object.visible !== objectVisible.getValue()) {
                editor.execute(new SetValueCommand_1.SetValueCommand(editor, object, 'visible', objectVisible.getValue()));
            }
            if (object.frustumCulled !== objectFrustumCulled.getValue()) {
                editor.execute(new SetValueCommand_1.SetValueCommand(editor, object, 'frustumCulled', objectFrustumCulled.getValue()));
            }
            if (object.renderOrder !== objectRenderOrder.getValue()) {
                editor.execute(new SetValueCommand_1.SetValueCommand(editor, object, 'renderOrder', objectRenderOrder.getValue()));
            }
            if (object.castShadow !== undefined && object.castShadow !== objectCastShadow.getValue()) {
                editor.execute(new SetValueCommand_1.SetValueCommand(editor, object, 'castShadow', objectCastShadow.getValue()));
            }
            if (object.receiveShadow !== objectReceiveShadow.getValue()) {
                if (object.material !== undefined)
                    object.material.needsUpdate = true;
                editor.execute(new SetValueCommand_1.SetValueCommand(editor, object, 'receiveShadow', objectReceiveShadow.getValue()));
            }
            if (object.shadow !== undefined) {
                if (object.shadow.bias !== objectShadowBias.getValue()) {
                    editor.execute(new SetValueCommand_1.SetValueCommand(editor, object.shadow, 'bias', objectShadowBias.getValue()));
                }
                if (object.shadow.normalBias !== objectShadowNormalBias.getValue()) {
                    editor.execute(new SetValueCommand_1.SetValueCommand(editor, object.shadow, 'normalBias', objectShadowNormalBias.getValue()));
                }
                if (object.shadow.radius !== objectShadowRadius.getValue()) {
                    editor.execute(new SetValueCommand_1.SetValueCommand(editor, object.shadow, 'radius', objectShadowRadius.getValue()));
                }
            }
            try {
                const userData = JSON.parse(objectUserData.getValue());
                if (JSON.stringify(object.userData) != JSON.stringify(userData)) {
                    editor.execute(new SetValueCommand_1.SetValueCommand(editor, object, 'userData', userData));
                }
            }
            catch (exception) {
                console.warn(exception);
            }
        }
    }
    function updateRows(object) {
        const properties = {
            fov: objectFovRow,
            left: objectLeftRow,
            right: objectRightRow,
            top: objectTopRow,
            bottom: objectBottomRow,
            near: objectNearRow,
            far: objectFarRow,
            intensity: objectIntensityRow,
            color: objectColorRow,
            groundColor: objectGroundColorRow,
            distance: objectDistanceRow,
            angle: objectAngleRow,
            penumbra: objectPenumbraRow,
            decay: objectDecayRow,
            castShadow: objectShadowRow,
            receiveShadow: objectReceiveShadow,
            shadow: [objectShadowBiasRow, objectShadowNormalBiasRow, objectShadowRadiusRow],
        };
        for (const property in properties) {
            const uiElement = properties[property];
            if (Array.isArray(uiElement) === true) {
                for (let i = 0; i < uiElement.length; i += 1) {
                    uiElement[i].setDisplay(object[property] !== undefined ? '' : 'none');
                }
            }
            else {
                uiElement.setDisplay(object[property] !== undefined ? '' : 'none');
            }
        }
        //
        if (object.isLight) {
            objectReceiveShadow.setDisplay('none');
        }
        if (object.isAmbientLight || object.isHemisphereLight) {
            objectShadowRow.setDisplay('none');
        }
    }
    function updateTransformRows(object) {
        if (object.isLight || (object.isObject3D && object.userData.targetInverse)) {
            objectRotationRow.setDisplay('none');
            objectScaleRow.setDisplay('none');
        }
        else {
            objectRotationRow.setDisplay('');
            objectScaleRow.setDisplay('');
        }
    }
    // events
    signals.objectSelected.add(function (object) {
        if (object !== null) {
            container.setDisplay('block');
            updateRows(object);
            updateUI(object);
        }
        else {
            container.setDisplay('none');
        }
    });
    signals.objectChanged.add(function (object) {
        if (object !== editor.selected)
            return;
        updateUI(object);
    });
    signals.refreshSidebarObject3D.add(function (object) {
        if (object !== editor.selected)
            return;
        updateUI(object);
    });
    function updateUI(object) {
        objectType.setValue(object.type);
        objectUUID.setValue(object.uuid);
        objectName.setValue(object.name);
        objectPositionX.setValue(object.position.x);
        objectPositionY.setValue(object.position.y);
        objectPositionZ.setValue(object.position.z);
        objectRotationX.setValue(object.rotation.x * THREE.MathUtils.RAD2DEG);
        objectRotationY.setValue(object.rotation.y * THREE.MathUtils.RAD2DEG);
        objectRotationZ.setValue(object.rotation.z * THREE.MathUtils.RAD2DEG);
        objectScaleX.setValue(object.scale.x);
        objectScaleY.setValue(object.scale.y);
        objectScaleZ.setValue(object.scale.z);
        if (object.fov !== undefined) {
            objectFov.setValue(object.fov);
        }
        if (object.left !== undefined) {
            objectLeft.setValue(object.left);
        }
        if (object.right !== undefined) {
            objectRight.setValue(object.right);
        }
        if (object.top !== undefined) {
            objectTop.setValue(object.top);
        }
        if (object.bottom !== undefined) {
            objectBottom.setValue(object.bottom);
        }
        if (object.near !== undefined) {
            objectNear.setValue(object.near);
        }
        if (object.far !== undefined) {
            objectFar.setValue(object.far);
        }
        if (object.intensity !== undefined) {
            objectIntensity.setValue(object.intensity);
        }
        if (object.color !== undefined) {
            objectColor.setHexValue(object.color.getHexString());
        }
        if (object.groundColor !== undefined) {
            objectGroundColor.setHexValue(object.groundColor.getHexString());
        }
        if (object.distance !== undefined) {
            objectDistance.setValue(object.distance);
        }
        if (object.angle !== undefined) {
            objectAngle.setValue(object.angle);
        }
        if (object.penumbra !== undefined) {
            objectPenumbra.setValue(object.penumbra);
        }
        if (object.decay !== undefined) {
            objectDecay.setValue(object.decay);
        }
        if (object.castShadow !== undefined) {
            objectCastShadow.setValue(object.castShadow);
        }
        if (object.receiveShadow !== undefined) {
            objectReceiveShadow.setValue(object.receiveShadow);
        }
        if (object.shadow !== undefined) {
            objectShadowBias.setValue(object.shadow.bias);
            objectShadowNormalBias.setValue(object.shadow.normalBias);
            objectShadowRadius.setValue(object.shadow.radius);
        }
        objectVisible.setValue(object.visible);
        objectFrustumCulled.setValue(object.frustumCulled);
        objectRenderOrder.setValue(object.renderOrder);
        try {
            objectUserData.setValue(JSON.stringify(object.userData, null, '  '));
        }
        catch (error) {
            console.log(error);
        }
        objectUserData.setBorderColor('transparent');
        objectUserData.setBackgroundColor('');
        updateTransformRows(object);
    }
    return container;
}
exports.SidebarObject = SidebarObject;
