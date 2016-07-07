import Sphere from './modules/sphere.js';

const canvas = document.getElementById('canvas-webgl');
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: canvas,
});
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
const clock = new THREE.Clock();

const sphere = new Sphere();

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
    radius: gui.add(sphere, 'radius', 0, 1000),
    noise_a: gui.add(sphere, 'noise_a', 0, 1000),
    noise_x: gui.add(sphere, 'noise_x', 0, 100),
    noise_y: gui.add(sphere, 'noise_y', 0, 100),
    noise_z: gui.add(sphere, 'noise_z', 0, 100),
  }
  controller.radius.onChange((value) => {
    sphere.mesh.material.uniforms.radius.value = value;
  });
  controller.noise_a.onChange((value) => {
    sphere.mesh.material.uniforms.noise_a.value = value;
  });
  controller.noise_x.onChange((value) => {
    sphere.mesh.material.uniforms.noise_x.value = value;
  });
  controller.noise_y.onChange((value) => {
    sphere.mesh.material.uniforms.noise_y.value = value;
  });
  controller.noise_z.onChange((value) => {
    sphere.mesh.material.uniforms.noise_z.value = value;
  });
}
const render = () => {
  sphere.render(clock.getDelta());
  renderer.render(scene, camera);
}
const renderLoop = () => {
  render();
  requestAnimationFrame(renderLoop);
}

const init = () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xeeeeee, 1.0);
  camera.position.set(1000, 1000, 1000);
  camera.lookAt(new THREE.Vector3());

  scene.add(sphere.mesh);

  setEvent();
  initDatGui();
  resizeWindow();
  renderLoop();
}
init();
