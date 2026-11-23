import { useState } from 'react'
import type { FormEvent } from 'react'
import Boton from '../Atoms/boton'
import AreaTexto from '../Atoms/AreaTexto'
import Entrada from '../Atoms/Entrada'
import CampoFormulario from '../Molecule/CampoFormulario'
import { enviarContacto } from '../../service/contactoServicio'
import { mensajeDeError } from '../../service/api'

const vacio = { nombre: '', correo: '', mensaje: '' }

function FormularioContacto() {
  const [form, setForm] = useState(vacio)
  const [enviando, setEnviando] = useState(false)

  async function enviar(e: FormEvent) {
    e.preventDefault()

    if (form.nombre.trim() === '' || form.correo.trim() === '' || form.mensaje.trim() === '') {
      alert('Por favor, completa todos los campos obligatorios (*).')
      return
    }

    setEnviando(true)
    try {
      await enviarContacto({
        nombreCompleto: form.nombre.trim(),
        correo: form.correo.trim(),
        mensaje: form.mensaje.trim(),
      })
      alert(`¡Gracias por escribirnos, ${form.nombre.trim()}! Hemos recibido tu mensaje y te responderemos pronto al correo ${form.correo.trim()}.`)
      setForm(vacio)
    } catch (error) {
      alert(`No se pudo enviar el mensaje: ${mensajeDeError(error, 'verifica que el backend esté iniciado e inténtalo nuevamente.')}`)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <form onSubmit={enviar}>
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
          minLength={10}
          maxLength={500}
          rows={5}
          style={{ resize: 'vertical' }}
          value={form.mensaje}
          onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
        />
      </CampoFormulario>

      <Boton type="submit" variante="submit" className="mt-2" disabled={enviando}>
        {enviando ? 'ENVIANDO...' : 'ENVIAR MENSAJE'}
      </Boton>
    </form>
  )
}

export default FormularioContacto