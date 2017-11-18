const THREE = require('three/build/three.js');
const glslify = require('glslify');
const GEOMETRY_RADIUS = 80;
const GEOMETRY_DETAIL = 2;

export default class FlatShellCore {
  constructor() {
    this.uniforms = {
      time: {
        type: 'f',
        value: 0
      }
    }
    this.obj = this.createObj();
    this.obj.renderOrder = 1;
  }
  createObj() {
    return new THREE.Mesh(
      new THREE.IcosahedronBufferGeometry(GEOMETRY_RADIUS, GEOMETRY_DETAIL),
      new THREE.RawShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: glslify('../../../../glsl/sketch/sphere/flatShellCore.vs'),
        fragmentShader: glslify('../../../../glsl/sketch/sphere/flatShellCore.fs'),
        transparent: true,
        side: THREE.DoubleSide,
        shading: THREE.FlatShading,
      })
    )
  }
  render(time) {
    this.uniforms.time.value += time;
    this.obj.rotation.set(
      this.uniforms.time.value * 0.1,
      this.uniforms.time.value * 0.1,
      this.uniforms.time.value * 0.1
    )
  }
}
