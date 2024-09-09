import { useRef, useEffect, useState } from 'react';
import { Vector3, Quaternion } from 'three';
import { useFrame } from '@react-three/fiber';

class ThirdPersonCamera {
  constructor(params) {
    this.params = params;
    this.camera = params.camera;

    this.currentPosition = new Vector3();
    this.currentLookat = new Vector3();
    this.idealOffset = new Vector3(-15, 20, -30);
    this.idealLookat = new Vector3(0, 10, 50);
  }

  calculateIdealOffset(targetPosition, targetRotation) {
    const offset = this.idealOffset.clone();
    offset.applyQuaternion(targetRotation);
    offset.add(targetPosition);
    return offset;
  }

  calculateIdealLookat(targetPosition, targetRotation) {
    const lookat = this.idealLookat.clone();
    lookat.applyQuaternion(targetRotation);
    lookat.add(targetPosition);
    return lookat;
  }

  update(timeElapsed, targetPosition, targetRotation) {
    const idealOffset = this.calculateIdealOffset(targetPosition, targetRotation);
    const idealLookat = this.calculateIdealLookat(targetPosition, targetRotation);

    const t = 1.0 - Math.pow(0.001, timeElapsed);

    this.currentPosition.lerp(idealOffset, t);
    this.currentLookat.lerp(idealLookat, t);

    this.camera.position.copy(this.currentPosition);
    this.camera.lookAt(this.currentLookat);
  }
}

export function useThirdPersonCamera(targetRef) {
  const cameraRef = useRef(null);
  const thirdPersonCameraRef = useRef(null);
  const [thirdperson, setThirdPerson] = useState(false)

  useEffect(() => {
    if (cameraRef.current) {
      thirdPersonCameraRef.current = new ThirdPersonCamera({
        camera: cameraRef.current,
      });
    }
  }, []);

//   useEffect(() => {
//     const keyDownPressHandle = (e) => {
//       if(e.key==="k"){
//         setThirdPerson((prev) => !prev);
//         if(thirdperson) setCameraPosition([-9, 7.9, 10 + Math.random() * 0.01])
//         else setCameraPosition([-9, 7.9, 10])
//         console.log("HERE")
//       }
//     }
//     window.addEventListener('keydown', keyDownPressHandle);
//     return () => {
//         window.removeEventListener('keydown', keyDownPressHandle);
//     }
// }, [thirdperson]);

  useFrame((state, delta) => {
    if (!targetRef.current || !thirdPersonCameraRef.current) return;

    const targetPosition = new Vector3();
    targetPosition.setFromMatrixPosition(targetRef.current.matrixWorld);

    const targetQuaternion = new Quaternion();
    targetQuaternion.setFromRotationMatrix(targetRef.current.matrixWorld);

    thirdPersonCameraRef.current.update(delta, targetPosition, targetQuaternion);
  });

  return cameraRef;
}