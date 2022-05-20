"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MorphAnimMesh = void 0;
const three_1 = require("three");
class MorphAnimMesh extends three_1.Mesh {
    constructor(geometry, material) {
        super(geometry, material);
        this.type = 'MorphAnimMesh';
        this.mixer = new three_1.AnimationMixer(this);
        this.activeAction = null;
    }
    setDirectionForward() {
        this.mixer.timeScale = 1.0;
    }
    setDirectionBackward() {
        this.mixer.timeScale = -1.0;
    }
    playAnimation(label, fps) {
        if (this.activeAction) {
            this.activeAction.stop();
            this.activeAction = null;
        }
        const clip = three_1.AnimationClip.findByName(this, label);
        if (clip) {
            const action = this.mixer.clipAction(clip);
            action.timeScale = (clip.tracks.length * fps) / clip.duration;
            this.activeAction = action.play();
        }
        else {
            throw new Error('THREE.MorphAnimMesh: animations[' + label + '] undefined in .playAnimation()');
        }
    }
    updateAnimation(delta) {
        this.mixer.update(delta);
    }
    copy(source) {
        super.copy(source);
        this.mixer = new three_1.AnimationMixer(this);
        return this;
    }
}
exports.MorphAnimMesh = MorphAnimMesh;
