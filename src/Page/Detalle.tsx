import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { agregarAlCarrito, obtenerProductos } from '../components/ts/almacenamiento'
import MigasDePan from '../components/Molecule/MigasDePan'
import DetalleProducto from '../components/Organism/DetalleProducto'

function Detalle() {
  const { id } = useParams()
  const navegar = useNavigate()
  const producto = obtenerProductos().find((p) => p.id === id)


  if (!producto) return <Navigate to="/catalogo" replace />

  function agregar(cantidad: number) {
    if (!producto) return
    agregarAlCarrito({ id: producto.id, nombre: producto.nombre, precio: producto.precio, imagen: producto.imagen }, cantidad)
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
} export default Detalle
