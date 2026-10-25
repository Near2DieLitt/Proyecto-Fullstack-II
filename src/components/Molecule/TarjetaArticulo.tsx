import { Link } from 'react-router-dom'
import type { Articulo } from '../../datos'
import Insignia from '../Atoms/Insignia'


interface Props {
  articulo: Articulo
}

function TarjetaArticulo({ articulo }: Props) {
  const ruta = `/novedades/${articulo.id}`
  return (
    <div className="article-card">
      <Link to={ruta} className="card-img-link">
        <div className="card-img-placeholder">
          <img src={articulo.imagen} alt={articulo.alt} />
        </div>
      </Link>
      <div className="article-meta mt-3">
        <Insignia clase="badge-outline">{articulo.categoria}</Insignia>
        <span>{articulo.fecha}</span>
      </div>
      <Link to={ruta} className="text-decoration-none">
        <h3 className="card-title">{articulo.titulo}</h3>
      </Link>
      <p className="article-excerpt fs-7">{articulo.extracto}</p>
    </div>
  )
}export default TarjetaArticulo
