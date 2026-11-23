import { useState } from 'react'

import type { ChangeEvent, FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { guardarSesion } from "../ts/almacenamiento"
import CampoFormulario from "../Molecule/CampoFormulario"
import Entrada from "../Atoms/Entrada"
import Boton from "../Atoms/boton"
import { registrar as registrarUsuario } from "../../service/autenticacionServicio"
import { mensajeDeError } from "../../service/api"

const inicial = {
  nombre: '',
  apellidos: '',
  correo: '',
  clave: '',
  claveConf: '',
}

type Campo = keyof typeof inicial

function FormularioRegistro() {
  const [form, setForm] = useState(inicial)
  const navegar = useNavigate()

  const cambiar = (campo: Campo) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [campo]: e.target.value })

  async function registrar(e: FormEvent) {
    e.preventDefault()

    if (
      !form.nombre.trim() ||
      !form.apellidos.trim() ||
      !form.correo.trim() ||
      !form.clave.trim() ||
      !form.claveConf.trim()
    ) {
      alert('Por favor, completa todos los campos obligatorios (*).')
      return
    }
    if (form.clave !== form.claveConf) {
      alert('Las contraseñas no coinciden.')
      return
    }
    const nombreCompleto = `${form.nombre.trim()} ${form.apellidos.trim()}`
    if (nombreCompleto.length > 100) {
      alert('El nombre y los apellidos no pueden superar 100 caracteres en total.')
      return
    }

    try {
      const usuario = await registrarUsuario({
        nombre: nombreCompleto,
        correo: form.correo.trim(),
        password: form.clave,
      })
      guardarSesion({
        id: usuario.id,
        nombre: usuario.nombre,
        rol: usuario.rol === 'ADMIN' ? 'admin' : 'cliente',
      })
      alert(`¡Cuenta creada exitosamente para ${usuario.nombre}!`)
      navegar('/mi-perfil')
    } catch (error) {
      alert(mensajeDeError(error, 'No se pudo crear la cuenta. Verifica que el backend esté iniciado.'))
    }
  }

  return (
    <form onSubmit={registrar}>
      <div className="fila-doble">
        <CampoFormulario id="Nombre" etiqueta="NOMBRE" requerido contador={{ actual: form.nombre.length, max: 50 }}>
          <Entrada id="Nombre" required placeholder="Tu nombre" maxLength={50} value={form.nombre} onChange={cambiar('nombre')} />
        </CampoFormulario>
        <CampoFormulario id="Apellidos" etiqueta="APELLIDOS" requerido contador={{ actual: form.apellidos.length, max: 100 }}>
          <Entrada id="Apellidos" required placeholder="Apellidos" maxLength={100} value={form.apellidos} onChange={cambiar('apellidos')} />
        </CampoFormulario>
      </div>

      <CampoFormulario id="CorreoReg" etiqueta="CORREO ELECTRÓNICO" requerido>
        <Entrada id="CorreoReg" required type="email" placeholder="nombre@ejemplo.com" value={form.correo} onChange={cambiar('correo')} />
      </CampoFormulario>

      <div className="fila-doble">
        <CampoFormulario id="ClaveReg" etiqueta="CONTRASEÑA" requerido>
          <Entrada id="ClaveReg" required type="password" placeholder="6 a 10 caracteres" minLength={6} maxLength={10} value={form.clave} onChange={cambiar('clave')} />
        </CampoFormulario>
        <CampoFormulario id="ClaveConf" etiqueta="CONFIRMAR" requerido>
          <Entrada id="ClaveConf" required type="password" placeholder="Repite" minLength={6} maxLength={10} value={form.claveConf} onChange={cambiar('claveConf')} />
        </CampoFormulario>
      </div>

      <Boton type="submit" variante="submit">
        CREAR CUENTA
      </Boton>
    </form>
  )
}

export default FormularioRegistro