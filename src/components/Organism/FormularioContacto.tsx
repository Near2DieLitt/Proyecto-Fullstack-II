import { useState } from 'react'
import type { FormEvent } from 'react'
import Boton from '../Atoms/boton'
import AreaTexto from '../Atoms/AreaTexto'
import Entrada from '../Atoms/Entrada'
import CampoFormulario from '../Molecule/CampoFormulario'

const vacio = { nombre: '', correo: '', mensaje: '' }

function FormularioContacto() {
  const [form, setForm] = useState(vacio)

  function enviar(e: FormEvent) {
    e.preventDefault()

    if (form.nombre.trim() === '' || form.correo.trim() === '' || form.mensaje.trim() === '') {
      alert('Por favor, completa todos los campos obligatorios (*).')
      return
    }

    alert(`¡Gracias por escribirnos, ${form.nombre}! Hemos recibido tu mensaje y te responderemos pronto al correo ${form.correo}.`)
    setForm(vacio)
  }

  return (
    <form onSubmit={enviar} noValidate>
      <CampoFormulario id="NombreContacto" etiqueta="NOMBRE" requerido contador={{ actual: form.nombre.length, max: 100 }}>
        <Entrada
          id="NombreContacto"
          placeholder="Tu nombre completo"
          maxLength={100}
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
        />
      </CampoFormulario>

      <CampoFormulario id="CorreoContacto" etiqueta="CORREO ELECTRÓNICO" requerido>
        <Entrada
          id="CorreoContacto"
          type="email"
          placeholder="nombre@ejemplo.com"
          value={form.correo}
          onChange={(e) => setForm({ ...form, correo: e.target.value })}
        />
      </CampoFormulario>

      <CampoFormulario id="MensajeContacto" etiqueta="MENSAJE" requerido contador={{ actual: form.mensaje.length, max: 500 }}>
        <AreaTexto
          id="MensajeContacto"
          placeholder="¿En qué podemos ayudarte?"
          maxLength={500}
          rows={5}
          style={{ resize: 'vertical' }}
          value={form.mensaje}
          onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
        />
      </CampoFormulario>

      <Boton type="submit" variante="submit" className="mt-2">
        ENVIAR MENSAJE
      </Boton>
    </form>
  )
}

export default FormularioContacto