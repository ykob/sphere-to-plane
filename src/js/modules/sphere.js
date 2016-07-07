const glslify = require('glslify');

export default class Sphere {
  constructor() {
    this.radius = 300;
    this.noise_a = 50;
    this.noise_x = 20;
    this.noise_y = 20;
    this.noise_z = 20;
    this.mesh = new THREE.Mesh(
      new THREE.SphereGeometry(1, 128, 128),
      new THREE.ShaderMaterial({
        uniforms: {
          time: {
            type: 'f',
            value: 0,
          },
          radius: {
            type: 'f',
            value: this.radius,
          },
          noise_a: {
            type: 'f',
            value: this.noise_a,
          },
          noise_x: {
            type: 'f',
            value: this.noise_x,
          },
          noise_y: {
            type: 'f',
            value: this.noise_y,
          },
          noise_z: {
            type: 'f',
            value: this.noise_z
          },
        },
        vertexShader: glslify('../../glsl/sphere.vs'),
        fragmentShader: glslify('../../glsl/sphere.fs'),
      })
    );
  }
  render(time) {
    this.mesh.material.uniforms.time.value += time;
  }
}
