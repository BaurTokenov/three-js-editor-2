"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NodeVary {
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }
}
NodeVary.prototype.isNodeVary = true;
exports.default = NodeVary;
