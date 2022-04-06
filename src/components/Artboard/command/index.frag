precision highp float;

uniform sampler2D u_texture;

varying vec2 v_uv;

void main() {
  vec2 uv = v_uv;
  gl_FragColor = texture2D(u_texture, uv);
}
