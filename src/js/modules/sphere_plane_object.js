const glslify = require('glslify');

export default class SpherePlaneObject {
  constructor() {
    this.radius = 250;
    this.noise_a = 10;
    this.noise_x = 5;
    this.noise_y = 5;
    this.noise_z = 5;
    this.plane = false;
    this.uniforms = null;
    this.mesh = this.createMesh();
  }
  createMesh() {
    const plane_geometry = new THREE.PlaneBufferGeometry(4, 4, 256, 256);
    const geometry = new THREE.SphereBufferGeometry(1, 256, 256);
    geometry.addAttribute('position2', plane_geometry.attributes.position);
    this.uniforms = {
      time: {
        type: 'f',
        value: 0,
      },
      ease_time: {
        type: 'f',
        value: 0,
      },
      ease_time_max: {
        type: 'f',
        value: 1,
      },
      radius: {
        type: 'f',
        value: this.radius,
      },
      noise_a: {
        type: 'f',
        value: this.noise_a,
      },
      noise_i: {
        type: 'f',
        value: this.noise_i,
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
    }
    return new THREE.Mesh(
      geometry,
      new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: glslify('../../glsl/sphere_plane_object.vs'),
        fragmentShader: glslify('../../glsl/sphere_plane_object.fs'),
        transparent: true,
        shading: THREE.FlatShading
      })
    );
  }
  render(time) {
    this.uniforms.time.value += time;
    if (this.plane) {
      if (this.uniforms.ease_time.value < this.uniforms.ease_time_max.value) {
        this.uniforms.ease_time.value += time;
      } else {
        this.uniforms.ease_time.value = this.uniforms.ease_time_max.value;
      }
    } else {
      if (this.uniforms.ease_time.value > 0) {
        this.uniforms.ease_time.value -= time;
      } else {
        this.uniforms.ease_time.value = 0;
      }
    }
  }
}
