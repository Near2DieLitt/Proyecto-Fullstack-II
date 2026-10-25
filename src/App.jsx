import { useEffect } from "react"
import { useLocation } from "react-router-dom"


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
          <Route path="/novedades/:id" element={<Novedades />} />
          <Route path="/sobre-nosotros" element={<Articulo />} />
          <Route path="/contacto" element={<Contacto/>} />
          <Route path="/nuestra-tienda" element={<NuestraTienda />} />
          <Route path="/inicio-sesion" element={<InicoSesion />} />
          <Route path="/registrarse" element={<MiPerfil />} />
          <Route path="/admin-productos" element={<AdminProductos />} />
      </Routes>
      <PiePagina />
    </>
  )
}

export default App