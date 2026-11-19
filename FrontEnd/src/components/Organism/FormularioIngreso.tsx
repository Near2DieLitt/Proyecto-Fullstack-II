import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sesion } from '../ts/datos';
import { guardarSesion } from '../ts/almacenamiento';
import CampoFormulario from '../Molecule/CampoFormulario';
import Boton from '../Atoms/boton';
import Entrada from '../Atoms/Entrada';


const usuariosPermitidos: (Sesion & { correo: string; clave: string })[] = [
  { correo: 'admin@sonidovivo.cl', clave: 'admin123', nombre: 'Administrador', rol: 'admin' },
  { correo: 'juan@cliente.cl', clave: 'cli123', nombre: 'Juan', rol: 'cliente' },
  { correo: 'profe@duoc.cl', clave: 'duoc123', nombre: 'Profesor', rol: 'cliente' },
]

function FormularioIngreso() {
  const [correo, setCorreo] = useState('')
  const [clave, setClave] = useState('')
  const navegar = useNavigate()

  function ingresar(e: FormEvent) {
    e.preventDefault()
    const correoLimpio = correo.trim().toLowerCase()
    const claveLimpia = clave.trim()

    if (correoLimpio === '' || claveLimpia === '') {
      alert('Debe completar todos los campos')
      return
    }

    const usuario = usuariosPermitidos.find((u) => u.correo === correoLimpio && u.clave === claveLimpia)
    if (!usuario) {
      alert('Correo o contraseña incorrectos.')
      return
    }

    guardarSesion({ nombre: usuario.nombre, rol: usuario.rol })
    navegar(usuario.rol === 'admin' ? '/admin-productos' : '/mi-perfil')
  }

  return (
    <form onSubmit={ingresar} >
      <CampoFormulario id="Correo" etiqueta="CORREO ELECTRÓNICO" requerido>
        <Entrada id="Correo" type="email" placeholder="nombre@ejemplo.com" value={correo} onChange={(e) => setCorreo(e.target.value)} />
      </CampoFormulario>
      <CampoFormulario id="Clave" etiqueta="CONTRASEÑA" requerido>
        <Entrada id="Clave" type="password" placeholder="4 a 10 caracteres" maxLength={10} value={clave} onChange={(e) => setClave(e.target.value)} />
      </CampoFormulario>
      <Boton type="submit" variante="submit">
        INGRESAR
      </Boton>
    </form>
  )
}export default FormularioIngreso
