import vert from './index.vert';
import frag from './index.frag';
import createREGL, { Regl } from 'regl';

const DPR = window.devicePixelRatio || 2;

function loadImg(img: HTMLImageElement) {
  const isLoaded = img.complete && img.naturalHeight !== 0;
  return new Promise<HTMLImageElement>((resolve) => {
    if (isLoaded) {
      resolve(img);
    } else {
      img.onload = () => {
        resolve(img);
      };
    }
  });
}

async function createTexture(regl: Regl, img: HTMLImageElement) {
  const data = await loadImg(img);
  return regl.texture({ data, flipY: true });
}

export async function draw(canvas: HTMLCanvasElement) {
  canvas.width = canvas.offsetWidth * DPR;
  canvas.height = canvas.offsetHeight * DPR;

  const regl = createREGL({ canvas });

  const imgs = Array.from(canvas.querySelectorAll('img'));
  const textures = await Promise.all(imgs.map((img) => createTexture(regl, img)));

  const cmd = regl({
    vert,
    frag,
    attributes: {
      a_position: [
        [-1, 1, 0],
        [-1, -1, 0],
        [1, -1, 0],
        [1, 1, 0],
      ],
    },
    uniforms: {
      u_texture: textures[0],
      u_res: [canvas.width, canvas.height],
      u_time: ({ time }) => time,
    },
    count: 4,
    primitive: 'triangle fan',
  });

  regl.frame(() => {
    cmd();
  });
}
