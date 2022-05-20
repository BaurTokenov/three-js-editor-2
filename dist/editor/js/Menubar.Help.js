"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenubarHelp = void 0;
const ui_1 = require("./libs/ui");
function MenubarHelp(editor) {
    const strings = editor.strings;
    const container = new ui_1.UIPanel();
    container.setClass('menu');
    const title = new ui_1.UIPanel();
    title.setClass('title');
    title.setTextContent(strings.getKey('menubar/help'));
    container.add(title);
    const options = new ui_1.UIPanel();
    options.setClass('options');
    container.add(options);
    // Source code
    let option = new ui_1.UIRow();
    option.setClass('option');
    option.setTextContent(strings.getKey('menubar/help/source_code'));
    option.onClick(function () {
        window.open('https://github.com/mrdoob/three.js/tree/master/editor', '_blank');
    });
    options.add(option);
    /*
      // Icon
  
      let option = new UIRow();
      option.setClass( 'option' );
      option.setTextContent( strings.getKey( 'menubar/help/icons' ) );
      option.onClick( function () {
  
          window.open( 'https://www.flaticon.com/packs/interface-44', '_blank' );
  
      } );
      options.add( option );
      */
    // About
    option = new ui_1.UIRow();
    option.setClass('option');
    option.setTextContent(strings.getKey('menubar/help/about'));
    option.onClick(function () {
        window.open('https://threejs.org', '_blank');
    });
    options.add(option);
    // Manual
    option = new ui_1.UIRow();
    option.setClass('option');
    option.setTextContent(strings.getKey('menubar/help/manual'));
    option.onClick(function () {
        window.open('https://github.com/mrdoob/three.js/wiki/Editor-Manual', '_blank');
    });
    options.add(option);
    return container;
}
exports.MenubarHelp = MenubarHelp;
