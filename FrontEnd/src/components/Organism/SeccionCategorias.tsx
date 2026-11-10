import TarjetaCategoria from '../Molecule/TarjetaCategoria';


interface Props {
  categorias: { nombre: string; imagen: string }[]
}

function SeccionCategorias({ categorias }: Props) {
  return (
    <section className="container py-5">
      <h2 className="playfair-font fw-bold mb-4 text-dark display-6">Categorías</h2>
      <div className="row g-4">
        {categorias.map((c) => (
          <div className="col-12 col-sm-6 col-lg-3" key={c.nombre}>
            <TarjetaCategoria {...c} />
          </div>
        ))}
      </div>
    </section>
  )
} export default SeccionCategorias
