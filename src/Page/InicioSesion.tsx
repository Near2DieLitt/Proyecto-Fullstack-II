import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { cerrarSesion, obtenerSesion } from '../components/ts/almacenamiento'
import Logo from '../components/Atoms/Logo'
import PestanasSesion from '../components/Molecule/PestanasSesion'
import FormularioIngreso from '../components/Organism/FormularioIngreso'
import PanelSesionActiva from '../components/Organism/PanelSesionActiva'

 function InicioSesion() {
  const [sesion, setSesion] = useState(obtenerSesion)
  const navegar = useNavigate()

  function salir() {
    cerrarSesion()
    setSesion(null)
    navegar('/inicio-sesion')
  }

  return (
    <main>
      <div className="login">
        {sesion ? (
          <PanelSesionActiva sesion={sesion} onCerrarSesion={salir} />
        ) : (
          <>
            <Logo centrado />
            <PestanasSesion activa="ingreso" />
            <FormularioIngreso />
          </>
        )}
      </div>
    </main>
  )
}export default InicioSesion
