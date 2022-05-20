"use strict";
/**
 * Simple test shader
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicShader = void 0;
const BasicShader = {
    uniforms: {},
    vertexShader: /* glsl */ `

		void main() {

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,
    fragmentShader: /* glsl */ `

		void main() {

			gl_FragColor = vec4( 1.0, 0.0, 0.0, 0.5 );

		}`
};
exports.BasicShader = BasicShader;
