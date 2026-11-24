import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { guardarSesion } from '../ts/almacenamiento'
import CampoFormulario from '../Molecule/CampoFormulario'
import Entrada from '../Atoms/Entrada'
import Boton from '../Atoms/boton'
import { registrar as registrarUsuario } from '../../servicios/autenticacionServicio'
import { mensajeDeError } from '../../servicios/api'

function FormularioRegistro() {
  const [nombre, setNombre] = useState('')
  const [apellidos, setApellidos] = useState('')
  const [correo, setCorreo] = useState('')
  const [clave, setClave] = useState('')
  const [confirmacion, setConfirmacion] = useState('')
  const [enviando, setEnviando] = useState(false)
  const navegar = useNavigate()

  async function registrar(e: FormEvent) {
    e.preventDefault()
    if (!nombre.trim() || !apellidos.trim() || !correo.trim() || !clave || !confirmacion) {
      alert('Por favor, completa todos los campos obligatorios.')
      return
    }
    if (clave !== confirmacion) {
      alert('Las contraseñas no coinciden.')
      return
    }
    setEnviando(true)
    try {
      const usuario = await registrarUsuario({
        nombre: `${nombre.trim()} ${apellidos.trim()}`,
        correo: correo.trim(),
        password: clave,
      })
      localStorage.setItem('idUsuario', String(usuario.id))
      guardarSesion({ nombre: usuario.nombre, rol: usuario.rol === 'ADMIN' ? 'admin' : 'cliente' })
      alert(`Cuenta creada exitosamente para ${usuario.nombre}`)
      navegar('/mi-perfil')
    } catch (error) {
      alert(mensajeDeError(error, 'No se pudo crear la cuenta.'))
    } finally {
      setEnviando(false)
    }
  }

  const cambiar = (setter: (value: string) => void) => (e: ChangeEvent<HTMLInputElement>) => setter(e.target.value)

  return (
    <form onSubmit={registrar}>
      <CampoFormulario id="Nombre" etiqueta="NOMBRE" requerido>
        <Entrada id="Nombre" required placeholder="Tu nombre" value={nombre} onChange={cambiar(setNombre)} />
      </CampoFormulario>
      <CampoFormulario id="Apellidos" etiqueta="APELLIDOS" requerido>
        <Entrada id="Apellidos" required placeholder="Apellidos" value={apellidos} onChange={cambiar(setApellidos)} />
      </CampoFormulario>
      <CampoFormulario id="CorreoReg" etiqueta="CORREO ELECTRÓNICO" requerido>
        <Entrada id="CorreoReg" required type="email" placeholder="nombre@ejemplo.com" value={correo} onChange={cambiar(setCorreo)} />
      </CampoFormulario>
      <CampoFormulario id="ClaveReg" etiqueta="CONTRASEÑA" requerido>
        <Entrada id="ClaveReg" required type="password" minLength={4} value={clave} onChange={cambiar(setClave)} />
      </CampoFormulario>
      <CampoFormulario id="ClaveConf" etiqueta="CONFIRMAR" requerido>
        <Entrada id="ClaveConf" required type="password" minLength={4} value={confirmacion} onChange={cambiar(setConfirmacion)} />
      </CampoFormulario>
      <Boton type="submit" variante="submit" disabled={enviando}>
        {enviando ? 'CREANDO...' : 'CREAR CUENTA'}
      </Boton>
    </form>
  )
}

export default FormularioRegistro
