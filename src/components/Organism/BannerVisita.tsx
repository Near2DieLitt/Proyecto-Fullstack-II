import Boton from "../Atoms/Boton";


function BannerVisita() {
  return (
    <section className="container-fluid py-5 bg-secondary-custom text-center text-white">
      <div className="py-5">
        <p className="subtitle mb-3">VISÍTANOS</p>
        <h2 className="playfair-font display-4 fw-bold mb-4">Estamos en Viña del Mar</h2>
        <Boton a="/nuestra-tienda" variante="light" className="rounded-0 px-4 py-3 fw-bold fs-7 text-dark">
          VER EN EL MAPA
        </Boton>
      </div>
    </section>
  )
} export default BannerVisita
