import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { guardarSesion } from '../ts/almacenamiento'
import CampoFormulario from '../Molecule/CampoFormulario'
import Boton from '../Atoms/boton'
import Entrada from '../Atoms/Entrada'
import { iniciarSesion } from '../../servicios/autenticacionServicio'
import { mensajeDeError } from '../../servicios/api'

function FormularioIngreso() {
  const [correo, setCorreo] = useState('')
  const [clave, setClave] = useState('')
  const [enviando, setEnviando] = useState(false)
  const navegar = useNavigate()

  async function ingresar(e: FormEvent) {
    e.preventDefault()
    const correoLimpio = correo.trim().toLowerCase()
    const claveLimpia = clave.trim()
    if (!correoLimpio || !claveLimpia) {
      alert('Debe completar todos los campos')
      return
    }

    setEnviando(true)
    try {
      const usuario = await iniciarSesion(correoLimpio, claveLimpia)
      localStorage.setItem('idUsuario', String(usuario.id))
      guardarSesion({ nombre: usuario.nombre, rol: usuario.rol === 'ADMIN' ? 'admin' : 'cliente' })
      navegar(usuario.rol === 'ADMIN' ? '/admin-productos' : '/mi-perfil')
    } catch (error) {
      alert(mensajeDeError(error, 'Correo o contraseña incorrectos.'))
    } finally {
      setEnviando(false)
    }
  }

  return (
    <form onSubmit={ingresar}>
      <CampoFormulario id="Correo" etiqueta="CORREO ELECTRÓNICO" requerido>
        <Entrada id="Correo" type="email" placeholder="nombre@ejemplo.com" value={correo}
          onChange={(e) => setCorreo(e.target.value)} />
      </CampoFormulario>
      <CampoFormulario id="Clave" etiqueta="CONTRASEÑA" requerido>
        <Entrada id="Clave" type="password" placeholder="4 a 10 caracteres" maxLength={10} value={clave}
          onChange={(e) => setClave(e.target.value)} />
      </CampoFormulario>
      <Boton type="submit" variante="submit" disabled={enviando}>
        {enviando ? 'INGRESANDO...' : 'INGRESAR'}
      </Boton>
    </form>
  )
}

export default FormularioIngreso
