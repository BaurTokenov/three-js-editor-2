"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NodeLoader_1 = __importDefault(require("./NodeLoader"));
const NodeMaterialLoader_1 = __importDefault(require("./NodeMaterialLoader"));
const three_1 = require("three");
class NodeObjectLoader extends three_1.ObjectLoader {
    constructor(manager) {
        super(manager);
        this._nodesJSON = null;
    }
    parse(json, onLoad) {
        this._nodesJSON = json.nodes;
        const data = super.parse(json, onLoad);
        this._nodesJSON = null; // dispose
        return data;
    }
    parseNodes(json, textures) {
        if (json !== undefined) {
            const loader = new NodeLoader_1.default();
            loader.setTextures(textures);
            return loader.parseNodes(json);
        }
        return {};
    }
    parseMaterials(json, textures) {
        const materials = {};
        if (json !== undefined) {
            const nodes = this.parseNodes(this._nodesJSON, textures);
            const loader = new NodeMaterialLoader_1.default();
            loader.setTextures(textures);
            loader.setNodes(nodes);
            for (let i = 0, l = json.length; i < l; i += 1) {
                const data = json[i];
                materials[data.uuid] = loader.parse(data);
            }
        }
        return materials;
    }
}
exports.default = NodeObjectLoader;
