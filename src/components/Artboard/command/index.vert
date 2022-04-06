precision highp float;

attribute vec3 a_position;
varying vec2 v_uv;

void main() {
  gl_Position = vec4(a_position, 1.);
  v_uv = a_position.xy * .5 + .5;
}
