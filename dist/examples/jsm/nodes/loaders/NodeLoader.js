"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Nodes = __importStar(require("../Nodes"));
const three_1 = require("three");
class NodeLoader extends three_1.Loader {
    constructor(manager) {
        super(manager);
        this.textures = {};
    }
    load(url, onLoad, onProgress, onError) {
        const loader = new FileLoader(this.manager);
        loader.setPath(this.path);
        loader.setRequestHeader(this.requestHeader);
        loader.setWithCredentials(this.withCredentials);
        loader.load(url, (text) => {
            try {
                onLoad(this.parse(JSON.parse(text)));
            }
            catch (e) {
                if (onError) {
                    onError(e);
                }
                else {
                    console.error(e);
                }
                this.manager.itemError(url);
            }
        }, onProgress, onError);
    }
    parseNodes(json) {
        const nodes = {};
        if (json !== undefined) {
            for (const nodeJSON of json) {
                const { uuid, type } = nodeJSON;
                nodes[uuid] = Nodes.fromType(type);
                nodes[uuid].uuid = uuid;
            }
            const meta = { nodes, textures: this.textures };
            for (const nodeJSON of json) {
                nodeJSON.meta = meta;
                const node = nodes[nodeJSON.uuid];
                node.deserialize(nodeJSON);
                delete nodeJSON.meta;
            }
        }
        return nodes;
    }
    parse(json) {
        const node = Nodes.fromType(type);
        node.uuid = json.uuid;
        const nodes = this.parseNodes(json.inputNodes);
        const meta = { nodes, textures: this.textures };
        json.meta = meta;
        node.deserialize(json);
        delete json.meta;
        return node;
    }
    setTextures(value) {
        this.textures = value;
        return this;
    }
}
exports.default = NodeLoader;
