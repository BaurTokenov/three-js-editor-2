"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RayCastClosest = exports.OGeometry = exports.OConeGeometry = exports.OCylinderGeometry = exports.OSphereGeometry = exports.OBoxGeometry = exports.OConvexHullGeometry = exports.OCapsuleGeometry = exports.Transform = exports.MathUtil = exports.Mat3 = exports.Quat = exports.Vec3 = exports.UniversalJoint = exports.RotationalLimitMotor = exports.TranslationalLimitMotor = exports.SpringDamper = exports.RagdollJointConfig = exports.SphericalJointConfig = exports.CylindricalJointConfig = exports.RagdollJoint = exports.RevoluteJoint = exports.PrismaticJointConfig = exports.PrismaticJoint = exports.CylindricalJoint = exports.UniversalJointConfig = exports.RevoluteJointConfig = exports.SphericalJoint = exports.Shape = exports.RigidBody = exports.ShapeConfig = exports.RigidBodyConfig = exports.RigidBodyType = exports.World = void 0;
const OimoPhysics_1 = require("./OimoPhysics");
// dynamics
exports.World = OimoPhysics_1.oimo.dynamics.World;
exports.RigidBodyType = OimoPhysics_1.oimo.dynamics.rigidbody.RigidBodyType;
exports.RigidBodyConfig = OimoPhysics_1.oimo.dynamics.rigidbody.RigidBodyConfig;
exports.ShapeConfig = OimoPhysics_1.oimo.dynamics.rigidbody.ShapeConfig;
exports.RigidBody = OimoPhysics_1.oimo.dynamics.rigidbody.RigidBody;
exports.Shape = OimoPhysics_1.oimo.dynamics.rigidbody.Shape;
exports.SphericalJoint = OimoPhysics_1.oimo.dynamics.constraint.joint.SphericalJoint;
exports.RevoluteJointConfig = OimoPhysics_1.oimo.dynamics.constraint.joint.RevoluteJointConfig;
exports.UniversalJointConfig = OimoPhysics_1.oimo.dynamics.constraint.joint.UniversalJointConfig;
exports.CylindricalJoint = OimoPhysics_1.oimo.dynamics.constraint.joint.CylindricalJoint;
exports.PrismaticJoint = OimoPhysics_1.oimo.dynamics.constraint.joint.PrismaticJoint;
exports.PrismaticJointConfig = OimoPhysics_1.oimo.dynamics.constraint.joint.PrismaticJointConfig;
exports.RevoluteJoint = OimoPhysics_1.oimo.dynamics.constraint.joint.RevoluteJoint;
exports.RagdollJoint = OimoPhysics_1.oimo.dynamics.constraint.joint.RagdollJoint;
exports.CylindricalJointConfig = OimoPhysics_1.oimo.dynamics.constraint.joint.CylindricalJointConfig;
exports.SphericalJointConfig = OimoPhysics_1.oimo.dynamics.constraint.joint.SphericalJointConfig;
exports.RagdollJointConfig = OimoPhysics_1.oimo.dynamics.constraint.joint.RagdollJointConfig;
exports.SpringDamper = OimoPhysics_1.oimo.dynamics.constraint.joint.SpringDamper;
exports.TranslationalLimitMotor = OimoPhysics_1.oimo.dynamics.constraint.joint.TranslationalLimitMotor;
exports.RotationalLimitMotor = OimoPhysics_1.oimo.dynamics.constraint.joint.RotationalLimitMotor;
exports.UniversalJoint = OimoPhysics_1.oimo.dynamics.constraint.joint.UniversalJoint;
// common
exports.Vec3 = OimoPhysics_1.oimo.common.Vec3;
exports.Quat = OimoPhysics_1.oimo.common.Quat;
exports.Mat3 = OimoPhysics_1.oimo.common.Mat3;
exports.MathUtil = OimoPhysics_1.oimo.common.MathUtil;
exports.Transform = OimoPhysics_1.oimo.common.Transform;
// collision
exports.OCapsuleGeometry = OimoPhysics_1.oimo.collision.geometry.CapsuleGeometry;
exports.OConvexHullGeometry = OimoPhysics_1.oimo.collision.geometry.ConvexHullGeometry;
exports.OBoxGeometry = OimoPhysics_1.oimo.collision.geometry.BoxGeometry;
exports.OSphereGeometry = OimoPhysics_1.oimo.collision.geometry.SphereGeometry;
exports.OCylinderGeometry = OimoPhysics_1.oimo.collision.geometry.CylinderGeometry;
exports.OConeGeometry = OimoPhysics_1.oimo.collision.geometry.ConeGeometry;
exports.OGeometry = OimoPhysics_1.oimo.collision.geometry.Geometry;
// callback
exports.RayCastClosest = OimoPhysics_1.oimo.dynamics.callback.RayCastClosest;
