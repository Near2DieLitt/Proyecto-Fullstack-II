import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sesion } from '../ts/datos';
import { guardarSesion } from '../ts/almacenamiento';
import CampoFormulario from '../Molecule/CampoFormulario';
import Boton from '../Atoms/boton';
import Entrada from '../Atoms/Entrada';
import { iniciarSesion } from '../../service/autenticacionServicio';
import { mensajeDeError } from '../../service/api';


function FormularioIngreso() {
  const [correo, setCorreo] = useState('')
  const [clave, setClave] = useState('')
  const navegar = useNavigate()

  async function ingresar(e: FormEvent) {
    e.preventDefault()
    const correoLimpio = correo.trim().toLowerCase()
    const claveLimpia = clave

    if (correoLimpio === '' || claveLimpia === '') {
      alert('Debe completar todos los campos')
      return
    }

    try {
      const usuario = await iniciarSesion(correoLimpio, claveLimpia)
      const rol = usuario.rol === 'ADMIN' ? 'admin' : 'cliente'
      guardarSesion({ id: usuario.id, nombre: usuario.nombre, rol })
      navegar(rol === 'admin' ? '/admin-productos' : '/mi-perfil')
    } catch (error) {
      alert(mensajeDeError(error, 'No se pudo iniciar sesión. Verifica que el backend esté iniciado.'))
    }
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
