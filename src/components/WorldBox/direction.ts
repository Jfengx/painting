const KEYS = {
  KeyW: 'front',
  KeyA: 'left',
  KeyS: 'back',
  KeyD: 'right',
  KeyQ: 'rotate-left',
  KeyE: 'rotate-right',
  Space: 'jump',
} as const;

type Keys = typeof KEYS;

export type Direction = Keys[keyof Keys];

export function getDir() {
  const { current } = useMagicKeys();
  return computed(() => Array.from(current).map((key) => KEYS[key]));
}
