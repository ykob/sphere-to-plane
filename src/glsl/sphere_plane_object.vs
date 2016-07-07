attribute vec3 position2;

uniform float time;
uniform float ease_time;
uniform float ease_time_max;
uniform float radius;
uniform float noise_a;
uniform float noise_x;
uniform float noise_y;
uniform float noise_z;
uniform float plane_noise_a;
uniform float plane_noise_x;
uniform float plane_noise_y;

varying vec4 vPosition;
varying mat4 vInvertMatrix;

#pragma glslify: inverse = require(glsl-inverse);
#pragma glslify: cnoise3 = require(glsl-noise/classic/3d);
#pragma glslify: ease = require(glsl-easings/circular-in-out);
#pragma glslify: scaleMatrix = require(./modules/scale_matrix);

void main(void) {
  float step = ease(clamp(ease_time, 0.0, ease_time_max) / ease_time_max);
  vec3 update_position = position * (1.0 - step) + position2 * step;
  float noise = cnoise3(
      vec3(
        update_position.x * noise_x + time,
        update_position.y * noise_y + time,
        update_position.z * noise_z + time
      )
    );
  float noise2 = cnoise3(
      vec3(
        update_position.x * plane_noise_x + time,
        update_position.y * plane_noise_y + time,
        update_position.z + time
      )
    );
  mat4 scale_matrix = scaleMatrix(vec3(radius));
  vec4 scale_position = scale_matrix * vec4(update_position, 1.0);
  vec4 noise_position = vec4(scale_position.xyz + vec3(
    position.x * noise * noise_a * (1.0 - step),
    position.y * noise * noise_a * (1.0 - step),
    position.z * noise * noise_a * (1.0 - step) + (position2.z + plane_noise_a * 2.0) * noise2 * step
  ), 1.0);
  vPosition = noise_position;
  vInvertMatrix = inverse(scale_matrix * modelMatrix);
  gl_Position = projectionMatrix * modelViewMatrix * noise_position;
}
