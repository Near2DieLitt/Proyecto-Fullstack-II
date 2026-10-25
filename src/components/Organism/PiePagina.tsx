import { Link } from 'react-router-dom'
import Logo from '../Atoms/Logo'


function PiePagina() {
  return (
    <footer className="bg-dark text-white py-5 px-4 px-lg-5">
      <div className="container py-4">
        <div className="row g-4 justify-content-between">
          <div className="col-12 col-md-4">
            <h3 className="logo mb-3">
              <Logo />
            </h3>
            <p className="text-secondary fs-7">
              Tu tienda de instrumentos musicales en Viña del Mar. Desde 2013 sirviendo a músicos de todo Chile.
            </p>
          </div>
          <div className="col-12 col-md-3">
            <h6 className="fw-bold mb-3 fs-8 text-uppercase">Navegación</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 fs-7 text-secondary">
              <li>
                <Link to="/catalogo" className="text-decoration-none text-secondary">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link to="/nuestra-tienda" className="text-decoration-none text-secondary">
                  Mapa y contacto
                </Link>
              </li>
              <li>
                <Link to="/mi-perfil" className="text-decoration-none text-secondary">
                  Mis pedidos
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-12 col-md-4">
            <h6 className="fw-bold mb-3 fs-8 text-uppercase">Contacto</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 fs-7 text-secondary">
              <li>Av. Libertad 1234, Viña del Mar</li>
              <li>+56 9 1234 5678</li>
              <li>contacto@sonidovivo.cl</li>
              <li>Lun – Sáb, 10:00 – 19:00</li>
            </ul>
          </div>
        </div>
        <hr className="border-secondary my-4" />
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center text-secondary fs-8">
          <p className="mb-0">© 2024 Sonido Vivo. Todos los derechos reservados.</p>
          <p className="mb-0">RUT : 76.123.456-7</p>
        </div>
      </div>
    </footer>
  )
} export default PiePagina
