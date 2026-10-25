import Boton from "../Atoms/Boton";


function ImagenPrincipal() {
  return (
    <section className="hero position-relative vh-100 d-flex justify-content-center align-items-center text-center text-white">
      <div className="position-relative z-1 px-3 max-w-content">
        <p className="subtitle mb-4">VIÑA DEL MAR - EST. 2013</p>
        <h1 className="display-3 playfair-font mb-4">
          Tu música
          <br />
          empieza
          <br />
          <em className="font-light italic">aquí.</em>
        </h1>
        <p className="lead fs-6 mb-5 px-md-5">
          Más de 340 referencias en instrumentos, equipos y accesorios. Atención personalizada para músicos de todos los niveles.
        </p>
        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <Boton a="/catalogo" variante="dark" className="rounded-0 px-4 py-3 fw-bold fs-7">
            VER CATÁLOGO
          </Boton>
          <Boton a="/nuestra-tienda" variante="outline-light" className="rouded-0 px-4 py-3 fw-bold fs-7">
            VISÍTANOS
          </Boton>
        </div>
      </div>
    </section>
  )
} export default ImagenPrincipal
