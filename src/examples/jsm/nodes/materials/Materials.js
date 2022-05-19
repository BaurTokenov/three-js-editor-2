import NodeMaterial from './NodeMaterial';
import LineBasicNodeMaterial from './LineBasicNodeMaterial';
import MeshBasicNodeMaterial from './MeshBasicNodeMaterial';
import MeshStandardNodeMaterial from './MeshStandardNodeMaterial';
import PointsNodeMaterial from './PointsNodeMaterial';
import { Material } from 'three';

export { NodeMaterial, LineBasicNodeMaterial, MeshBasicNodeMaterial, MeshStandardNodeMaterial, PointsNodeMaterial };

const materialLib = {
  NodeMaterial,
  LineBasicNodeMaterial,
  MeshBasicNodeMaterial,
  MeshStandardNodeMaterial,
  PointsNodeMaterial,
};

const fromTypeFunction = Material.fromType;

Material.fromType = function (type) {
  if (materialLib[type] !== undefined) {
    return new materialLib[type]();
  }

  return fromTypeFunction.call(this, type);
};

NodeMaterial.fromMaterial = function (material) {
  const type = material.type.replace('Material', 'NodeMaterial');

  if (materialLib[type] === undefined) {
    return material; // is already a node material or cannot be converted
  }

  const nodeMaterial = new materialLib[type](material);

  for (let key in material) {
    if (nodeMaterial[key] === undefined) {
      nodeMaterial[key] = material[key]; // currently this is needed only for material.alphaTest
    }
  }

  return nodeMaterial;
};
