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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidebarGeometry = void 0;
const THREE = __importStar(require("three"));
const ui_1 = require("./libs/ui");
const SetGeometryValueCommand_1 = require("./commands/SetGeometryValueCommand");
const Sidebar_Geometry_BufferGeometry_1 = require("./Sidebar.Geometry.BufferGeometry");
const Sidebar_Geometry_Modifiers_1 = require("./Sidebar.Geometry.Modifiers");
const VertexNormalsHelper_1 = require("../../examples/jsm/helpers/VertexNormalsHelper");
function SidebarGeometry(editor) {
    const strings = editor.strings;
    const signals = editor.signals;
    const container = new ui_1.UIPanel();
    container.setBorderTop('0');
    container.setDisplay('none');
    container.setPaddingTop('20px');
    let currentGeometryType = null;
    // Actions
    /*
      let objectActions = new UISelect().setPosition( 'absolute' ).setRight( '8px' ).setFontSize( '11px' );
      objectActions.setOptions( {
  
          'Actions': 'Actions',
          'Center': 'Center',
          'Convert': 'Convert',
          'Flatten': 'Flatten'
  
      } );
      objectActions.onClick( function ( event ) {
  
          event.stopPropagation(); // Avoid panel collapsing
  
      } );
      objectActions.onChange( function ( event ) {
  
          let action = this.getValue();
  
          let object = editor.selected;
          let geometry = object.geometry;
  
          if ( confirm( action + ' ' + object.name + '?' ) === false ) return;
  
          switch ( action ) {
  
              case 'Center':
  
                  let offset = geometry.center();
  
                  let newPosition = object.position.clone();
                  newPosition.sub( offset );
                  editor.execute( new SetPositionCommand( editor, object, newPosition ) );
  
                  editor.signals.geometryChanged.dispatch( object );
  
                  break;
  
              case 'Flatten':
  
                  let newGeometry = geometry.clone();
                  newGeometry.uuid = geometry.uuid;
                  newGeometry.applyMatrix( object.matrix );
  
                  let cmds = [ new SetGeometryCommand( editor, object, newGeometry ),
                      new SetPositionCommand( editor, object, new THREE.Vector3( 0, 0, 0 ) ),
                      new SetRotationCommand( editor, object, new THREE.Euler( 0, 0, 0 ) ),
                      new SetScaleCommand( editor, object, new THREE.Vector3( 1, 1, 1 ) ) ];
  
                  editor.execute( new MultiCmdsCommand( editor, cmds ), 'Flatten Geometry' );
  
                  break;
  
          }
  
          this.setValue( 'Actions' );
  
      } );
      container.addStatic( objectActions );
      */
    // type
    const geometryTypeRow = new ui_1.UIRow();
    const geometryType = new ui_1.UIText();
    geometryTypeRow.add(new ui_1.UIText(strings.getKey('sidebar/geometry/type')).setWidth('90px'));
    geometryTypeRow.add(geometryType);
    container.add(geometryTypeRow);
    // uuid
    const geometryUUIDRow = new ui_1.UIRow();
    const geometryUUID = new ui_1.UIInput().setWidth('102px').setFontSize('12px').setDisabled(true);
    const geometryUUIDRenew = new ui_1.UIButton(strings.getKey('sidebar/geometry/new'))
        .setMarginLeft('7px')
        .onClick(function () {
        geometryUUID.setValue(THREE.MathUtils.generateUUID());
        editor.execute(new SetGeometryValueCommand_1.SetGeometryValueCommand(editor, editor.selected, 'uuid', geometryUUID.getValue()));
    });
    geometryUUIDRow.add(new ui_1.UIText(strings.getKey('sidebar/geometry/uuid')).setWidth('90px'));
    geometryUUIDRow.add(geometryUUID);
    geometryUUIDRow.add(geometryUUIDRenew);
    container.add(geometryUUIDRow);
    // name
    const geometryNameRow = new ui_1.UIRow();
    const geometryName = new ui_1.UIInput()
        .setWidth('150px')
        .setFontSize('12px')
        .onChange(function () {
        editor.execute(new SetGeometryValueCommand_1.SetGeometryValueCommand(editor, editor.selected, 'name', geometryName.getValue()));
    });
    geometryNameRow.add(new ui_1.UIText(strings.getKey('sidebar/geometry/name')).setWidth('90px'));
    geometryNameRow.add(geometryName);
    container.add(geometryNameRow);
    // parameters
    const parameters = new ui_1.UISpan();
    container.add(parameters);
    // buffergeometry
    container.add(new Sidebar_Geometry_BufferGeometry_1.SidebarGeometryBufferGeometry(editor));
    // Size
    const geometryBoundingBox = new ui_1.UIText().setFontSize('12px');
    const geometryBoundingBoxRow = new ui_1.UIRow();
    geometryBoundingBoxRow.add(new ui_1.UIText(strings.getKey('sidebar/geometry/bounds')).setWidth('90px'));
    geometryBoundingBoxRow.add(geometryBoundingBox);
    container.add(geometryBoundingBoxRow);
    // Helpers
    const helpersRow = new ui_1.UIRow().setPaddingLeft('90px');
    container.add(helpersRow);
    const vertexNormalsButton = new ui_1.UIButton(strings.getKey('sidebar/geometry/show_vertex_normals'));
    vertexNormalsButton.onClick(function () {
        const object = editor.selected;
        if (editor.helpers[object.id] === undefined) {
            editor.addHelper(object, new VertexNormalsHelper_1.VertexNormalsHelper(object));
        }
        else {
            editor.removeHelper(object);
        }
        signals.sceneGraphChanged.dispatch();
    });
    helpersRow.add(vertexNormalsButton);
    function build() {
        return __awaiter(this, void 0, void 0, function* () {
            const object = editor.selected;
            if (object && object.geometry) {
                const geometry = object.geometry;
                container.setDisplay('block');
                geometryType.setValue(geometry.type);
                geometryUUID.setValue(geometry.uuid);
                geometryName.setValue(geometry.name);
                //
                if (currentGeometryType !== geometry.type) {
                    parameters.clear();
                    if (geometry.type === 'BufferGeometry') {
                        parameters.add(new Sidebar_Geometry_Modifiers_1.SidebarGeometryModifiers(editor, object));
                    }
                    else {
                        const { GeometryParametersPanel } = yield Promise.resolve().then(() => __importStar(require(`./Sidebar.Geometry.${geometry.type}.js`)));
                        parameters.add(new GeometryParametersPanel(editor, object));
                    }
                    currentGeometryType = geometry.type;
                }
                if (geometry.boundingBox === null)
                    geometry.computeBoundingBox();
                const boundingBox = geometry.boundingBox;
                const x = Math.floor((boundingBox.max.x - boundingBox.min.x) * 1000) / 1000;
                const y = Math.floor((boundingBox.max.y - boundingBox.min.y) * 1000) / 1000;
                const z = Math.floor((boundingBox.max.z - boundingBox.min.z) * 1000) / 1000;
                geometryBoundingBox.setInnerHTML(`${x}<br/>${y}<br/>${z}`);
                helpersRow.setDisplay(geometry.hasAttribute('normal') ? '' : 'none');
            }
            else {
                container.setDisplay('none');
            }
        });
    }
    signals.objectSelected.add(function () {
        currentGeometryType = null;
        build();
    });
    signals.geometryChanged.add(build);
    return container;
}
exports.SidebarGeometry = SidebarGeometry;
