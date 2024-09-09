import { useBox, useRaycastVehicle } from "@react-three/cannon"
import { useRef } from "react";
import { useWheels } from "./useWheels";
import { WheelDebug } from "./WheelDebug";
import { useControls } from "./useControls";
import { useFrame } from "@react-three/fiber";
import { Quaternion, Vector3 } from "three";


export function Car({ thirdPersonControl }){
    const position = [-1.5, 0.5, 3];
    const width = 0.15;
    const height = 0.07;
    const front = 0.15;
    const wheelRadius = 0.05;

    const chassisBodyArgs = [width, height, front * 2];

    const [chassisBody, chassisApi] = useBox(()=>({
        allowSleep: false,
        args: chassisBodyArgs,
        mass: 150,
        position
    }),useRef(null))

    const [wheels, wheelInfos] = useWheels(width, height, front, wheelRadius);

    const [vehicle, vehicleApi] = useRaycastVehicle(() => ({
        chassisBody,
        wheelInfos,
        wheels
    }), useRef(null));

    useControls(vehicleApi, chassisApi);

    useFrame((state, delta) => {
        if(!thirdPersonControl) return;

        const position = new Vector3(0,0,0);
        position.setFromMatrixPosition(chassisBody.current.matrixWorld);

        const quaternion = new Quaternion(0,0,0,0);
        quaternion.setFromRotationMatrix(chassisBody.current.matrixWorld);

        const direction = new Vector3(0,0,1);
        direction.applyQuaternion(quaternion);
        direction.normalize();

        const t = 1.0 - Math.pow(0.001, delta);
        // const t = 5 * delta;

        // let cameraPosition = position.clone().add(direction.multiplyScalar(1).add(new Vector3(0,0.5,0)));
        let cameraPosition = state.camera.position.lerp(
          position.clone().add(direction.multiplyScalar(1).add(new Vector3(0,0.5,0))), 
          t
        );

        state.camera.position.copy(cameraPosition);
        state.camera.lookAt(position);
    });

    return (
        <group ref={vehicle}>
            <mesh ref={chassisBody}>
                <boxGeometry args={chassisBodyArgs}/>
                <meshLambertMaterial color="lightblue"/>
            </mesh> 

            <WheelDebug radius={wheelRadius} wheelRef={wheels[0]}/> 
            <WheelDebug radius={wheelRadius} wheelRef={wheels[1]}/>
            <WheelDebug radius={wheelRadius} wheelRef={wheels[2]}/> 
            <WheelDebug radius={wheelRadius} wheelRef={wheels[3]}/>  
        </group>    
    )
}