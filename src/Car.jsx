import { useBox, useRaycastVehicle } from "@react-three/cannon"
import { useRef } from "react";
import { useWheels } from "./useWheels";
import { WheelDebug } from "./WheelDebug";
import { useControls } from "./useControls";

export function Car(){
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