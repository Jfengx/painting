import * as THREE from 'three';
import { Direction, getDir } from './direction';

export function move({ camera, player }: { camera: THREE.Camera; player: THREE.Object3D }) {
  const direction = getDir();
  const velocityVec = new THREE.Vector3();
  const directionVec = new THREE.Vector3();

  const setDir = (dir: Direction) => {
    camera.getWorldDirection(directionVec);
    directionVec.y = 0;
    directionVec.normalize();
    if (dir === 'right' || dir === 'left') {
      // 右手定则
      directionVec.cross(camera.up);
    }
    return directionVec;
  };

  const setInc = () => {
    const speedDelta = 1;

    const inc = (dir: Direction) => {
      if (direction.value.includes(dir)) {
        const i = dir === 'back' || dir === 'left' ? -1 : 1;
        velocityVec.add(setDir(dir).multiplyScalar(speedDelta * i));
      }
    };

    ['front', 'back', 'left', 'right'].forEach((dir) => {
      inc(<Direction>dir);
    });
  };

  const updatePlayer = () => {
    if (player) {
      const playerPos = new THREE.Vector3(velocityVec.x, player.position.y, velocityVec.z);
      player.position.copy(playerPos);
    }
  };

  const updateCamera = (perspective: Perspective) => {
    if (perspective === 'first') {
      camera.position.copy(velocityVec);
    } else {
      const relativeCameraOffset = new THREE.Vector3(0, 50, 200);
      const cameraOffset = relativeCameraOffset.applyMatrix4(player.matrixWorld);
      camera.position.set(cameraOffset.x, cameraOffset.y, cameraOffset.z);
      camera.lookAt(player.position);
    }
  };

  const update = (perspective: Perspective) => {
    setInc();
    updatePlayer();
    updateCamera(perspective);
  };

  return { update };
}
