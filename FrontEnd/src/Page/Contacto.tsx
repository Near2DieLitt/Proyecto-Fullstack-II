import DatoContacto from '../components/Molecule/DatoContacto'
import FormularioContacto from '../components/Organism/FormularioContacto'

export default function Contacto() {
  return (
    <main className="blog-container" style={{ marginBottom: 100 }}>
      <div className="blog-header">
        <span className="blog-kicker">ESCRÍBENOS</span>
        <h1 className="blog-main-title">Contacto</h1>
      </div>

      <hr className="blog-divider" />

      <div className="row mt-5">
        <div className="col-lg-5 mb-5 mb-lg-0 pe-lg-5">
          <h2 className="featured-title mb-5" style={{ fontSize: '2.2rem' }}>
            Visítanos o escríbenos
          </h2>

          <DatoContacto titulo="DIRECCIÓN" clase="mb-4">
            Av. Libertad 1234, Viña del Mar
            <br />V Región de Valparaíso, Chile
          </DatoContacto>
          <DatoContacto titulo="HORARIO" clase="mb-4">
            Lunes a Viernes: 10:00 – 19:00
            <br />
            Sábado: 10:00 – 14:00
          </DatoContacto>
          <DatoContacto titulo="TELÉFONO" clase="mb-4">
            +56 9 1234 5678
          </DatoContacto>
          <DatoContacto titulo="CORREO" clase="mb-4">
            contacto@sonidovivo.cl
          </DatoContacto>
        </div>

        <div className="col-lg-7">
          <FormularioContacto />
        </div>
      </div>
    </main>
  )
}
