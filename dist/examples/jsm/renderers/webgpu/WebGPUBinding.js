"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WebGPUBinding {
    constructor(name = '') {
        this.name = name;
        this.visibility = null;
        this.type = null; // read-only
        this.isShared = false;
    }
    setVisibility(visibility) {
        this.visibility = visibility;
    }
}
exports.default = WebGPUBinding;
