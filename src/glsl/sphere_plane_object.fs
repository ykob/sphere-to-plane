uniform float radius;

varying vec4 vPosition;
varying mat4 vInvertMatrix;

void main(void) {
  vec3 normal = normalize(cross(dFdx(vPosition.xyz), dFdy(vPosition.xyz)));
  // vec3 normal = normalize(vPosition.xyz);
  vec3 inv_light = normalize(vInvertMatrix * vec4(vec3(0.7), 0.0)).xyz;
  float diff = (dot(normal, inv_light) + 1.0) / 2.0;
  vec3 color = vec3(0.4, 0.5, 0.48) + vec3(0.5) * diff;
  gl_FragColor = vec4(color, 1.0);
}
