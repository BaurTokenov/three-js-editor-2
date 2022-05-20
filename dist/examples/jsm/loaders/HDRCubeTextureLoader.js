"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HDRCubeTextureLoader = void 0;
const three_1 = require("three");
const RGBELoader_1 = require("../loaders/RGBELoader");
class HDRCubeTextureLoader extends three_1.Loader {
    constructor(manager) {
        super(manager);
        this.hdrLoader = new RGBELoader_1.RGBELoader();
        this.type = three_1.HalfFloatType;
    }
    load(urls, onLoad, onProgress, onError) {
        if (!Array.isArray(urls)) {
            console.warn('THREE.HDRCubeTextureLoader signature has changed. Use .setDataType() instead.');
            this.setDataType(urls);
            urls = onLoad;
            onLoad = onProgress;
            onProgress = onError;
            onError = arguments[4];
        }
        const texture = new three_1.CubeTexture();
        texture.type = this.type;
        switch (texture.type) {
            case three_1.FloatType:
                texture.encoding = three_1.LinearEncoding;
                texture.minFilter = three_1.LinearFilter;
                texture.magFilter = three_1.LinearFilter;
                texture.generateMipmaps = false;
                break;
            case three_1.HalfFloatType:
                texture.encoding = three_1.LinearEncoding;
                texture.minFilter = three_1.LinearFilter;
                texture.magFilter = three_1.LinearFilter;
                texture.generateMipmaps = false;
                break;
        }
        const scope = this;
        let loaded = 0;
        function loadHDRData(i, onLoad, onProgress, onError) {
            new three_1.FileLoader(scope.manager)
                .setPath(scope.path)
                .setResponseType('arraybuffer')
                .setWithCredentials(scope.withCredentials)
                .load(urls[i], function (buffer) {
                loaded++;
                const texData = scope.hdrLoader.parse(buffer);
                if (!texData)
                    return;
                if (texData.data !== undefined) {
                    const dataTexture = new three_1.DataTexture(texData.data, texData.width, texData.height);
                    dataTexture.type = texture.type;
                    dataTexture.encoding = texture.encoding;
                    dataTexture.format = texture.format;
                    dataTexture.minFilter = texture.minFilter;
                    dataTexture.magFilter = texture.magFilter;
                    dataTexture.generateMipmaps = texture.generateMipmaps;
                    texture.images[i] = dataTexture;
                }
                if (loaded === 6) {
                    texture.needsUpdate = true;
                    if (onLoad)
                        onLoad(texture);
                }
            }, onProgress, onError);
        }
        for (let i = 0; i < urls.length; i += 1) {
            loadHDRData(i, onLoad, onProgress, onError);
        }
        return texture;
    }
    setDataType(value) {
        this.type = value;
        this.hdrLoader.setDataType(value);
        return this;
    }
}
exports.HDRCubeTextureLoader = HDRCubeTextureLoader;
