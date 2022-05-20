"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NodeParser_1 = __importDefault(require("../core/NodeParser"));
const GLSLNodeFunction_1 = __importDefault(require("./GLSLNodeFunction"));
class GLSLNodeParser extends NodeParser_1.default {
    parseFunction(source) {
        return new GLSLNodeFunction_1.default(source);
    }
}
exports.default = GLSLNodeParser;
