"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidebarProperties = void 0;
const ui_1 = require("./libs/ui");
const Sidebar_Object_1 = require("./Sidebar.Object");
const Sidebar_Geometry_1 = require("./Sidebar.Geometry");
const Sidebar_Material_1 = require("./Sidebar.Material");
function SidebarProperties(editor, setPositionFunction) {
    const strings = editor.strings;
    const container = new ui_1.UITabbedPanel();
    container.setId('properties');
    container.addTab('object', strings.getKey('sidebar/properties/object'), new Sidebar_Object_1.SidebarObject(editor, setPositionFunction));
    container.addTab('geometry', strings.getKey('sidebar/properties/geometry'), new Sidebar_Geometry_1.SidebarGeometry(editor));
    container.addTab('material', strings.getKey('sidebar/properties/material'), new Sidebar_Material_1.SidebarMaterial(editor));
    container.select('object');
    return container;
}
exports.SidebarProperties = SidebarProperties;
