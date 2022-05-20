"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NodeVar {
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }
}
NodeVar.prototype.isNodeVar = true;
exports.default = NodeVar;
