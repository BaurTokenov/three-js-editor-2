"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackedPhongMaterial = void 0;
/**
 * `PackedPhongMaterial` inherited from THREE.MeshPhongMaterial
 *
 * @param {Object} parameters
 */
const three_1 = require("three");
class PackedPhongMaterial extends three_1.MeshPhongMaterial {
    constructor(parameters) {
        super();
        this.defines = {};
        this.type = 'PackedPhongMaterial';
        this.uniforms = three_1.UniformsUtils.merge([
            three_1.ShaderLib.phong.uniforms,
            {
                quantizeMatPos: { value: null },
                quantizeMatUV: { value: null }
            }
        ]);
        this.vertexShader = [
            '#define PHONG',
            'varying vec3 vViewPosition;',
            three_1.ShaderChunk.common,
            three_1.ShaderChunk.uv_pars_vertex,
            three_1.ShaderChunk.uv2_pars_vertex,
            three_1.ShaderChunk.displacementmap_pars_vertex,
            three_1.ShaderChunk.envmap_pars_vertex,
            three_1.ShaderChunk.color_pars_vertex,
            three_1.ShaderChunk.fog_pars_vertex,
            three_1.ShaderChunk.normal_pars_vertex,
            three_1.ShaderChunk.morphtarget_pars_vertex,
            three_1.ShaderChunk.skinning_pars_vertex,
            three_1.ShaderChunk.shadowmap_pars_vertex,
            three_1.ShaderChunk.logdepthbuf_pars_vertex,
            three_1.ShaderChunk.clipping_planes_pars_vertex,
            `#ifdef USE_PACKED_NORMAL
					#if USE_PACKED_NORMAL == 0
						vec3 decodeNormal(vec3 packedNormal)
						{
							float x = packedNormal.x * 2.0 - 1.0;
							float y = packedNormal.y * 2.0 - 1.0;
							vec2 scth = vec2(sin(x * PI), cos(x * PI));
							vec2 scphi = vec2(sqrt(1.0 - y * y), y);
							return normalize( vec3(scth.y * scphi.x, scth.x * scphi.x, scphi.y) );
						}
					#endif

					#if USE_PACKED_NORMAL == 1
						vec3 decodeNormal(vec3 packedNormal)
						{
							vec3 v = vec3(packedNormal.xy, 1.0 - abs(packedNormal.x) - abs(packedNormal.y));
							if (v.z < 0.0)
							{
								v.xy = (1.0 - abs(v.yx)) * vec2((v.x >= 0.0) ? +1.0 : -1.0, (v.y >= 0.0) ? +1.0 : -1.0);
							}
							return normalize(v);
						}
					#endif

					#if USE_PACKED_NORMAL == 2
						vec3 decodeNormal(vec3 packedNormal)
						{
							vec3 v = (packedNormal * 2.0) - 1.0;
							return normalize(v);
						}
					#endif
				#endif`,
            `#ifdef USE_PACKED_POSITION
					#if USE_PACKED_POSITION == 0
						uniform mat4 quantizeMatPos;
					#endif
				#endif`,
            `#ifdef USE_PACKED_UV
					#if USE_PACKED_UV == 1
						uniform mat3 quantizeMatUV;
					#endif
				#endif`,
            `#ifdef USE_PACKED_UV
					#if USE_PACKED_UV == 0
						vec2 decodeUV(vec2 packedUV)
						{
							vec2 uv = (packedUV * 2.0) - 1.0;
							return uv;
						}
					#endif

					#if USE_PACKED_UV == 1
						vec2 decodeUV(vec2 packedUV)
						{
							vec2 uv = ( vec3(packedUV, 1.0) * quantizeMatUV ).xy;
							return uv;
						}
					#endif
				#endif`,
            'void main() {',
            three_1.ShaderChunk.uv_vertex,
            `#ifdef USE_UV
					#ifdef USE_PACKED_UV
						vUv = decodeUV(vUv);
					#endif
				#endif`,
            three_1.ShaderChunk.uv2_vertex,
            three_1.ShaderChunk.color_vertex,
            three_1.ShaderChunk.beginnormal_vertex,
            `#ifdef USE_PACKED_NORMAL
					objectNormal = decodeNormal(objectNormal);
				#endif

				#ifdef USE_TANGENT
					vec3 objectTangent = vec3( tangent.xyz );
				#endif
				`,
            three_1.ShaderChunk.morphnormal_vertex,
            three_1.ShaderChunk.skinbase_vertex,
            three_1.ShaderChunk.skinnormal_vertex,
            three_1.ShaderChunk.defaultnormal_vertex,
            three_1.ShaderChunk.normal_vertex,
            three_1.ShaderChunk.begin_vertex,
            `#ifdef USE_PACKED_POSITION
					#if USE_PACKED_POSITION == 0
						transformed = ( vec4(transformed, 1.0) * quantizeMatPos ).xyz;
					#endif
				#endif`,
            three_1.ShaderChunk.morphtarget_vertex,
            three_1.ShaderChunk.skinning_vertex,
            three_1.ShaderChunk.displacementmap_vertex,
            three_1.ShaderChunk.project_vertex,
            three_1.ShaderChunk.logdepthbuf_vertex,
            three_1.ShaderChunk.clipping_planes_vertex,
            'vViewPosition = - mvPosition.xyz;',
            three_1.ShaderChunk.worldpos_vertex,
            three_1.ShaderChunk.envmap_vertex,
            three_1.ShaderChunk.shadowmap_vertex,
            three_1.ShaderChunk.fog_vertex,
            '}',
        ].join('\n');
        // Use the original MeshPhongMaterial's fragmentShader.
        this.fragmentShader = [
            '#define PHONG',
            'uniform vec3 diffuse;',
            'uniform vec3 emissive;',
            'uniform vec3 specular;',
            'uniform float shininess;',
            'uniform float opacity;',
            three_1.ShaderChunk.common,
            three_1.ShaderChunk.packing,
            three_1.ShaderChunk.dithering_pars_fragment,
            three_1.ShaderChunk.color_pars_fragment,
            three_1.ShaderChunk.uv_pars_fragment,
            three_1.ShaderChunk.uv2_pars_fragment,
            three_1.ShaderChunk.map_pars_fragment,
            three_1.ShaderChunk.alphamap_pars_fragment,
            three_1.ShaderChunk.aomap_pars_fragment,
            three_1.ShaderChunk.lightmap_pars_fragment,
            three_1.ShaderChunk.emissivemap_pars_fragment,
            three_1.ShaderChunk.envmap_common_pars_fragment,
            three_1.ShaderChunk.envmap_pars_fragment,
            three_1.ShaderChunk.cube_uv_reflection_fragment,
            three_1.ShaderChunk.fog_pars_fragment,
            three_1.ShaderChunk.bsdfs,
            three_1.ShaderChunk.lights_pars_begin,
            three_1.ShaderChunk.normal_pars_fragment,
            three_1.ShaderChunk.lights_phong_pars_fragment,
            three_1.ShaderChunk.shadowmap_pars_fragment,
            three_1.ShaderChunk.bumpmap_pars_fragment,
            three_1.ShaderChunk.normalmap_pars_fragment,
            three_1.ShaderChunk.specularmap_pars_fragment,
            three_1.ShaderChunk.logdepthbuf_pars_fragment,
            three_1.ShaderChunk.clipping_planes_pars_fragment,
            'void main() {',
            three_1.ShaderChunk.clipping_planes_fragment,
            'vec4 diffuseColor = vec4( diffuse, opacity );',
            'ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );',
            'vec3 totalEmissiveRadiance = emissive;',
            three_1.ShaderChunk.logdepthbuf_fragment,
            three_1.ShaderChunk.map_fragment,
            three_1.ShaderChunk.color_fragment,
            three_1.ShaderChunk.alphamap_fragment,
            three_1.ShaderChunk.alphatest_fragment,
            three_1.ShaderChunk.specularmap_fragment,
            three_1.ShaderChunk.normal_fragment_begin,
            three_1.ShaderChunk.normal_fragment_maps,
            three_1.ShaderChunk.emissivemap_fragment,
            // accumulation
            three_1.ShaderChunk.lights_phong_fragment,
            three_1.ShaderChunk.lights_fragment_begin,
            three_1.ShaderChunk.lights_fragment_maps,
            three_1.ShaderChunk.lights_fragment_end,
            // modulation
            three_1.ShaderChunk.aomap_fragment,
            'vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;',
            three_1.ShaderChunk.envmap_fragment,
            'gl_FragColor = vec4( outgoingLight, diffuseColor.a );',
            three_1.ShaderChunk.tonemapping_fragment,
            three_1.ShaderChunk.encodings_fragment,
            three_1.ShaderChunk.fog_fragment,
            three_1.ShaderChunk.premultiplied_alpha_fragment,
            three_1.ShaderChunk.dithering_fragment,
            '}',
        ].join('\n');
        this.setValues(parameters);
    }
}
exports.PackedPhongMaterial = PackedPhongMaterial;
