"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileEditor = void 0;
const flow_module_1 = require("../../libs/flow.module");
const BaseNode_1 = require("./BaseNode");
const DataFile_1 = require("./DataFile");
class FileEditor extends BaseNode_1.BaseNode {
    constructor(file) {
        const dataFile = new DataFile_1.DataFile(file);
        super('File', 1, dataFile, 250);
        this.file = file;
        this.nameInput = new flow_module_1.StringInput(file.name).setReadOnly(true);
        this.add(new flow_module_1.Element().add(this.nameInput));
    }
}
exports.FileEditor = FileEditor;
