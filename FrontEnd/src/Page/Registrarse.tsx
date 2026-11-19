import { useState } from "react"
import { cerrarSesion, obtenerSesion } from "../components/ts/almacenamiento"
import { useNavigate } from "react-router-dom"
import PanelSesionActiva from "../components/Organism/PanelSesionActiva"
import Logo from "../components/Atoms/Logo"
import PestanasSesion from "../components/Molecule/PestanasSesion"
import FormularioRegistro from "../components/Organism/FormularioRegistro"

function Registrarse() {
  const [sesion, setSesion] = useState(obtenerSesion)
  const navegar = useNavigate()

  function salir() {
    cerrarSesion()
    setSesion(null)
    navegar('/inicio-sesion')
  }

  return (
    <main>
      <div className="login caja-registro">
        {sesion ? (
          <PanelSesionActiva sesion={sesion} onCerrarSesion={salir} />
        ) : (
          <>
            <Logo centrado />
            <PestanasSesion activa="registro" />
            <FormularioRegistro />
          </>
        )}
      </div>
    </main>
  )
}

export default Registrarse