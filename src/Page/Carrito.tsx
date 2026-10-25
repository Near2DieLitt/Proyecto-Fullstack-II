import { useState } from 'react'
import { guardarCarrito, obtenerCarrito } from '../components/ts/almacenamiento'
import { Link, useNavigate } from 'react-router-dom'
import type { ItemCarrito as Item } from '../components/ts/datos'
import ItemCarrito from '../components/Molecule/ItemCArrito'
import ResumenCarrito from '../components/Organism/ResumenCarrito'



function Carrito() {
 const [carrito, setCarrito] = useState<Item[]>(obtenerCarrito)
  const navegar = useNavigate()

  function actualizar(nuevo: Item[]) {
    setCarrito(nuevo)
    guardarCarrito(nuevo)
  }

  function cambiarCantidad(id: string, cambio: number) {
    actualizar(
      carrito
        .map((p) => (p.id === id ? { ...p, cantidad: p.cantidad + cambio } : p))
        .filter((p) => p.cantidad > 0),
    )
  }

  function eliminar(id: string) {
    actualizar(carrito.filter((p) => p.id !== id))
  }

  function vaciar() {
    if (confirm('¿Estás seguro de vaciar el carrito?')) actualizar([])
  }

  function pagar() {
    if (carrito.length === 0) {
      alert('Agrega productos al carrito primero.')
      return
    }
    alert('Procesando pago... ')
    actualizar([])
    navegar('/catalogo')
  }

  const total = carrito.reduce((suma, p) => suma + p.precio * p.cantidad, 0)

  return (
    <main className="container py-5 my-4 min-vh-100">
      <h1 className="playfair-font fw-bold mb-5">Mi carrito de compras</h1>

      <div className="row g-5">
        <div className="col-12 col-lg-8">
          {carrito.length === 0 ? (
            <div className="alert alert-light text-center py-5 border text-muted">
              Tu carrito está vacío.{' '}
              <Link to="/catalogo" className="text-dark fw-bold">
                Volver al catálogo
              </Link>
            </div>
          ) : (
            carrito.map((item) => (
              <ItemCarrito key={item.id} item={item} onCambiarCantidad={cambiarCantidad} onEliminar={eliminar} />
            ))
          )}
        </div>

        <div className="col-12 col-lg-4">
          <ResumenCarrito total={total} onPagar={pagar} onVaciar={vaciar} />
        </div>
      </div>
    </main>
  )

}export default Carrito