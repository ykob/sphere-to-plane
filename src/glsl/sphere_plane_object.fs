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
  vec3 light = vec3(0.2) * diff;
  vec4 color = vec4(0.6, 0.7, 0.68, 1.0);
  vec4 tex_color = texture2D(texture, vUv);
  gl_FragColor = (color + vec4(light, 1.0)) * (1.0 - valid_tex) + vec4(tex_color.rgb + light, tex_color.a) * valid_tex;
}
