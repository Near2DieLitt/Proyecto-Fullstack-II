import { Link } from 'react-router-dom'

interface Props {
  titulo: string
  enlace?: string
}

function EncabezadoSeccion({ titulo, enlace = '/catalogo' }: Props) {
  return (
    <div className="d-flex justify-content-between align-items-end mb-4">
      <h2 className="playfair-font fw-bold mb-0 text-dark display-6">{titulo}</h2>
      <Link to={enlace} className="view-all-link">
        VER TODOS
      </Link>
    </div>
  )
} export default EncabezadoSeccion