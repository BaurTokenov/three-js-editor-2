"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NodeAttribute {
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }
}
NodeAttribute.prototype.isNodeAttribute = true;
exports.default = NodeAttribute;
