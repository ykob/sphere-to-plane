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
uniform float plane_noise_z;
uniform float plane_noise_y;
uniform float smoothstep_min;
uniform float smoothstep_max;

varying vec4 vPosition;
varying vec2 vUv;
varying mat4 vInvertMatrix;

#pragma glslify: inverse = require(glsl-inverse);
#pragma glslify: cnoise3 = require(glsl-noise/classic/3d);
#pragma glslify: ease = require(glsl-easings/circular-in-out);
#pragma glslify: rotateMatrix = require(./modules/rotate_matrix);
#pragma glslify: scaleMatrix = require(./modules/scale_matrix);

void main(void) {
  float step = ease(clamp(ease_time, 0.0, ease_time_max) / ease_time_max);
  vec3 plane_position = (rotateMatrix(0.0, radians(-90.0), 0.0) * vec4(position2, 1.0)).xyz;
  vec3 ease_position = position * (1.0 - step) + plane_position * step;
  float noise = smoothstep(smoothstep_min, smoothstep_max, cnoise3(
      vec3(
        ease_position.x * noise_x + time,
        ease_position.y * noise_y + time,
        ease_position.z * noise_z + time
      )
    ));
  float noise2 = smoothstep(smoothstep_min, smoothstep_max, cnoise3(
      vec3(
        ease_position.x + time,
        ease_position.y * plane_noise_y + time,
        ease_position.z * plane_noise_z + time
      )
    ));
  mat4 scale_matrix = scaleMatrix(vec3(radius));
  vec4 scale_position = scale_matrix * vec4(ease_position, 1.0);
  vec4 noise_position = vec4(scale_position.xyz + vec3(
    position.x * noise * noise_a * (1.0 - step) + (plane_position.x + plane_noise_a * 2.0) * noise2 * step,
    position.y * noise * noise_a * (1.0 - step),
    position.z * noise * noise_a * (1.0 - step)
  ), 1.0);
  vPosition = noise_position;
  vUv = uv;
  vInvertMatrix = inverse(scale_matrix * modelMatrix);
  gl_Position = projectionMatrix * modelViewMatrix * noise_position;
}
