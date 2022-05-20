"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NodeParser_1 = __importDefault(require("../core/NodeParser"));
const WGSLNodeFunction_1 = __importDefault(require("./WGSLNodeFunction"));
class WGSLNodeParser extends NodeParser_1.default {
    parseFunction(source) {
        return new WGSLNodeFunction_1.default(source);
    }
}
exports.default = WGSLNodeParser;
