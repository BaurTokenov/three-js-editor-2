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
exports.KMZLoader = void 0;
const three_1 = require("three");
const ColladaLoader_1 = require("../loaders/ColladaLoader");
const fflate = __importStar(require("../libs/fflate.module"));
class KMZLoader extends three_1.Loader {
    constructor(manager) {
        super(manager);
    }
    load(url, onLoad, onProgress, onError) {
        const scope = this;
        const loader = new three_1.FileLoader(scope.manager);
        loader.setPath(scope.path);
        loader.setResponseType('arraybuffer');
        loader.setRequestHeader(scope.requestHeader);
        loader.setWithCredentials(scope.withCredentials);
        loader.load(url, function (text) {
            try {
                onLoad(scope.parse(text));
            }
            catch (e) {
                if (onError) {
                    onError(e);
                }
                else {
                    console.error(e);
                }
                scope.manager.itemError(url);
            }
        }, onProgress, onError);
    }
    parse(data) {
        function findFile(url) {
            for (const path in zip) {
                if (path.slice(-url.length) === url) {
                    return zip[path];
                }
            }
        }
        const manager = new three_1.LoadingManager();
        manager.setURLModifier(function (url) {
            const image = findFile(url);
            if (image) {
                console.log('Loading', url);
                const blob = new Blob([image.buffer], { type: 'application/octet-stream' });
                return URL.createObjectURL(blob);
            }
            return url;
        });
        //
        const zip = fflate.unzipSync(new Uint8Array(data)); // eslint-disable-line no-undef
        if (zip['doc.kml']) {
            const xml = new DOMParser().parseFromString(fflate.strFromU8(zip['doc.kml']), 'application/xml'); // eslint-disable-line no-undef
            const model = xml.querySelector('Placemark Model Link href');
            if (model) {
                const loader = new ColladaLoader_1.ColladaLoader(manager);
                return loader.parse(fflate.strFromU8(zip[model.textContent])); // eslint-disable-line no-undef
            }
        }
        else {
            console.warn('KMZLoader: Missing doc.kml file.');
            for (const path in zip) {
                const extension = path.split('.').pop().toLowerCase();
                if (extension === 'dae') {
                    const loader = new ColladaLoader_1.ColladaLoader(manager);
                    return loader.parse(fflate.strFromU8(zip[path])); // eslint-disable-line no-undef
                }
            }
        }
        console.error("KMZLoader: Couldn't find .dae file.");
        return { scene: new three_1.Group() };
    }
}
exports.KMZLoader = KMZLoader;
