import Boton from "../components/Atoms/boton"
import BannerImagen from "../components/Organism/BannerImagen"
import Estadisticas from "../components/Organism/Estadisticas"

const estadisticas = [
  { valor: '1998', etiqueta: 'AÑO FUNDACIÓN' },
  { valor: '340 +', etiqueta: 'PRODUCTOS EN STOCK' },
  { valor: '15 +', etiqueta: 'MARCAS OFICIALES' },
  { valor: '5.000 +', etiqueta: 'CLIENTES SATISFECHOS' },
]

function SobreNosotros() {
  return (
    <main>
      <BannerImagen
        esPagina
        etiqueta="VIÑA DEL MAR - EST. 2013"
        titulo={
          <>
            Sobre
            <br />
            Sonido Vivo
          </>
        }
        texto="Nacimos en 1998 con veinte guitarras y un taller de luthería. Hoy somos la tienda de instrumentos más antigua de la Quinta Región. Desde eléctricas a acústicas. Fender, Gibson, Yamaha, y las mejores marcas del mundo — atendidas por músicos de verdad."
        imagen="https://images.unsplash.com/photo-1725152471889-6c59a52e7794?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080"
        alt="Guitarras Banner"
      >
        <Boton a="/catalogo" variante="dark" className="rounded-0 px-4 py-3 fw-bold fs-7">
          VER CATÁLOGO
        </Boton>
        <Boton a="/nuestra-tienda" variante="outline-dark" className="rounded-0 px-4 py-3 fw-bold fs-7">
          VISÍTANOS
        </Boton>
      </BannerImagen>
      <Estadisticas items={estadisticas} />
    </main>
  )
} export default SobreNosotros
