precision highp float;

#define N_TEX 7

uniform float u_time, u_curIdx, u_progress;
uniform vec2 u_res, u_mousePos;
uniform sampler2D u_texture[N_TEX];

varying vec2 v_uv;

vec4 mosaic(sampler2D oTex, vec2 oUv, float oBlock) {
  float block = clamp(oBlock, 1., 200.);
  vec2 uv = vec2(floor(oUv * block) / block);
  return texture2D(oTex, uv);
}

vec4 offsetTex(sampler2D oTex, vec2 uv) {
  vec4 texture = vec4(vec3(0.), 1.);
  texture.r = texture2D(oTex, uv - vec2((u_mousePos.x / u_res.x) * 0.00095, (u_mousePos.y / u_res.y) * 0.0005)).r;
  texture.g = texture2D(oTex, uv).g;
  texture.b = texture2D(oTex, uv - vec2((u_mousePos.x / u_res.x) * 0.000025, (u_mousePos.y / u_res.y) * 0.001475)).b;
  return texture;
}

vec4 transition(sampler2D from, sampler2D to, vec2 uv, float progress) {
  vec4 fromColor = texture2D(from, uv); // offsetTex(from, uv);
  vec4 toColor = texture2D(to, uv); // offsetTex(to, uv);
  return mix(fromColor, toColor, progress);
}

#define pick

void main() {
  vec2 uv = v_uv;
  vec4 color = pick(u_curIdx, uv);
  gl_FragColor = color;
}
