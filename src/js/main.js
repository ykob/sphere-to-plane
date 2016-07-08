import SpherePlaneObject from './modules/sphere_plane_object.js';

const canvas = document.getElementById('canvas-webgl');
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: canvas,
  alpha: true
});
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
const clock = new THREE.Clock();

const sp_obj = new SpherePlaneObject();

const resizeWindow = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
const setEvent = () => {
  $(window).on('resize', () => {
    resizeWindow();
  });
}
const initDatGui = () => {
  const gui = new dat.GUI();
  const controller = {
    radius: gui.add(sp_obj, 'radius', 0, 1000),
    noise_a: gui.add(sp_obj, 'noise_a', 0, 500),
    noise_x: gui.add(sp_obj, 'noise_x', -20, 20),
    noise_y: gui.add(sp_obj, 'noise_y', -20, 20),
    noise_z: gui.add(sp_obj, 'noise_z', -20, 20),
    plane_noise_a: gui.add(sp_obj, 'plane_noise_a', 0, 100),
    plane_noise_y: gui.add(sp_obj, 'plane_noise_y', -10, 10),
    plane_noise_z: gui.add(sp_obj, 'plane_noise_z', -10, 10),
    time: gui.add(sp_obj, 'time', 0, 10),
    plane: gui.add(sp_obj, 'plane', -20, 20),
  }
  controller.radius.onChange((value) => {
    sp_obj.mesh.material.uniforms.radius.value = value;
  });
  controller.noise_a.onChange((value) => {
    sp_obj.mesh.material.uniforms.noise_a.value = value;
  });
  controller.noise_x.onChange((value) => {
    sp_obj.mesh.material.uniforms.noise_x.value = value;
  });
  controller.noise_y.onChange((value) => {
    sp_obj.mesh.material.uniforms.noise_y.value = value;
  });
  controller.noise_z.onChange((value) => {
    sp_obj.mesh.material.uniforms.noise_z.value = value;
  });
  controller.plane_noise_a.onChange((value) => {
    sp_obj.mesh.material.uniforms.plane_noise_a.value = value;
  });
  controller.plane_noise_y.onChange((value) => {
    sp_obj.mesh.material.uniforms.plane_noise_y.value = value;
  });
  controller.plane_noise_z.onChange((value) => {
    sp_obj.mesh.material.uniforms.plane_noise_z.value = value;
  });
}
const render = () => {
  sp_obj.render(clock.getDelta());
  renderer.render(scene, camera);
}
const renderLoop = () => {
  render();
  requestAnimationFrame(renderLoop);
}

const init = () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xffffff, 0.0);
  camera.position.set(2000, 0, 0);
  camera.lookAt(new THREE.Vector3());

  scene.add(sp_obj.mesh);

  setEvent();
  initDatGui();
  resizeWindow();
  renderLoop();
}
init();
