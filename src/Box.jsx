import { useBox } from "@react-three/cannon";
import { useRef } from "react";
export function Box(props){
    const [ref] = useBox(() => ({
        mass: 5,       
        rotation: [0.4, 0.2, 0.5],
        ...props
    }), useRef(null))
    return (
        <>
            <mesh ref={ref} castShadow receiveShadow>
                <boxGeometry args={[1,1,1]}/>
                <meshLambertMaterial color="hotpink"/>
            </mesh>
        </>
    )
}