"use strict";
/**
 * MDD is a special format that stores a position for every vertex in a model for every frame in an animation.
 * Similar to BVH, it can be used to transfer animation data between different 3D applications or engines.
 *
 * MDD stores its data in binary format (big endian) in the following way:
 *
 * number of frames (a single uint32)
 * number of vertices (a single uint32)
 * time values for each frame (sequence of float32)
 * vertex data for each frame (sequence of float32)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MDDLoader = void 0;
const three_1 = require("three");
class MDDLoader extends three_1.Loader {
    constructor(manager) {
        super(manager);
    }
    load(url, onLoad, onProgress, onError) {
        const scope = this;
        const loader = new three_1.FileLoader(this.manager);
        loader.setPath(this.path);
        loader.setResponseType('arraybuffer');
        loader.load(url, function (data) {
            onLoad(scope.parse(data));
        }, onProgress, onError);
    }
    parse(data) {
        const view = new DataView(data);
        const totalFrames = view.getUint32(0);
        const totalPoints = view.getUint32(4);
        let offset = 8;
        // animation clip
        const times = new Float32Array(totalFrames);
        const values = new Float32Array(totalFrames * totalFrames).fill(0);
        for (let i = 0; i < totalFrames; i++) {
            times[i] = view.getFloat32(offset);
            offset += 4;
            values[(totalFrames * i) + i] = 1;
        }
        const track = new three_1.NumberKeyframeTrack('.morphTargetInfluences', times, values);
        const clip = new three_1.AnimationClip('default', times[times.length - 1], [track]);
        // morph targets
        const morphTargets = [];
        for (let i = 0; i < totalFrames; i++) {
            const morphTarget = new Float32Array(totalPoints * 3);
            for (let j = 0; j < totalPoints; j++) {
                const stride = (j * 3);
                morphTarget[stride + 0] = view.getFloat32(offset);
                offset += 4; // x
                morphTarget[stride + 1] = view.getFloat32(offset);
                offset += 4; // y
                morphTarget[stride + 2] = view.getFloat32(offset);
                offset += 4; // z
            }
            const attribute = new three_1.BufferAttribute(morphTarget, 3);
            attribute.name = 'morph_' + i;
            morphTargets.push(attribute);
        }
        return {
            morphTargets: morphTargets,
            clip: clip
        };
    }
}
exports.MDDLoader = MDDLoader;
