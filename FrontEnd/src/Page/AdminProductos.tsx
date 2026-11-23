import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { guardarProductos, obtenerProductos, obtenerSesion } from '../components/ts/almacenamiento'
import { Producto } from '../components/ts/datos'
import Boton from '../components/Atoms/boton'
import TablaProductos from '../components/Organism/TablaProductos'
import ProductoAdmin from '../components/Organism/ProductoAdmin'
import { ajustarStock } from '../service/inventarioServicio'
import { mensajeDeError } from '../service/api'
import { crearInventarioInicial } from '../service/inventarioServicio'
import { actualizarProductoDeTienda, crearMarca, crearProducto, eliminarProducto, listarCategorias, listarMarcas } from '../service/productosServicio'

interface OpcionCatalogo {
  id: number
  nombre: string
}

function AdminProductos() {
  const esAdmin = obtenerSesion()?.rol === 'admin'
  const navegar = useNavigate()
  const [productos, setProductos] = useState<Producto[]>(obtenerProductos)
  const [editando, setEditando] = useState<Producto | null | undefined>(undefined)
  const [categorias, setCategorias] = useState<OpcionCatalogo[]>([])
  const [marcas, setMarcas] = useState<OpcionCatalogo[]>([])
  const [cargandoOpciones, setCargandoOpciones] = useState(true)
  const [errorOpciones, setErrorOpciones] = useState('')

  useEffect(() => {
    if (!esAdmin) {
      alert('Acceso denegado. Solo personal autorizado.')
      navegar('/inicio-sesion', { replace: true })
    }
  }, [esAdmin, navegar])

  useEffect(() => {
    let activa = true
    Promise.all([listarCategorias(), listarMarcas()])
      .then(([categoriasDisponibles, marcasDisponibles]) => {
        if (!activa) return
        setCategorias(categoriasDisponibles)
        setMarcas(marcasDisponibles)
      })
      .catch((error: unknown) => {
        if (activa) setErrorOpciones(mensajeDeError(error, 'No se pudieron cargar categorías y marcas.'))
      })
      .finally(() => { if (activa) setCargandoOpciones(false) })
    return () => { activa = false }
  }, [])

  if (!esAdmin) return null

  function actualizar(nuevos: Producto[]) {
    setProductos(nuevos)
    guardarProductos(nuevos)
  }

  async function guardar(producto: Producto) {
    const idCategoria = producto.idCategoria
    if (idCategoria === undefined || !Number.isSafeInteger(idCategoria) || idCategoria < 1) {
      alert('Selecciona una categoría válida antes de guardar.')
      return
    }
    const nombreMarca = producto.marca.trim()
    if (!nombreMarca) {
      alert('Escribe una marca antes de guardar.')
      return
    }

    let idMarca: number
    const marcaExistente = marcas.find((marca) => marca.nombre.localeCompare(nombreMarca, 'es', { sensitivity: 'accent' }) === 0)
    try {
      const marca = marcaExistente ?? await crearMarca(nombreMarca)
      idMarca = marca.id
      if (!marcaExistente) setMarcas((actuales) => [...actuales, marca])
    } catch (error) {
      alert(`No se pudo guardar la marca: ${mensajeDeError(error)}`)
      return
    }

    if (editando) {
      const idProducto = Number(producto.id)
      if (!Number.isSafeInteger(idProducto) || idProducto < 1) {
        alert('El código del producto no corresponde a un ID válido del catálogo.')
        return
      }

      try {
        const productoBackend = await actualizarProductoDeTienda(idProducto, {
          nombre: producto.nombre,
          precio: producto.precio,
          descripcion: producto.descripcion,
          imagenUrl: producto.imagen,
          idCategoria,
          idMarca,
        })
        const inventario = await ajustarStock(idProducto, producto.stock)
        const actualizado: Producto = {
          ...producto,
          id: String(productoBackend.id),
          nombre: productoBackend.nombre,
          precio: Number(productoBackend.precio),
          descripcion: productoBackend.descripcion ?? '',
          categoria: productoBackend.categoria,
          marca: productoBackend.marca,
          imagen: productoBackend.imagenUrl ?? '',
          stock: inventario.stockTotal,
        }
        actualizar(productos.map((p) => (p.id === editando.id ? actualizado : p)))
        setEditando(undefined)
      } catch (error) {
        alert(`No se pudo guardar el producto: ${mensajeDeError(error)}`)
      }
    } else {
      try {
        const creado = await crearProducto({
          nombre: producto.nombre.trim(),
          precio: producto.precio,
          idCategoria,
          idMarca,
          descripcion: producto.descripcion,
          imagenUrl: producto.imagen,
          destacado: producto.destacado ?? false,
        })
        let inventario: { stockActual: number; stockMinimo: number }
        try {
          inventario = await crearInventarioInicial(creado.id, producto.stock, producto.stockCritico)
        } catch (errorInventario) {
          await eliminarProducto(creado.id).catch(() => undefined)
          throw errorInventario
        }

        actualizar([...productos, {
          ...producto,
          id: String(creado.id),
          nombre: creado.nombre,
          precio: Number(creado.precio),
          categoria: creado.categoria,
          marca: creado.marca,
          descripcion: creado.descripcion ?? '',
          imagen: creado.imagenUrl ?? '',
          destacado: creado.destacado,
          idCategoria: creado.idCategoria,
          idMarca: creado.idMarca,
          stock: inventario.stockActual,
          stockCritico: inventario.stockMinimo,
        }])
        setEditando(undefined)
      } catch (error) {
        alert(`No se pudo crear el producto: ${mensajeDeError(error)}`)
      }
    }
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
        <Boton variante="dark" onClick={() => setEditando(null)} disabled={cargandoOpciones || Boolean(errorOpciones)}>
          {cargandoOpciones ? 'Cargando opciones...' : '+ NUEVO PRODUCTO'}
        </Boton>
      </div>
      {errorOpciones && <p role="alert" className="alert alert-danger">{errorOpciones}</p>}

      <TablaProductos productos={productos} onEditar={setEditando} onEliminar={eliminar} />

      {editando !== undefined && (
        <ProductoAdmin key={editando?.id ?? 'nuevo'} producto={editando} categorias={categorias} onGuardar={guardar} onCerrar={() => setEditando(undefined)} />
      )}
    </main>
  )
  
} export default AdminProductos
