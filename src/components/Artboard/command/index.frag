precision highp float;

#define N_TEX 7

uniform float u_time, u_curIdx, u_progress;
uniform sampler2D u_texture[N_TEX];

varying vec2 v_uv;

vec4 transition(vec4 from, vec4 to, float progress) {
  return mix(from, to, progress);
}

#define pick

void main() {
  vec2 uv = v_uv;
  vec4 color = pick(u_curIdx, uv);
  gl_FragColor = color;
}
