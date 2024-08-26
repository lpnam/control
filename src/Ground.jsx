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
        <>
            <axesHelper />
            <mesh rotation={[-Math.PI/2,0,0]}>
                <planeGeometry  args={[15,15]}/>
                <meshBasicMaterial 
                    map={gridmap}
                />
            </mesh>
        </>
    )
}