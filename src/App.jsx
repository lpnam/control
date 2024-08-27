import { Environment, PerspectiveCamera, OrbitControls } from "@react-three/drei"
import { Ground } from "./Ground"
import { Box } from "./Box"

function App() {

  return (
    <>
        <Environment files={"textures/envmap.hdr"} background={"both"}/>
        <PerspectiveCamera makeDefault position={[-6, 3.9, 6.21]} fov={45}/>
        <OrbitControls />
        <ambientLight />
        <directionalLight position={[10, 10, 10]} castShadow shadow-mapSize={[2048, 2048]} />
        <Ground />
        <Box />
    </>
  )
}

export default App
