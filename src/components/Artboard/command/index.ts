import vert from './index.vert';
import frag from './index.frag';
import createREGL, { Regl, Texture2D } from 'regl';

type Props = Record<'time' | 'curIdx' | 'progress', number>;

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
  const total = imgs.length;
  const textures = await Promise.all(imgs.map((img) => createTexture(regl, img)));

  const textureList: Record<string, Texture2D> = {};
  const uniformName = 'u_texture';
  textures.forEach((texture, i) => {
    textureList[`${uniformName}[${i}]`] = texture;
  });

  const picker = () =>
    [
      'vec4 pick(float i, vec2 uv) {',
      'return',
      Array(total - 1)
        .fill(total - 1)
        .map((n, i) => `i >= ${(n - i).toFixed(1)}\n? texture2D(${uniformName}[${n - i}], uv)`)
        .join('\n: '),
      `${total === 1 ? '' : ':'} texture2D(${uniformName}[0], uv);`,
      '}',
    ].join('\n');

  const cmd = regl({
    vert,
    frag: frag
      .replace(/#define\s+N_TEX\s+(\d+)?/, `#define N_TEX ${total}`)
      .replace('#define pick', picker),
    attributes: {
      a_position: [
        [-1, 1, 0],
        [-1, -1, 0],
        [1, -1, 0],
        [1, 1, 0],
      ],
    },
    uniforms: {
      ...textureList,
      u_res: [canvas.width, canvas.height],
      u_time: (_, { time }: Props) => time,
      u_progress: (_, { progress }) => progress,
      u_curIdx: (_, { curIdx }) => curIdx,
    },
    count: 4,
    primitive: 'triangle fan',
  });

  let cancel: Nullable<{ cancel: () => void }> = null;
  let props: Pick<Props, 'curIdx' | 'progress'> = { curIdx: 0, progress: 1 };

  const update = (p: Pick<Props, 'curIdx' | 'progress'>) => {
    Object.assign(props, p);
  };

  const start = () => {
    cancel = regl.frame(({ time }) => {
      cmd({ time, ...props });
    });
  };

  const stop = () => {
    if (cancel) {
      cancel.cancel();
    }
  };

  return { update, stop, start };
}
