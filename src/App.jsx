import { useEffect } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import Inicio from './Page/Inicio'
import Encabezado from './components/Organism/Encabezado'
import PiePagina from './components/Organism/PiePagina'
import './App.css'

function App(){
  const { pathname } = useLocation()

  useEffect(()=> {
    window.scrollTo(0,0)
  }, [pathname])
  
  return(
    <>
      <Encabezado />
      <Routes>
          <Route path="/" element={<Inicio />} />
      </Routes>
      <PiePagina />
    </>
  )
}

export default App