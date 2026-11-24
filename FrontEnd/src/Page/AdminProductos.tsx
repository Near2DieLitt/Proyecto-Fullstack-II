import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { obtenerSesion } from '../components/ts/almacenamiento'
import type { Producto as ProductoLocal } from '../components/ts/datos'
import Boton from '../components/Atoms/boton'
import TablaProductos from '../components/Organism/TablaProductos'
import ProductoAdmin from '../components/Organism/ProductoAdmin'
import { crearProducto, editarProducto, eliminarProducto, listarCategorias, listarMarcas, listarProductos } from '../servicios/productosServicio'
import { agregarStock, crearInventario, descontarStock, stockDeProducto } from '../servicios/inventarioServicio'
import type { Producto as ProductoApi } from '../servicios/tipos'

function convertir(producto: ProductoApi, stock = 0): ProductoLocal {
  return {
    id: String(producto.id),
    nombre: producto.nombre,
    precio: producto.precio,
    descripcion: producto.descripcion ?? '',
    categoria: producto.categoria,
    marca: producto.marca,
    stock,
    stockCritico: 2,
    imagen: producto.imagenUrl ?? '',
  }
}

function AdminProductos() {
  const esAdmin = obtenerSesion()?.rol === 'admin'
  const navegar = useNavigate()
  const [productos, setProductos] = useState<ProductoLocal[]>([])
  const [editando, setEditando] = useState<ProductoLocal | null | undefined>(undefined)
  const [categorias, setCategorias] = useState<{ id: number; nombre: string }[]>([])
  const [marcas, setMarcas] = useState<{ id: number; nombre: string }[]>([])
  const categoriasVisibles = new Set(['Accesorios', 'Audio', 'Guitarras', 'Percusion', 'Teclados'])

  useEffect(() => {
    if (!esAdmin) {
      alert('Acceso denegado. Solo personal autorizado.')
      navegar('/inicio-sesion', { replace: true })
      return
    }
    Promise.all([listarProductos(), listarCategorias(), listarMarcas()])
      .then(async ([items, categoriasApi, marcasApi]) => {
        const stocks = await Promise.all(items.map((item) => stockDeProducto(item.id).catch(() => ({ stockTotal: 0 }))))
        setProductos(items.map((item, index) => convertir(item, stocks[index].stockTotal)))
        setCategorias(categoriasApi.filter((item) => categoriasVisibles.has(item.nombre)))
        setMarcas(marcasApi)
      })
      .catch(() => alert('No se pudo cargar el catálogo.'))
  }, [esAdmin, navegar])

  if (!esAdmin) return null

  async function guardar(producto: ProductoLocal) {
    if (!Number.isFinite(producto.precio) || producto.precio <= 0 || producto.precio > 99999999.99) {
      alert('El precio debe estar entre $0,01 y $99.999.999,99.')
      return
    }
    if (!Number.isInteger(producto.stock) || producto.stock < 0) {
      alert('El stock debe ser un número entero positivo.')
      return
    }
    if (producto.imagen.length > 255) {
      alert('La URL de imagen no puede superar 255 caracteres. Usa una URL pública de imagen.')
      return
    }
    const idCategoria = categorias.find((item) => item.nombre === producto.categoria)?.id
    const idMarca = marcas.find((item) => item.nombre === producto.marca)?.id
    if (!idCategoria || !idMarca) {
      alert('Selecciona una categoría y marca existentes.')
      return
    }
    try {
      const datos = {
        nombre: producto.nombre,
        precio: producto.precio,
        idCategoria,
        idMarca,
        descripcion: producto.descripcion,
        imagenUrl: producto.imagen,
        destacado: false,
      }
      const respuesta = editando
        ? await editarProducto(Number(editando.id), datos)
        : await crearProducto(datos)
      const stockAnterior = editando?.stock ?? 0
      const stockNuevo = Math.max(0, Number(producto.stock) || 0)
      let stockFinal = stockAnterior
      if (!editando) {
        await crearInventario({ idProducto: respuesta.id, stockInicial: stockNuevo, stockMinimo: producto.stockCritico || 2 })
        stockFinal = stockNuevo
      } else if (stockNuevo !== stockAnterior) {
        const movimiento = stockNuevo > stockAnterior
          ? await agregarStock(respuesta.id, stockNuevo - stockAnterior, 'Ajuste desde panel admin')
          : await descontarStock(respuesta.id, stockAnterior - stockNuevo, 'Ajuste desde panel admin')
        stockFinal = movimiento.stockTotal
      }
      const convertido = convertir(respuesta, stockFinal)
      setProductos((actuales) => editando
        ? actuales.map((item) => item.id === convertido.id ? convertido : item)
        : [...actuales, convertido])
      setEditando(undefined)
    } catch (error) {
      alert(error instanceof Error ? error.message : 'No se pudo guardar el producto.')
    }
  }

  async function eliminar(producto: ProductoLocal) {
    if (!confirm('¿Estás seguro de que deseas eliminar este producto?')) return
    try {
      await eliminarProducto(Number(producto.id))
      setProductos((actuales) => actuales.filter((item) => item.id !== producto.id))
    } catch (error) {
      alert(error instanceof Error ? error.message : 'No se pudo eliminar el producto.')
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
        <ProductoAdmin
          key={editando?.id ?? 'nuevo'}
          producto={editando}
          onGuardar={guardar}
          onCerrar={() => setEditando(undefined)}
          categoriasApi={categorias}
          marcasApi={marcas}
        />
      )}
    </main>
  )
}

export default AdminProductos
