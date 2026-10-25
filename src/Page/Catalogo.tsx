import { obtenerProductos } from '../components/ts/almacenamiento'
import TarjetaProducto from '../components/Molecule/TarjetaProducto'

function Catalogo() {
  const productos = obtenerProductos()

  return (
    <main className="container py-5 my-5">
      <h1 className="playfair-font fw-bold text-center mb-5">Nuestro Catálogo</h1>
      <div className="row g-4">
        {productos.map((p) => (
          <div className="col-12 col-sm-6 col-lg-4" key={p.id}>
            <TarjetaProducto
              imagen={p.imagen}
              nombre={p.nombre}
              marca={p.marca}
              precio={p.precio}
              textoBoton="VER DETALLE"
              a={`/producto/${p.id}`}
              centrado
            />
          </div>
        ))}
      </div>
    </main>
  )
}export default Catalogo
