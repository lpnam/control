import { Environment, PerspectiveCamera, OrbitControls } from "@react-three/drei"
import { Ground } from "./Ground"


function App() {

  return (
    <>
        <Environment files={"textures/envmap.hdr"} background={"both"}/>
        <PerspectiveCamera makeDefault position={[-6, 3.9, 6.21]} fov={45}/>
        <OrbitControls />
        <Ground />
    </>
  )
}

export default App
