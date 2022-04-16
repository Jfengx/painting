import { isEmptyArr } from './common';

function loadImg(img: HTMLImageElement, flagAttr = 'data-src') {
  const isLoaded = img.complete && img.naturalHeight !== 0;
  return new Promise<HTMLImageElement>((resolve) => {
    if (isLoaded) {
      resolve(img);
    } else {
      if (!img.src) {
        img.src = <string>img.getAttribute(flagAttr);
      }
      img.onload = () => {
        resolve(img);
      };
    }
  });
}

function loadImgs(imgs: HTMLImageElement[], { limit = 3, flagAttr = 'data-src' } = {}) {
  return new Promise<string>(async (resolve) => {
    const pool: any[] = [];

    const fillPool = (i: number) => {
      const promise = loadImg(imgs[i], flagAttr).then(() => {
        const index = pool.indexOf(promise);
        pool.splice(index, 1);

        if (isEmptyArr(pool)) {
          resolve('imgs loaded');
        }
      });
      pool.push(promise);
    };

    const race = () => Promise.race(pool);

    for (let i = 0; i < imgs.length; i++) {
      if (pool.length === limit) {
        await race();
      }
      fillPool(i);
    }
  });
}

export { loadImg, loadImgs };
