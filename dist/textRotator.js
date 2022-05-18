"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelloWrapper = exports.RotatingText = void 0;
var react_1 = __importDefault(require("react"));
var RotatingText = function (_a) {
    var text = _a.text;
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("p", null, text)));
};
exports.RotatingText = RotatingText;
var HelloWrapper = function (_a) {
    var text = _a.text;
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("p", null,
            "Hello ",
            text)));
};
exports.HelloWrapper = HelloWrapper;
