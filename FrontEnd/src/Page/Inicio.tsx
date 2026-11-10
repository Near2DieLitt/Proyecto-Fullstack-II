import Estadisticas from "../components/Organism/Estadisticas"
import ImagenPrincipal from "../components/Organism/ImagenPrincipal"
import SeccionProductos, { ProductoDestacado } from "../components/Organism/SeccionProductos"
import { agregarAlCarrito } from "../components/ts/almacenamiento"
import BannerImagen from "../components/Organism/BannerImagen"
import Boton from "../components/Atoms/boton"
import SeccionCategorias from "../components/Organism/SeccionCategorias"
import BannerVisita from "../components/Organism/BannerVisita"



const estadisticas = [
  { valor: '340+', etiqueta: 'PRODUCTOS' },
  { valor: '48 h', etiqueta: 'DESPACHO' },
  { valor: '10', etiqueta: 'AÑOS DE EXPERIENCIA' },
  { valor: '100%', etiqueta: 'GARANTÍA OFICIAL' },
]

const destacados: ProductoDestacado[] = [
  { id: 'INI-001', marca: 'FENDER', nombre: 'Stratocaster Player Series', precio: 649990, imagen: 'https://static.sonovente.com/img/library/zoom/61/450/61805_12.jpg' },
  { id: 'INI-002', marca: 'YAMAHA', nombre: 'F310 Acústica', precio: 129990, imagen: 'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?auto=format&fit=crop&w=600&q=80' },
  { id: 'INI-003', marca: 'GIBSON', nombre: "Les Paul Standard '60s", precio: 1899990, imagen: 'https://guitarsonmain.com/cdn/shop/files/epiphone-les-paul-standard-60s-figured-iced-tea-burst-w-gigbag-1218883078_2048x.jpg?v=1769862127' },
  { id: 'INI-004', marca: 'GIBSON', nombre: 'SG Standard', precio: 1299990, imagen: 'https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?auto=format&fit=crop&w=600&q=80' },
]

const seleccion: ProductoDestacado[] = [
  { id: 'INI-005', marca: 'FENDER', nombre: 'Jazz Bass Player', precio: 599990, imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJQ-XZG1aPbq9XfgkyYAgc4_lDqo_xbRVU8TnUU-7bSflNue_Qj3lvcYE&s=10' },
  { id: 'INI-006', marca: 'IBANEZ', nombre: 'SR300E', precio: 299990, imagen: 'https://dojiw2m9tvv09.cloudfront.net/69504/product/X_01c500a16a5afded9b450f5e020121388d19b4d1444352.jpg?52&t=1787607877' },
  { id: 'INI-007', marca: 'FENDER', nombre: 'Precision Bass Standard', precio: 549990, imagen: 'https://dojiw2m9tvv09.cloudfront.net/69504/product/X_01d0f6cb0821e4fe98341c1e7fd6f50d5756d336b27641.jpg?52&t=1787542570' },
  { id: 'INI-008', marca: 'PEARL', nombre: 'Export EXX725S', precio: 899990, imagen: 'https://www.altomusic.com/cdn/shop/files/EXX725SC708_0_1.jpg?v=1692033388&width=1946' },
]

const novedades: ProductoDestacado[] = [
  { id: 'INI-009', marca: 'ROLAND', nombre: 'TD-17KVX', precio: 1299990, imagen: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=600&q=80' },
  { id: 'INI-010', marca: 'ROLAND', nombre: 'FP-30X Piano Digital', precio: 499990, imagen: 'https://kraftmusic.com/cdn/shop/files/ROL-FP30X_Style-Shots-13.jpg?v=1770225759&width=3000' },
  { id: 'INI-011', marca: 'ARTURIA', nombre: 'KeyLab Essential 61', precio: 279990, imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZbvHAwMk1bgceV4GavbsqmsjoLXUAvg7veUZWCZAlUQ&s=10' },
  { id: 'INI-012', marca: 'FENDER', nombre: 'Blues Junior IV', precio: 449990, imagen: 'https://images.unsplash.com/photo-1541689592655-f5f52825a3b8?auto=format&fit=crop&w=600&q=80' },
]

const categorias = [
  { nombre: 'Guitarras', imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPn_3t78XmiThs7jOIoz5zPu1fBIaV1kc5eVw-44Cr7A&s=10' },
  { nombre: 'Bajos', imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQVJindqD9DY6jBfKZBNZ0IdXH-ZbLGN_GxawfSs4G_g&s=10' },
  { nombre: 'Baterías', imagen: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=600&q=80' },
  { nombre: 'Teclados', imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThCyQaJuLJZ6d_Vefu0tXNaws_cnYs0M6QxVP54DA8MA&s=10' },
]

function agregar({ id, nombre, precio, imagen }: ProductoDestacado) {
  const agregado = agregarAlCarrito({ id, nombre, precio, imagen })
  alert(agregado
    ? '¡Producto añadido al carrito con éxito!'
    : 'No se pudo agregar: alcanzaste el stock disponible de este producto.')
}

function Inicio() {
  return (
    <main>
      <ImagenPrincipal />
      <Estadisticas items={estadisticas} />
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
