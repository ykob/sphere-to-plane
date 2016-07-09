uniform float radius;
uniform sampler2D texture;
uniform float valid_tex;

varying vec4 vPosition;
varying vec2 vUv;
varying mat4 vInvertMatrix;

void main(void) {
  vec3 normal = normalize(cross(dFdx(vPosition.xyz), dFdy(vPosition.xyz)));
  // vec3 normal = normalize(vPosition.xyz);
  vec3 inv_light = normalize(vInvertMatrix * vec4(vec3(0.7), 0.0)).xyz;
  float diff = (dot(normal, inv_light) + 1.0) / 2.0;
  vec4 light = vec4(vec3(0.2) * diff, 1.0);
  vec4 color = vec4(0.4, 0.5, 0.48, 1.0) + light;
  vec4 tex_color = texture2D(texture, vUv);
  gl_FragColor = color * (1.0 - valid_tex) + tex_color * valid_tex + light;
}
