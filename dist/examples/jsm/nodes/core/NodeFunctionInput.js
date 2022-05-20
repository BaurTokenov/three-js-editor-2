"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NodeFunctionInput {
    constructor(type, name, count = null, qualifier = '', isConst = false) {
        this.type = type;
        this.name = name;
        this.count = count;
        this.qualifier = qualifier;
        this.isConst = isConst;
    }
}
NodeFunctionInput.isNodeFunctionInput = true;
exports.default = NodeFunctionInput;
