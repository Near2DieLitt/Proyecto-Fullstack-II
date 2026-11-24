import { useState } from "react";
import CampoFormulario from "../Molecule/CampoFormulario";
import type { FormEvent } from "react";
import { enviarContacto } from "../../servicios/contactoServicio";
import { mensajeDeError } from "../../servicios/api";

function FormularioContacto() {

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [enviando, setEnviando] = useState(false);


  const manejarEnvio = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 

    if (enviando) return;

    if (nombre.trim() === "") {
      alert("Debe ingresar su nombre");
      return;
    }
    if (correo.trim() === "") {
      alert("Debe ingresar su correo");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      alert("Ingrese un correo válido");
      return;
    }
    if (mensaje.trim() === "") {
      alert("Debe ingresar un mensaje");
      return;
    }


    setEnviando(true);

    try {

      await enviarContacto({
        nombreCompleto: nombre.trim(),
        correo: correo.trim(),
        mensaje: mensaje.trim(),
      });

      alert("Mensaje guardado correctamente");


      setNombre("");
      setCorreo("");
      setMensaje("");
    } catch (error) {
      console.error("Error al enviar el contacto:", error);

      alert(mensajeDeError(error, "No se pudo enviar el mensaje. Intente nuevamente."));
    } finally {

      setEnviando(false);
    }
  };

  return (
    <form onSubmit={manejarEnvio}>
      <CampoFormulario
        etiqueta="Nombre completo"
        id="nombre-contacto"
        requerido
      >
        <input
          id="nombre-contacto"
          type="text"
          placeholder="Tu nombre completo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </CampoFormulario>
      <CampoFormulario
        etiqueta="Correo electrónico"
        id="correo-contacto"
        requerido
      >
        <input
          id="correo-contacto"
          type="email"
          placeholder="nombre@ejemplo.com"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
      </CampoFormulario>
      <CampoFormulario
        etiqueta="Mensaje"
        id="mensaje-contacto"
        requerido
      >
        <textarea
          id="mensaje-contacto"
          placeholder="¿En qué podemos ayudarte?"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
        />
      </CampoFormulario>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={enviando}
      >
        {enviando ? "ENVIANDO..." : "ENVIAR MENSAJE"}
      </button>
    </form>
  );
}

export default FormularioContacto;
