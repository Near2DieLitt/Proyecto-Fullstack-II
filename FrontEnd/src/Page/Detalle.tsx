import { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { agregarAlCarrito } from '../components/ts/almacenamiento'
import MigasDePan from '../components/Molecule/MigasDePan'
import DetalleProducto from '../components/Organism/DetalleProducto'
import { obtenerProducto } from '../servicios/productosServicio'
import { stockDeProducto } from '../servicios/inventarioServicio'
import type { Producto as ProductoApi } from '../servicios/tipos'

function Detalle() {
  const { id } = useParams()
  const navegar = useNavigate()
  const [producto, setProducto] = useState<ProductoApi | null>(null)
  const [stock, setStock] = useState(0)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!id) return
    const idProducto = Number(id)
    Promise.all([obtenerProducto(idProducto), stockDeProducto(idProducto)])
      .then(([productoApi, stockApi]) => {
        setProducto(productoApi)
        setStock(stockApi.stockTotal)
      })
      .catch(() => setError(true))
  }, [id])

  if (error) return <Navigate to="/catalogo" replace />
  if (!producto) return <p className="container py-5">Cargando producto...</p>

  const productoActual = producto

  const productoVista = {
    id: String(productoActual.id),
    marca: productoActual.marca,
    nombre: productoActual.nombre,
    precio: productoActual.precio,
    descripcion: productoActual.descripcion ?? '',
    categoria: productoActual.categoria,
    stock,
    stockCritico: 0,
    imagen: productoActual.imagenUrl ?? '',
  }

  function agregar(cantidad: number) {
    const agregado = agregarAlCarrito({
      id: String(productoActual.id), nombre: productoActual.nombre, precio: productoActual.precio,
      imagen: productoActual.imagenUrl ?? '',
    }, cantidad)
    if (!agregado) {
      alert('No se pudo agregar el producto al carrito.')
      return
    }
    alert('Producto añadido al carrito.')
    navegar('/carrito')
  }

  return (
    <main className="container py-5 my-4 min-vh-100">
      <div className="mb-4">
        <MigasDePan migas={[{ texto: 'Home', a: '/' }, { texto: 'Catálogo', a: '/catalogo' }, { texto: producto.categoria || 'Producto' }]} />
      </div>
      <DetalleProducto producto={productoVista} onAgregar={agregar} />
    </main>
  )
}

export default Detalle
