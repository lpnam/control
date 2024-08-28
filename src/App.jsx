import { Environment, PerspectiveCamera, OrbitControls } from "@react-three/drei"
import { Ground } from "./Ground"
import { Box } from "./Box"
import { Car } from "./Car"

function App() {
  return (
    <>
        <Environment files={"textures/envmap.hdr"} background={"both"}/>
        <PerspectiveCamera makeDefault position={[-14, 7.9, 14.21]} fov={60}/>
        <OrbitControls />
        <ambientLight />
        <directionalLight position={[10, 10, 10]} castShadow shadow-mapSize={[2048, 2048]} />
        <Ground />
        <Box position={[0, 5, 0]}/>
        <Car />
    </>
  )
}

export default App
