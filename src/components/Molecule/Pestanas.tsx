import { useNavigate } from 'react-router-dom'

interface Props {
  activa: 'ingreso' | 'registro'
}

function Pestanas({ activa }: Props) {
  const navegar = useNavigate()

  return (
    <div className="pestanas">
      <button className={activa === 'ingreso' ? 'activa' : ''} onClick={() => navegar('/inicio-sesion')}>
        INICIAR SESIÓN
      </button>
      <button className={activa === 'registro' ? 'activa' : ''} onClick={() => navegar('/registrarse')}>
        REGISTRARSE
      </button>
    </div>
  )
} export default Pestanas
