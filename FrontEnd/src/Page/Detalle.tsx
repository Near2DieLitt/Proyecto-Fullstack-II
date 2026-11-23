import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { agregarAlCarrito } from '../components/ts/almacenamiento'
import MigasDePan from '../components/Molecule/MigasDePan'
import DetalleProducto from '../components/Organism/DetalleProducto'
import { obtenerProductoDeTienda } from '../service/catalogoTiendaServicio'
import { mensajeDeError } from '../service/api'
import type { Producto } from '../components/ts/datos'

function Detalle() {
  const { id } = useParams()
  const navegar = useNavigate()
  const [producto, setProducto] = useState<Producto | null>(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) return
    let activa = true
    obtenerProductoDeTienda(id)
      .then((resultado) => { if (activa) setProducto(resultado) })
      .catch((errorCarga: unknown) => { if (activa) setError(mensajeDeError(errorCarga, 'No se pudo cargar el producto.')) })
      .finally(() => { if (activa) setCargando(false) })
    return () => { activa = false }
  }, [id])

  if (cargando) return <main className="container py-5"><p role="status">Cargando producto...</p></main>
  if (error || !producto) return <main className="container py-5"><p role="alert">{error || 'Producto no encontrado.'}</p><Link to="/catalogo">Volver al catálogo</Link></main>

  const agregar = (cantidad: number) => {
    const agregado = agregarAlCarrito(
      { id: producto.id, nombre: producto.nombre, precio: producto.precio, imagen: producto.imagen },
      cantidad,
    )
    if (!agregado) {
      alert('No se pudo agregar: la cantidad supera el stock disponible.')
      return
    }
    alert('¡Producto añadido al carrito con éxito!')
    navegar('/catalogo')
  }

  return (
    <main className="container py-5 my-4 min-vh-100">
      <div className="mb-4">
        <MigasDePan migas={[{ texto: 'Home', a: '/' }, { texto: 'Catálogo', a: '/catalogo' }, { texto: producto.categoria || 'Producto' }]} />
      </div>
      <DetalleProducto key={producto.id} producto={producto} onAgregar={agregar} />
    </main>
  )
}

export default Detalle