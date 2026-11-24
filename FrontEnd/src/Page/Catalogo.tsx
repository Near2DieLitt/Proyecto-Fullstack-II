import { Link, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { listarProductos } from '../servicios/productosServicio'
import type { Producto as ProductoApi } from '../servicios/tipos'
import TarjetaProducto from '../components/Molecule/TarjetaProducto'

function Catalogo() {
  const [parametros] = useSearchParams()
  const categoria = parametros.get('categoria')?.trim() ?? ''
  const normalizar = (valor: string) =>
    valor.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase()
  const [productos, setProductos] = useState<ProductoApi[]>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  useEffect(() => {
    listarProductos()
      .then(setProductos)
      .catch(() => setError('No se pudo cargar el catálogo.'))
      .finally(() => setCargando(false))
  }, [categoria])
  const categoriasPermitidas = new Set(['Accesorios', 'Audio', 'Guitarras', 'Percusion', 'Teclados'])
  const categorias = [...new Set(productos.map((producto) => producto.categoria))]
    .filter((nombre) => categoriasPermitidas.has(nombre))
    .sort((a, b) => a.localeCompare(b, 'es'))
  const productosFiltrados = categoria
    ? productos.filter((producto) => categoriasPermitidas.has(producto.categoria) && normalizar(producto.categoria) === normalizar(categoria))
    : productos.filter((producto) => categoriasPermitidas.has(producto.categoria))

  return (
    <main className="container py-5 my-5">
      <h1 className="playfair-font fw-bold text-center mb-5">Nuestro Catálogo</h1>
      <nav aria-label="Filtrar productos por categoría" className="d-flex flex-wrap justify-content-center gap-2 mb-5">
        <Link
          to="/catalogo"
          className={`btn rounded-0 ${categoria ? 'btn-outline-dark' : 'btn-dark'}`}
          aria-current={categoria ? undefined : 'page'}
        >
          Todas
        </Link>
        {categorias.map((nombre) => (
          <Link
            key={nombre}
            to={`/catalogo?categoria=${encodeURIComponent(nombre)}`}
            className={`btn rounded-0 ${normalizar(categoria) === normalizar(nombre) ? 'btn-dark' : 'btn-outline-dark'}`}
            aria-current={normalizar(categoria) === normalizar(nombre) ? 'page' : undefined}
          >
            {nombre}
          </Link>
        ))}
      </nav>
      {categoria && (
        <div className="d-flex justify-content-between align-items-center mb-4">
          <p className="mb-0">Categoría: <strong>{categoria}</strong></p>
          <Link to="/catalogo" className="text-dark">Ver todas las categorías</Link>
        </div>
      )}
      {cargando && <p className="text-center">Cargando productos...</p>}
      {error && <p className="text-center text-danger">{error}</p>}
      <div className="row g-4">
        {productosFiltrados.map((p) => (
          <div className="col-12 col-sm-6 col-lg-4" key={p.id}>
            <TarjetaProducto
              imagen={p.imagenUrl ?? ''}
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
      {productosFiltrados.length === 0 && (
        <p className="text-center text-muted">No hay productos en esta categoría.</p>
      )}
    </main>
  )
}export default Catalogo
