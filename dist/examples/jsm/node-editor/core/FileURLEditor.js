"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileURLEditor = void 0;
const flow_module_1 = require("../../libs/flow.module");
const BaseNode_1 = require("./BaseNode");
const DataFile_1 = require("./DataFile");
class FileURLEditor extends BaseNode_1.BaseNode {
    constructor() {
        const dataFile = new DataFile_1.DataFile();
        super('File URL', 1, dataFile, 250);
        const urlInput = new flow_module_1.StringInput().onChange(() => {
            if (urlInput.getValue() !== dataFile.getURL()) {
                dataFile.setValue(urlInput.getValue());
                this.invalidate();
            }
        });
        this.add(new flow_module_1.Element().add(urlInput));
    }
}
exports.FileURLEditor = FileURLEditor;
