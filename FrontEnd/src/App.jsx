import { useEffect } from "react"
import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import Inicio from './Page/Inicio'
import Catalogo from "./Page/Catalogo"
import Encabezado from './components/Organism/Encabezado'
import PiePagina from './components/Organism/PiePagina'
import Carrito from "./Page/Carrito"
import Detalle from "./Page/Detalle"
import AdminProductos from "./Page/AdminProductos"
import InicioSesion from './Page/InicioSesion'
import SobreNosotros from './Page/SobreNosotros'
import Novedades from "./Page/Novedades"
import MiPerfil from "./Page/MiPerfil"
import Articulo from "./Page/Articulo"
import Contacto from "./Page/Contacto"
import NuestraTienda from "./Page/NuestraTienda"
import Registrarse from "./Page/Registrarse"
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
          <Route path="/producto/:id" element={<Detalle />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/novedades" element={<Novedades />} />
          <Route path="/novedades/:id" element={<Articulo />} />
          <Route path="/sobre-nosotros" element={<SobreNosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/nuestra-tienda" element={<NuestraTienda />} />
          <Route path="/inicio-sesion" element={<InicioSesion />} />
          <Route path="/registrarse" element={<Registrarse />} />
          <Route path="/mi-perfil" element={<MiPerfil />} />
          <Route path="/admin-productos" element={<AdminProductos />} />

          <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <PiePagina />
    </>
  )
}

export default App