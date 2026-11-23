import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import TarjetaProducto from '../components/Molecule/TarjetaProducto'
import { listarProductosDeTienda } from '../service/catalogoTiendaServicio'
import { mensajeDeError } from '../service/api'
import type { Producto } from '../components/ts/datos'

function Catalogo() {
  const [parametros] = useSearchParams()
  const categoria = parametros.get('categoria')?.trim() ?? ''
  const normalizar = (valor: string) =>
    valor.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase()
  const [productos, setProductos] = useState<Producto[]>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [intento, setIntento] = useState(0)

  useEffect(() => {
    let activa = true
    setCargando(true)
    setError('')
    listarProductosDeTienda()
      .then((resultado) => { if (activa) setProductos(resultado) })
      .catch((errorCarga: unknown) => { if (activa) setError(mensajeDeError(errorCarga, 'No se pudo cargar el catálogo.')) })
      .finally(() => { if (activa) setCargando(false) })
    return () => { activa = false }
  }, [intento])
  const categorias = [...new Set(productos.map((producto) => producto.categoria))].sort((a, b) => a.localeCompare(b, 'es'))
  const productosFiltrados = categoria
    ? productos.filter((producto) => normalizar(producto.categoria).startsWith(normalizar(categoria)))
    : productos

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
      <div className="row g-4">
        {productosFiltrados.map((p) => (
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
      {cargando && <p role="status" className="text-center">Cargando productos...</p>}
      {error && (
        <div className="text-center" role="alert">
          <p>{error}</p>
          <button type="button" className="btn btn-outline-dark" onClick={() => setIntento((actual) => actual + 1)}>
            Reintentar
          </button>
        </div>
      )}
      {!cargando && !error && productosFiltrados.length === 0 && (
        <p className="text-center text-muted">No hay productos en esta categoría.</p>
      )}
    </main>
  )
}export default Catalogo
