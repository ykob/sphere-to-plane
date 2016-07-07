const glslify = require('glslify');

export default class Sphere {
  constructor(radius) {
    this.radius = radius;
    this.mesh = new THREE.Mesh(
      new THREE.SphereGeometry(1, 64, 64),
      new THREE.ShaderMaterial({
        uniforms: {
          radius: {
            type: 'f',
            value: radius,
          }
        },
        vertexShader: glslify('../../glsl/sphere.vs'),
        fragmentShader: glslify('../../glsl/sphere.fs'),
      })
    );
  }
}
