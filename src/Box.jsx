import { useBox } from "@react-three/cannon";
import { useRef } from "react";
export function Box(){
    const [ref] = useBox(() => ({
        mass: 1,
        position: [0, 5, 0],
        rotation: [0.4, 0.2, 0.5]
    }), useRef(null))
    return (
        <>
            <mesh ref={ref} castShadow receiveShadow>
                <boxGeometry args={[1,1,1]}/>
                {/* <meshLambertMaterial color="hotpink" /> */}
                {/* <meshBasicMaterial color="hotpink" /> */}
                <meshLambertMaterial color="hotpink"/>
            </mesh>
        </>
    )
}