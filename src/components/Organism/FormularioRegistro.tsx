import { useState } from 'react'

import type { ChangeEvent, FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { guardarSesion } from "../ts/almacenamiento"
import CampoFormulario from "../Molecule/CampoFormulario"
import Entrada from "../Atoms/Entrada"
import Selector from "../Atoms/Selector"
import Boton from "../Atoms/boton"

const regiones = [
  { valor: 'Arica y Parinacota', texto: 'Arica y Parinacota' },
  { valor: 'Tarapacá', texto: 'Tarapacá' },
  { valor: 'Antofagasta', texto: 'Antofagasta' },
  { valor: 'Atacama', texto: 'Atacama' },
  { valor: 'Coquimbo', texto: 'Coquimbo' },
  { valor: 'Valparaíso', texto: 'Valparaíso' },
  { valor: 'Metropolitana', texto: 'Metropolitana de Santiago' },
  { valor: "O'Higgins", texto: "Libertador General Bernardo O'Higgins" },
  { valor: 'Maule', texto: 'Maule' },
  { valor: 'Ñuble', texto: 'Ñuble' },
  { valor: 'Biobío', texto: 'Biobío' },
  { valor: 'La Araucanía', texto: 'La Araucanía' },
  { valor: 'Los Ríos', texto: 'Los Ríos' },
  { valor: 'Los Lagos', texto: 'Los Lagos' },
  { valor: 'Aysén', texto: 'Aysén del General Carlos Ibáñez del Campo' },
  { valor: 'Magallanes', texto: 'Magallanes y de la Antártica Chilena' },
]

const comunas = [
  { valor: 'vina', texto: 'Viña del Mar' },
  { valor: 'santiago', texto: 'Santiago' },
]

const tiposUsuario = [
  { valor: 'cliente', texto: 'Cliente' },
  { valor: 'vendedor', texto: 'Vendedor' },
]

const inicial = {
  run: '',
  nombre: '',
  apellidos: '',
  correo: '',
  clave: '',
  claveConf: '',
  fechaNac: '',
  tipo: '',
  region: '',
  comuna: '',
  direccion: '',
}

type Campo = keyof typeof inicial

function FormularioRegistro() {
  const [form, setForm] = useState(inicial)
  const navegar = useNavigate()

  const cambiar = (campo: Campo) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [campo]: e.target.value })

  function registrar(e: FormEvent) {
    e.preventDefault()

    if (
      !form.run.trim() ||
      !form.nombre.trim() ||
      !form.apellidos.trim() ||
      !form.correo.trim() ||
      !form.clave.trim() ||
      !form.claveConf.trim() ||
      !form.tipo ||
      !form.region ||
      !form.comuna ||
      !form.direccion.trim()
    ) {
      alert('Por favor, completa todos los campos obligatorios (*).')
      return
    }
    if (form.clave !== form.claveConf) {
      alert('Las contraseñas no coinciden.')
      return
    }

    guardarSesion({ nombre: form.nombre, rol: 'cliente' })
    alert(`¡Cuenta creada exitosamente para ${form.nombre}!`)
    navegar('/mi-perfil')
  }

  return (
    <form onSubmit={registrar}>
      <CampoFormulario id="Run" etiqueta="RUN" requerido>
        <Entrada id="Run" required placeholder="Sin puntos ni guion, ej: 12345678K" value={form.run} onChange={cambiar('run')} />
      </CampoFormulario>

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
          <Entrada id="ClaveReg" required type="password" placeholder="4 a 10 caracteres" minLength={4} maxLength={10} value={form.clave} onChange={cambiar('clave')} />
        </CampoFormulario>
        <CampoFormulario id="ClaveConf" etiqueta="CONFIRMAR" requerido>
          <Entrada id="ClaveConf" required type="password" placeholder="Repite" minLength={4} maxLength={10} value={form.claveConf} onChange={cambiar('claveConf')} />
        </CampoFormulario>
      </div>

      <div className="fila-doble">
        <CampoFormulario id="FechaNac" etiqueta="FECHA DE NACIMIENTO">
          <Entrada id="FechaNac" type="date" value={form.fechaNac} onChange={cambiar('fechaNac')} />
        </CampoFormulario>
        <CampoFormulario id="TipoUsuario" etiqueta="TIPO DE USUARIO" requerido>
          <Selector id="TipoUsuario" required placeholder="Seleccionar..." opciones={tiposUsuario} value={form.tipo} onChange={cambiar('tipo')} />
        </CampoFormulario>
      </div>

      <div className="fila-doble">
        <CampoFormulario id="Region" etiqueta="REGIÓN" requerido>
          <Selector id="Region" required placeholder="Seleccionar región..." opciones={regiones} value={form.region} onChange={cambiar('region')} />
        </CampoFormulario>
        <CampoFormulario id="Comuna" etiqueta="COMUNA" requerido>
          <Selector id="Comuna" required placeholder="Seleccionar comuna..." opciones={comunas} value={form.comuna} onChange={cambiar('comuna')} />
        </CampoFormulario>
      </div>

      <CampoFormulario id="Direccion" etiqueta="DIRECCIÓN" requerido contador={{ actual: form.direccion.length, max: 300 }}>
        <Entrada id="Direccion" required placeholder="Calle, número, depto." maxLength={300} value={form.direccion} onChange={cambiar('direccion')} />
      </CampoFormulario>

      <Boton type="submit" variante="submit">
        CREAR CUENTA
      </Boton>
    </form>
  )
}

export default FormularioRegistro