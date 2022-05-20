"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attach = exports.detach = exports.createMultiMaterialObject = exports.createMeshesFromMultiMaterialMesh = exports.createMeshesFromInstancedMesh = void 0;
const three_1 = require("three");
const BufferGeometryUtils_1 = require("./BufferGeometryUtils");
function createMeshesFromInstancedMesh(instancedMesh) {
    const group = new three_1.Group();
    const count = instancedMesh.count;
    const geometry = instancedMesh.geometry;
    const material = instancedMesh.material;
    for (let i = 0; i < count; i += 1) {
        const mesh = new three_1.Mesh(geometry, material);
        instancedMesh.getMatrixAt(i, mesh.matrix);
        mesh.matrix.decompose(mesh.position, mesh.quaternion, mesh.scale);
        group.add(mesh);
    }
    group.copy(instancedMesh);
    group.updateMatrixWorld(); // ensure correct world matrices of meshes
    return group;
}
exports.createMeshesFromInstancedMesh = createMeshesFromInstancedMesh;
function createMeshesFromMultiMaterialMesh(mesh) {
    if (Array.isArray(mesh.material) === false) {
        console.warn('THREE.SceneUtils.createMeshesFromMultiMaterialMesh(): The given mesh has no multiple materials.');
        return mesh;
    }
    const object = new three_1.Group();
    object.copy(mesh);
    // merge groups (which automatically sorts them)
    const geometry = BufferGeometryUtils_1.mergeGroups(mesh.geometry);
    const index = geometry.index;
    const groups = geometry.groups;
    const attributeNames = Object.keys(geometry.attributes);
    // create a mesh for each group by extracting the buffer data into a new geometry
    for (let i = 0; i < groups.length; i += 1) {
        const group = groups[i];
        const start = group.start;
        const end = start + group.count;
        const newGeometry = new three_1.BufferGeometry();
        const newMaterial = mesh.material[group.materialIndex];
        // process all buffer attributes
        for (let j = 0; j < attributeNames.length; j++) {
            const name = attributeNames[j];
            const attribute = geometry.attributes[name];
            const itemSize = attribute.itemSize;
            const newLength = group.count * itemSize;
            const type = attribute.array.constructor;
            const newArray = new type(newLength);
            const newAttribute = new three_1.BufferAttribute(newArray, itemSize);
            for (let k = start, n = 0; k < end; k++, n++) {
                const ind = index.getX(k);
                if (itemSize >= 1)
                    newAttribute.setX(n, attribute.getX(ind));
                if (itemSize >= 2)
                    newAttribute.setY(n, attribute.getY(ind));
                if (itemSize >= 3)
                    newAttribute.setZ(n, attribute.getZ(ind));
                if (itemSize >= 4)
                    newAttribute.setW(n, attribute.getW(ind));
            }
            newGeometry.setAttribute(name, newAttribute);
        }
        const newMesh = new three_1.Mesh(newGeometry, newMaterial);
        object.add(newMesh);
    }
    return object;
}
exports.createMeshesFromMultiMaterialMesh = createMeshesFromMultiMaterialMesh;
function createMultiMaterialObject(geometry, materials) {
    const group = new three_1.Group();
    for (let i = 0, l = materials.length; i < l; i += 1) {
        group.add(new three_1.Mesh(geometry, materials[i]));
    }
    return group;
}
exports.createMultiMaterialObject = createMultiMaterialObject;
function detach(child, parent, scene) {
    console.warn('THREE.SceneUtils: detach() has been deprecated. Use scene.attach( child ) instead.');
    scene.attach(child);
}
exports.detach = detach;
function attach(child, scene, parent) {
    console.warn('THREE.SceneUtils: attach() has been deprecated. Use parent.attach( child ) instead.');
    parent.attach(child);
}
exports.attach = attach;
