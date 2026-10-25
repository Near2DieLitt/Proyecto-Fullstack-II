interface Props {
  nombre: string
  imagen: string
}

function TarjetaCategoria({ nombre, imagen }: Props) {
  return (
    <div className="category-box position-relative overflow-hidden">
      <img src={imagen} alt={nombre} className="w-100 h-100 object-fit-cover" />
      <div className="position-absolute bottom-0 start-0 p-3 text-white w-100 bg-gradient-dark">
        <h4 className="playfair-font mb-0 fw-bold">{nombre}</h4>
      </div>
    </div>
  )
}export default TarjetaCategoria
