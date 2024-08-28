import { TextureLoader } from "three"
import { useLoader } from "@react-three/fiber"
import { usePlane } from "@react-three/cannon"
import { useRef } from "react"

export function Ground(){
    const [ref] = usePlane(() => ({
        type: 'Static',
        rotation: [-Math.PI / 2, 0, 0]
    }), useRef(null))
    const gridmap = useLoader(TextureLoader, "textures/grid.png")
    return (     
        <group>
            <axesHelper args={[15,15]}/>
            <mesh rotation={[-Math.PI/2,0,0]} receiveShadow>
                <planeGeometry  args={[15,15]}/>
                <shadowMaterial color="#171717" transparent opacity={0.5}/>
            </mesh>
            <mesh rotation={[-Math.PI/2,0,0]}>
                <planeGeometry  args={[15,15]}/>
                <meshBasicMaterial color="#add8e6" />
            </mesh>
        </group> 
    )
}