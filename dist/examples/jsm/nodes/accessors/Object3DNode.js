"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const three_1 = require("three");
const Node_1 = __importDefault(require("../core/Node"));
const UniformNode_1 = __importDefault(require("../core/UniformNode"));
const constants_1 = require("../core/constants");
class Object3DNode extends Node_1.default {
    constructor(scope = Object3DNode.VIEW_MATRIX, object3d = null) {
        super();
        this.scope = scope;
        this.object3d = object3d;
        this.updateType = constants_1.NodeUpdateType.Object;
        this._uniformNode = new UniformNode_1.default(null);
    }
    getNodeType() {
        const scope = this.scope;
        if (scope === Object3DNode.WORLD_MATRIX || scope === Object3DNode.VIEW_MATRIX) {
            return 'mat4';
        }
        else if (scope === Object3DNode.NORMAL_MATRIX) {
            return 'mat3';
        }
        else if (scope === Object3DNode.POSITION || scope === Object3DNode.VIEW_POSITION) {
            return 'vec3';
        }
    }
    update(frame) {
        const object = this.object3d;
        const uniformNode = this._uniformNode;
        const scope = this.scope;
        if (scope === Object3DNode.VIEW_MATRIX) {
            uniformNode.value = object.modelViewMatrix;
        }
        else if (scope === Object3DNode.NORMAL_MATRIX) {
            uniformNode.value = object.normalMatrix;
        }
        else if (scope === Object3DNode.WORLD_MATRIX) {
            uniformNode.value = object.matrixWorld;
        }
        else if (scope === Object3DNode.POSITION) {
            uniformNode.value.setFromMatrixPosition(object.matrixWorld);
        }
        else if (scope === Object3DNode.VIEW_POSITION) {
            const camera = frame.camera;
            uniformNode.value.setFromMatrixPosition(object.matrixWorld);
            uniformNode.value.applyMatrix4(camera.matrixWorldInverse);
            //uniformNode.value.setFromMatrixPosition( object.modelViewMatrix );
        }
    }
    generate(builder) {
        const scope = this.scope;
        if (scope === Object3DNode.WORLD_MATRIX || scope === Object3DNode.VIEW_MATRIX) {
            this._uniformNode.nodeType = 'mat4';
        }
        else if (scope === Object3DNode.NORMAL_MATRIX) {
            this._uniformNode.nodeType = 'mat3';
        }
        else if (scope === Object3DNode.POSITION || scope === Object3DNode.VIEW_POSITION) {
            this._uniformNode.nodeType = 'vec3';
            this._uniformNode.value = new three_1.Vector3();
        }
        return this._uniformNode.build(builder);
    }
    serialize(data) {
        super.serialize(data);
        data.scope = this.scope;
    }
    deserialize(data) {
        super.deserialize(data);
        this.scope = data.scope;
    }
}
Object3DNode.VIEW_MATRIX = 'viewMatrix';
Object3DNode.NORMAL_MATRIX = 'normalMatrix';
Object3DNode.WORLD_MATRIX = 'worldMatrix';
Object3DNode.POSITION = 'position';
Object3DNode.VIEW_POSITION = 'viewPosition';
exports.default = Object3DNode;
