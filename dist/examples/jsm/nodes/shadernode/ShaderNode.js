"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConstNodeType = exports.ConvertType = exports.cacheMaps = exports.nodeImmutable = exports.nodeProxy = exports.nodeArray = exports.nodeObjects = exports.nodeObject = exports.ShaderNode = void 0;
const ArrayElementNode_1 = __importDefault(require("../utils/ArrayElementNode"));
const ConvertNode_1 = __importDefault(require("../utils/ConvertNode"));
const JoinNode_1 = __importDefault(require("../utils/JoinNode"));
const SplitNode_1 = __importDefault(require("../utils/SplitNode"));
const ConstNode_1 = __importDefault(require("../core/ConstNode"));
const NodeUtils_1 = require("../core/NodeUtils");
const shaderNodeHandler = {
    construct(NodeClosure, params) {
        const inputs = params.shift();
        return NodeClosure(exports.nodeObjects(inputs), ...params);
    },
    get: function (node, prop) {
        if (typeof prop === 'string' && node[prop] === undefined) {
            if (/^[xyzwrgbastpq]{1,4}$/.test(prop) === true) {
                // accessing properties ( swizzle )
                prop = prop.replace(/r|s/g, 'x').replace(/g|t/g, 'y').replace(/b|p/g, 'z').replace(/a|q/g, 'w');
                return exports.nodeObject(new SplitNode_1.default(node, prop));
            }
            else if (/^\d+$/.test(prop) === true) {
                // accessing array
                return exports.nodeObject(new ArrayElementNode_1.default(node, new ConstNode_1.default(Number(prop), 'uint')));
            }
        }
        return node[prop];
    },
};
const nodeObjectsCacheMap = new WeakMap();
const ShaderNodeObject = function (obj) {
    const type = typeof obj;
    if (type === 'number' || type === 'boolean') {
        return exports.nodeObject(getAutoTypedConstNode(obj));
    }
    else if (type === 'object') {
        if ((obj === null || obj === void 0 ? void 0 : obj.isNode) === true) {
            let nodeObject = nodeObjectsCacheMap.get(obj);
            if (nodeObject === undefined) {
                nodeObject = new Proxy(obj, shaderNodeHandler);
                nodeObjectsCacheMap.set(obj, nodeObject);
                nodeObjectsCacheMap.set(nodeObject, nodeObject);
            }
            return nodeObject;
        }
    }
    return obj;
};
const ShaderNodeObjects = function (objects) {
    for (const name in objects) {
        objects[name] = exports.nodeObject(objects[name]);
    }
    return objects;
};
const ShaderNodeArray = function (array) {
    const len = array.length;
    for (let i = 0; i < len; i += 1) {
        array[i] = exports.nodeObject(array[i]);
    }
    return array;
};
const ShaderNodeProxy = function (NodeClass, scope = null, factor = null) {
    if (scope === null) {
        return (...params) => {
            return exports.nodeObject(new NodeClass(...exports.nodeArray(params)));
        };
    }
    else if (factor === null) {
        return (...params) => {
            return exports.nodeObject(new NodeClass(scope, ...exports.nodeArray(params)));
        };
    }
    else {
        factor = exports.nodeObject(factor);
        return (...params) => {
            return exports.nodeObject(new NodeClass(scope, ...exports.nodeArray(params), factor));
        };
    }
};
const ShaderNodeImmutable = function (NodeClass, ...params) {
    return exports.nodeObject(new NodeClass(...exports.nodeArray(params)));
};
const ShaderNodeScript = function (jsFunc) {
    // @TODO: Move this to Node extended class
    const self = {
        build: (builder) => {
            self.call({}, builder);
            return '';
        },
        call: (inputs, builder) => {
            inputs = exports.nodeObjects(inputs);
            return exports.nodeObject(jsFunc(inputs, builder));
        },
    };
    return self;
};
exports.ShaderNode = new Proxy(ShaderNodeScript, shaderNodeHandler);
const nodeObject = (val) => /* new */ ShaderNodeObject(val);
exports.nodeObject = nodeObject;
const nodeObjects = (val) => new ShaderNodeObjects(val);
exports.nodeObjects = nodeObjects;
const nodeArray = (val) => new ShaderNodeArray(val);
exports.nodeArray = nodeArray;
const nodeProxy = (...val) => new ShaderNodeProxy(...val);
exports.nodeProxy = nodeProxy;
const nodeImmutable = (...val) => new ShaderNodeImmutable(...val);
exports.nodeImmutable = nodeImmutable;
const bools = [false, true];
const uints = [0, 1, 2, 3];
const ints = [-1, -2];
const floats = [
    0.5,
    1.5,
    1 / 3,
    1e-6,
    1e6,
    Math.PI,
    Math.PI * 2,
    1 / Math.PI,
    2 / Math.PI,
    1 / (Math.PI * 2),
    Math.PI / 2,
];
const boolsCacheMap = new Map();
for (let bool of bools)
    boolsCacheMap.set(bool, new ConstNode_1.default(bool));
const uintsCacheMap = new Map();
for (let uint of uints)
    uintsCacheMap.set(uint, new ConstNode_1.default(uint, 'uint'));
const intsCacheMap = new Map([...uintsCacheMap].map((el) => new ConstNode_1.default(el.value, 'int')));
for (let int of ints)
    intsCacheMap.set(int, new ConstNode_1.default(int, 'int'));
const floatsCacheMap = new Map([...intsCacheMap].map((el) => new ConstNode_1.default(el.value)));
for (let float of floats)
    floatsCacheMap.set(float, new ConstNode_1.default(float));
for (let float of floats)
    floatsCacheMap.set(-float, new ConstNode_1.default(-float));
exports.cacheMaps = { bool: boolsCacheMap, uint: uintsCacheMap, ints: intsCacheMap, float: floatsCacheMap };
const constNodesCacheMap = new Map([...boolsCacheMap, ...floatsCacheMap]);
const getAutoTypedConstNode = (value) => {
    if (constNodesCacheMap.has(value)) {
        return constNodesCacheMap.get(value);
    }
    else if (value.isNode === true) {
        return value;
    }
    else {
        return new ConstNode_1.default(value);
    }
};
const ConvertType = function (type, cacheMap = null) {
    return (...params) => {
        if (params.length === 0) {
            return exports.nodeObject(new ConstNode_1.default(NodeUtils_1.getValueFromType(type), type));
        }
        else {
            if (type === 'color' && params[0].isNode !== true) {
                params = [NodeUtils_1.getValueFromType(type, ...params)];
            }
            if (params.length === 1 && cacheMap !== null && cacheMap.has(params[0])) {
                return cacheMap.get(params[0]);
            }
            const nodes = params.map(getAutoTypedConstNode);
            if (nodes.length === 1) {
                return exports.nodeObject(nodes[0].nodeType === type ? nodes[0] : new ConvertNode_1.default(nodes[0], type));
            }
            return exports.nodeObject(new ConvertNode_1.default(new JoinNode_1.default(nodes), type));
        }
    };
};
exports.ConvertType = ConvertType;
const getConstNodeType = (value) => value.nodeType || value.convertTo || (typeof value === 'string' ? value : null);
exports.getConstNodeType = getConstNodeType;
