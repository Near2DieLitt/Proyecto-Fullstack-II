import { useEffect, useState } from 'react'
import Estadisticas from '../components/Organism/Estadisticas'
import ImagenPrincipal from '../components/Organism/ImagenPrincipal'
import SeccionProductos, { ProductoDestacado } from '../components/Organism/SeccionProductos'
import { agregarAlCarrito } from '../components/ts/almacenamiento'
import BannerImagen from '../components/Organism/BannerImagen'
import Boton from '../components/Atoms/boton'
import BannerVisita from '../components/Organism/BannerVisita'
import { listarProductos } from '../servicios/productosServicio'
import type { Producto } from '../servicios/tipos'

const estadisticas = [
  { valor: '340+', etiqueta: 'PRODUCTOS' },
  { valor: '48 h', etiqueta: 'DESPACHO' },
  { valor: '10', etiqueta: 'AÑOS DE EXPERIENCIA' },
  { valor: '100%', etiqueta: 'GARANTÍA OFICIAL' },
]

function vista(producto: Producto): ProductoDestacado {
  return {
    id: String(producto.id), nombre: producto.nombre, marca: producto.marca,
    precio: producto.precio, imagen: producto.imagenUrl ?? '',
  }
}

function Inicio() {
  const [productos, setProductos] = useState<Producto[]>([])

  useEffect(() => {
    listarProductos().then(setProductos).catch(() => setProductos([]))
  }, [])

  const destacados = productos.filter((p) => p.destacado).slice(0, 4).map(vista)
  const novedades = productos.slice(0, 4).map(vista)
  const agregar = (producto: ProductoDestacado) => {
    const ok = agregarAlCarrito(producto)
    alert(ok ? 'Producto añadido al carrito.' : 'No se pudo agregar el producto.')
  }

  return (
    <main>
      <ImagenPrincipal />
      <Estadisticas items={estadisticas} />
      <SeccionProductos titulo="Destacados" productos={destacados} onAgregar={agregar} />
      <BannerImagen etiqueta="CATEGORÍA" titulo="Guitarras"
        texto="Desde eléctricas a acústicas. Fender, Gibson, Yamaha y las mejores marcas."
        imagen="https://thumb.wikimedia.org/wikipedia/commons/thumb/4/44/Sonic_Vista_Stduios_%28Guitar_Wall%29.jpg/1280px-Sonic_Vista_Stduios_%28Guitar_Wall%29.jpg"
        alt="Guitarras Banner">
        <Boton a="/catalogo" variante="dark" className="rounded-0 px-4 py-2 fw-bold fs-7">EXPLORAR</Boton>
      </BannerImagen>
      <SeccionProductos titulo="Novedades" productos={novedades} onAgregar={agregar} />
      <BannerVisita />
    </main>
  )
}

export default Inicio
