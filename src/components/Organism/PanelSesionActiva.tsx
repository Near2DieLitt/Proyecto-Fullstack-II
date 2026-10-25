import Boton from "../Atoms/boton"
import Icono from "../Atoms/Icono"
import Logo from "../Atoms/Logo"
import { Sesion } from "../ts/datos"


interface Props {
  sesion: Sesion
  onCerrarSesion: () => void
}
function PanelSesionActiva({ sesion, onCerrarSesion }: Props) {
  const destino = sesion.rol === 'admin' ? '/admin-productos' : '/mi-perfil'

  return (
    <>
      <Logo centrado />
      <div className="text-center mt-5 mb-5">
        <Icono nombre="circle-check" className="text-success mb-3 fs-1" />
        <h3 className="fw-bold mb-3">¡Bienvenido de vuelta, {sesion.nombre}!</h3>
        <p className="text-muted mb-4">Ya tienes una sesión activa en este dispositivo.</p>
        <Boton a={destino} variante="submit" className="text-decoration-none d-block text-center mb-3">
          IR A MI PANEL
        </Boton>
        <Boton variante="outline-dark" className="w-100 fw-bold" style={{ padding: 15, letterSpacing: 1 }} onClick={onCerrarSesion}>
          CERRAR SESIÓN
        </Boton>
      </div>
    </>
  )
}
export default PanelSesionActiva
