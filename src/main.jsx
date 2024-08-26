import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/cannon'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Canvas shadows>
      <Suspense fallback={null}>
        <Physics
          broadphase='SAP'
          gravity={[0, -9.82, 0]}
        >
          <App />
        </Physics>
      </Suspense>
    </Canvas>
  </StrictMode>,
)
