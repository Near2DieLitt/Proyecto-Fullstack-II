import { useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { cerrarSesion, obtenerSesion } from '../../almacenamiento'
import Logo from '../Atoms/Logo'
import Icono from '../Atoms/Icono'


const enlaces = [
  { texto: 'INICIO', a: '/' },
  { texto: 'CATÁLOGO', a: '/catalogo' },
  { texto: 'NOVEDADES', a: '/novedades' },
  { texto: 'SOBRE NOSOTROS', a: '/sobre-nosotros' },
  { texto: 'CONTACTO', a: '/contacto' },
  { texto: 'MI PERFIL', a: '/inicio-sesion' },
]

function Encabezado() {
  const [abierto, setAbierto] = useState(false)
  const navegar = useNavigate()
  useLocation() // vuelve a leer la sesión cada vez que cambia la ruta
  const sesion = obtenerSesion()

  function salir() {
    cerrarSesion()
    setAbierto(false)
    navegar('/inicio-sesion')
  }

  return (
    <header className="sticky-top bg-white z-3 border-bottom">
      <div className="top-banner text-white text-center py-2">
        🚚 Despacho a todo Chile · Retiro gratis en Viña del Mar · Lunes a Sábado 10:00 - 19:00 hrs
      </div>
      <nav className="navbar navbar-expand-lg py-3 px-4 px-lg-5">
        <Link className="navbar-brand logo text-dark" to="/">
          <Logo />
        </Link>
        <button
          className="navbar-toggler border-0"
          type="button"
          aria-label="Abrir menú"
          aria-expanded={abierto}
          onClick={() => setAbierto(!abierto)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse justify-content-center ${abierto ? 'show' : ''}`}>
          <ul className="navbar-nav gap-lg-4">
            {enlaces.map((e) => (
              <li className="nav-item" key={e.a}>
                <NavLink to={e.a} end className="nav-link custom-nav-link" onClick={() => setAbierto(false)}>
                  {e.texto}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="d-none d-lg-flex gap-4 align-items-center">
          {!sesion && (
            <Link to="/inicio-sesion" className="custom-nav-link text-decoration-none">
              <Icono nombre="user" className="me-1" /> INGRESAR
            </Link>
          )}
          {sesion?.rol === 'admin' && (
            <Link to="/admin-productos" className="custom-nav-link text-decoration-none">
              <Icono nombre="user-shield" className="me-1" /> PANEL ADMIN
            </Link>
          )}
          {sesion?.rol === 'cliente' && (
            <Link to="/mi-perfil" className="custom-nav-link text-decoration-none">
              <Icono nombre="user" className="me-1" /> HOLA, {sesion.nombre.toUpperCase()}
            </Link>
          )}
          {sesion && (
            <button className="btn btn-link custom-nav-link text-decoration-none text-danger fw-bold p-0" onClick={salir}>
              <Icono nombre="right-from-bracket" className="me-1" /> SALIR
            </button>
          )}
          <Link to="/carrito" className="custom-nav-link text-decoration-none">
            <Icono nombre="cart-shopping" className="me-1" /> CARRITO
          </Link>
        </div>
      </nav>
    </header>
  )
} export default Encabezado

