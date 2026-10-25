import { useEffect } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import Inicio from './Page/Inicio'
import Catalogo from "./Page/Catalogo"
import Encabezado from './components/Organism/Encabezado'
import PiePagina from './components/Organism/PiePagina'
import Carrito from "./Page/Carrito"
import Detalle from "./Page/Detalle"
import AdminProductos from "./Page/AdminProductos"
import InicioSesion from './Page/InicioSesion'
import SobreNosotros from './Page/SobreNosotros'
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
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/producto/:id" element={<Detalle />} />
          <Route path="/admin-productos" element={<AdminProductos />} />
          <Route path="/inicio-sesion" element={<InicioSesion />} />
          <Route path="/sobre-nosotros" element={<SobreNosotros />} />

      </Routes>
      <PiePagina />
    </>
  )
}

export default App