import { Link } from 'react-router-dom'

interface Props {
  nombre: string
  imagen: string
}

function TarjetaCategoria({ nombre, imagen }: Props) {
  return (
    <Link
      to={`/catalogo?categoria=${encodeURIComponent(nombre)}`}
      aria-label={`Ver categoría ${nombre}`}
      className="category-box position-relative overflow-hidden d-block text-decoration-none"
    >
      <img src={imagen} alt="" className="w-100 h-100 object-fit-cover" />
      <div className="position-absolute bottom-0 start-0 p-3 text-white w-100 bg-gradient-dark">
        <h4 className="playfair-font mb-0 fw-bold">{nombre}</h4>
      </div>
    </Link>
  )
}export default TarjetaCategoria
