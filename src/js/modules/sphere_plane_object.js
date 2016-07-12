const glslify = require('glslify');

export default class SpherePlaneObject {
  constructor() {
    this.radius = 250;
    this.noise_a = 20;
    this.noise_x = 5;
    this.noise_y = 5;
    this.noise_z = 5;
    this.plane_noise_a = 30;
    this.plane_noise_z = 1;
    this.plane_noise_y = 3;
    this.time = 1;
    this.smoothstep_min = -1.0;
    this.smoothstep_max = 1.0;
    this.plane = false;
    this.texture = false;
    this.uniforms = null;
    this.mesh = this.createMesh();
  }
  createMesh() {
    const plane_geometry = new THREE.PlaneBufferGeometry(4, 4, 64, 64);
    const geometry = new THREE.SphereBufferGeometry(1, 64, 64);
    geometry.addAttribute('position2', plane_geometry.attributes.position);
    geometry.setIndex(plane_geometry.index);
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
      plane_noise_a: {
        type: 'f',
        value: this.plane_noise_a,
      },
      plane_noise_z: {
        type: 'f',
        value: this.plane_noise_z
      },
      plane_noise_y: {
        type: 'f',
        value: this.plane_noise_y
      },
      smoothstep_min: {
        type: 'f',
        value: this.smoothstep_min
      },
      smoothstep_max: {
        type: 'f',
        value: this.smoothstep_max
      },
      texture: {
        type: 't',
        value: new THREE.TextureLoader().load('img/texture.png')
      },
      valid_tex: {
        type: 'f',
        value: 0
      },
    }
    return new THREE.Mesh(
      geometry,
      new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: glslify('../../glsl/sphere_plane_object.vs'),
        fragmentShader: glslify('../../glsl/sphere_plane_object.fs'),
        transparent: true,
        shading: THREE.FlatShading,
        side: THREE.DoubleSide,
      })
    );
  }
  render(time) {
    this.uniforms.time.value += time * this.time;
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
