import { useEffect, useState } from "react"
import Estadisticas from "../components/Organism/Estadisticas"
import ImagenPrincipal from "../components/Organism/ImagenPrincipal"
import SeccionProductos, { ProductoDestacado } from "../components/Organism/SeccionProductos"
import { agregarAlCarrito } from "../components/ts/almacenamiento"
import BannerImagen from "../components/Organism/BannerImagen"
import Boton from "../components/Atoms/boton"
import SeccionCategorias from "../components/Organism/SeccionCategorias"
import BannerVisita from "../components/Organism/BannerVisita"
import { listarProductosDeTienda } from "../service/catalogoTiendaServicio"
import { mensajeDeError } from "../service/api"
import type { Producto } from "../components/ts/datos"



const imagenesPorCategoria: Record<string, string> = {
  Guitarras: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPn_3t78XmiThs7jOIoz5zPu1fBIaV1kc5eVw-44Cr7A&s=10',
  Teclados: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThCyQaJuLJZ6d_Vefu0tXNaws_cnYs0M6QxVP54DA8MA&s=10',
  Percusion: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=600&q=80',
  Audio: 'https://www.blupointmusic.cl/wp-content/uploads/2026/04/Shure-MV7X-Microfono-Dinamico-3.webp',
  Accesorios: 'https://f.fcdn.app/imgs/5d8f5e/www.palaciodelamusica.com.uy/pmusuy/1f2e/original/catalogo/DS1-DS1_1/1920-1200/pedal-de-efectos-boss-ds1-distortion-pedal-de-efectos-boss-ds1-distortion.jpg',
}

function agregar({ id, nombre, precio, imagen }: ProductoDestacado) {
  const agregado = agregarAlCarrito({ id, nombre, precio, imagen })
  alert(agregado
    ? '¡Producto añadido al carrito con éxito!'
    : 'No se pudo agregar: alcanzaste el stock disponible de este producto.')
}

function Inicio() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    let activa = true
    listarProductosDeTienda()
      .then((resultado) => { if (activa) setProductos(resultado) })
      .catch((errorCarga: unknown) => { if (activa) setError(mensajeDeError(errorCarga, 'No se pudieron cargar los productos.')) })
    return () => { activa = false }
  }, [])

  const destacados = productos.filter((producto) => producto.destacado).slice(0, 4)
  const seleccion = productos.filter((producto) => !producto.destacado).slice(0, 4)
  const novedades = productos.slice(-4)
  const categorias = [...new Set(productos.map((producto) => producto.categoria))].map((nombre) => ({
    nombre,
    imagen: imagenesPorCategoria[nombre] ?? productos.find((producto) => producto.categoria === nombre)?.imagen ?? '',
  }))
  const estadisticas = [
    { valor: String(productos.length), etiqueta: 'PRODUCTOS' },
    { valor: '48 h', etiqueta: 'DESPACHO' },
    { valor: '10', etiqueta: 'AÑOS DE EXPERIENCIA' },
    { valor: '100%', etiqueta: 'GARANTÍA OFICIAL' },
  ]

  return (
    <main>
      <ImagenPrincipal />
      <Estadisticas items={estadisticas} />
      {error && <p role="alert" className="container text-center">{error}</p>}
      <SeccionProductos titulo="Destacados" productos={destacados} onAgregar={agregar} />
      <BannerImagen
        etiqueta="CATEGORÍA"
        titulo="Guitarras"
        texto="Desde eléctricas a acústicas. Fender, Gibson, Yamaha, y las mejores marcas del mundo."
        imagen="https://thumb.wikimedia.org/wikipedia/commons/thumb/4/44/Sonic_Vista_Stduios_%28Guitar_Wall%29.jpg/1280px-Sonic_Vista_Stduios_%28Guitar_Wall%29.jpg"
        alt="Guitarras Banner"
      >
        <Boton a="/catalogo" variante="dark" className="rounded-0 px-4 py-2 fw-bold fs-7">
          EXPLORAR
        </Boton>
      </BannerImagen>
      <SeccionProductos titulo="Selección" productos={seleccion} onAgregar={agregar} />
      <SeccionCategorias categorias={categorias} />
      <SeccionProductos titulo="Novedades" productos={novedades} onAgregar={agregar} />
      <BannerVisita />
    </main>
  )
} export default Inicio
