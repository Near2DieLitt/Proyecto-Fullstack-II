import DatoContacto from '../components/Molecule/DatoContacto'
import TarjetaInfo from '../components/Molecule/TarjetaInfo'

const mapa =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3345.18731308365!2d-71.55403062335198!3d-33.00412357356985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9689ddf3e09210e7%3A0xcdafae0b8e7330db!2sAv.%20Libertad%201234%2C%20Vi%C3%B1a%20del%20Mar%2C%20Valpara%C3%ADso!5e0!3m2!1ses-419!2scl!4v1693593000000!5m2!1ses-419!2scl'

const comoLlegar = [
  { icono: '🚌', texto: 'Micro línea 602 o 609 - bajada Av. Libertad' },
  { icono: '🚇', texto: 'Metro Viña (Línea 3) - estación Libertad' },
  { icono: '🚗', texto: 'Estacionamiento en Av. Valparaíso' },
]

function NuestraTienda() {
  return (
    <main className="store-wrapper">
      <div className="store-header">
        <h1 className="logo">Nuestra Tienda</h1>
        <p className="subtitle fs-7">Visítanos en Viña del Mar, Región de Valparaíso</p>
      </div>

      <div className="store-grid">
        <div className="store-map-col">
          <div className="map-container">
            <iframe title="Mapa de la tienda" src={mapa} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
          <p className="map-caption">Mapa interactivo - Av. Libertad 1234, Viña del Mar</p>
        </div>

        <div className="store-info-col">
          <TarjetaInfo titulo="Información de la tienda">
            <DatoContacto icono="📍" titulo="Dirección" copiable>
              Av. Libertad 1234
              <br />
              Viña del Mar, Región de Valparaíso
            </DatoContacto>
            <DatoContacto icono="🕒" titulo="Horario de atención" copiable>
              Lunes a Sábado
              <br />
              10:00 - 19:00 hrs
            </DatoContacto>
            <DatoContacto icono="📞" titulo="Teléfono" copiable>
              +56 9 1234 5678
            </DatoContacto>
            <DatoContacto icono="✉️" titulo="Correo electrónico" copiable>
              contacto@sonidovivo.cl
            </DatoContacto>
            <DatoContacto icono="📱" titulo="WhatsApp / Instagram" copiable>
              @sonidovivo
            </DatoContacto>
          </TarjetaInfo>

          <TarjetaInfo titulo="Puntos de retiro">
            <div className="info-item">
              <span className="status-dot green"></span>
              <div className="info-text">
                <p className="fw-bold">Tienda principal</p>
                <p className="fs-small">Av. Libertad 1234, Viña del Mar</p>
              </div>
            </div>
            <div className="info-item">
              <span className="status-dot gray"></span>
              <div className="info-text">
                <p className="fw-bold">Sucursal Valparaíso</p>
                <p className="fs-small">
                  Av. Brasil 456, Valparaíso
                  <br />
                  <em>Próximamente</em>
                </p>
              </div>
            </div>
          </TarjetaInfo>

          <TarjetaInfo titulo="¿Cómo llegar?" apagada>
            {comoLlegar.map((c) => (
              <div className="info-item compact" key={c.icono}>
                <span className="info-icon">{c.icono}</span>
                <p>{c.texto}</p>
              </div>
            ))}
          </TarjetaInfo>
        </div>
      </div>
    </main>
  )
}

export default NuestraTienda