uniform float time;
uniform float radius;
uniform float noise_a;
uniform float noise_x;
uniform float noise_y;
uniform float noise_z;

varying vec4 vPosition;

#pragma glslify: cnoise3 = require(glsl-noise/classic/3d);
#pragma glslify: scaleMatrix = require(./modules/scale_matrix);

void main(void) {
  float noise = cnoise3(
      vec3(
        position.x * noise_x / 10.0 + time,
        position.y * noise_y / 10.0 + time,
        position.z * noise_z / 10.0 + time
      )
    ) * noise_a;
  vec4 scale_position = scaleMatrix(vec3(radius)) * vec4(position, 1.0);
  vec4 noise_position = vec4(scale_position.xyz + position * noise, 1.0);
  vPosition = noise_position;
  gl_Position = projectionMatrix * modelViewMatrix * noise_position;
}
