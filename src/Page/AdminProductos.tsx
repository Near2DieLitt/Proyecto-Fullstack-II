import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { guardarProductos, obtenerProductos, obtenerSesion } from '../components/ts/almacenamiento'
import { Producto } from '../components/ts/datos'
import Boton from '../components/Atoms/boton'
import TablaProductos from '../components/Organism/TablaProductos'
import ProductoAdmin from '../components/Organism/ProductoAdmin'

function AdminProductos() {
  const esAdmin = obtenerSesion()?.rol === 'admin'
  const navegar = useNavigate()
  const [productos, setProductos] = useState<Producto[]>(obtenerProductos)
  const [editando, setEditando] = useState<Producto | null | undefined>(undefined)

  useEffect(() => {
    if (!esAdmin) {
      alert('Acceso denegado. Solo personal autorizado.')
      navegar('/inicio-sesion', { replace: true })
    }
  }, [esAdmin, navegar])

  if (!esAdmin) return null

  function actualizar(nuevos: Producto[]) {
    setProductos(nuevos)
    guardarProductos(nuevos)
  }

  function guardar(producto: Producto) {
    if (editando) {
      actualizar(productos.map((p) => (p.id === editando.id ? producto : p)))
    } else {
      if (productos.some((p) => p.id === producto.id)) {
        alert('Ya existe un producto con ese código.')
        return
      }
      actualizar([...productos, producto])
    }
    setEditando(undefined)
  }

  function eliminar(producto: Producto) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      actualizar(productos.filter((p) => p.id !== producto.id))
    }
  }

  return (
    <main className="container py-5 min-vh-100">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="playfair-font fw-bold">Mantenedor de Productos</h1>
        <Boton variante="dark" onClick={() => setEditando(null)}>
          + NUEVO PRODUCTO
        </Boton>
      </div>

      <TablaProductos productos={productos} onEditar={setEditando} onEliminar={eliminar} />

      {editando !== undefined && (
        <ProductoAdmin key={editando?.id ?? 'nuevo'} producto={editando} onGuardar={guardar} onCerrar={() => setEditando(undefined)} />
      )}
    </main>
  )
  
} export default AdminProductos
