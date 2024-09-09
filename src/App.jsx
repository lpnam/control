import { Environment, PerspectiveCamera, OrbitControls } from "@react-three/drei"
import { Ground } from "./Ground"
import { Box } from "./Box"
import { Car } from "./Car"
import { useState, useEffect, useRef } from "react"

function App() {
  const [thirdperson, setThirdPerson] = useState(false)
  const [cameraPosition, setCameraPosition] = useState([-9, 7.9, 10])

  useEffect(() => {
    const keyDownPressHandle = (e) => {
      if(e.key==="k"){
        setThirdPerson((prev) => !prev);
        if(thirdperson) setCameraPosition([-9, 7.9, 10 + Math.random() * 0.01])
        else setCameraPosition([-9, 7.9, 10])
        console.log("HERE")
      }
    }
    window.addEventListener('keydown', keyDownPressHandle);
    return () => {
        window.removeEventListener('keydown', keyDownPressHandle);
    }
}, [thirdperson]);
  return (
    <>
        <Environment files={"textures/envmap.hdr"} background={"both"}/>
        <PerspectiveCamera makeDefault position={cameraPosition} fov={60}/>
        <OrbitControls />
        <ambientLight />
        <directionalLight position={[10, 10, 10]} castShadow shadow-mapSize={[2048, 2048]} />
        <Ground />
        <Box position={[0, 5, 0]}/>
        <Car thirdPersonControl={thirdperson}/>
    </>
  )
}

export default App
