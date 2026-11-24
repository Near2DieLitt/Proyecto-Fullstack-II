import { useState } from "react";
import CampoFormulario from "../Molecule/CampoFormulario";
import type { SubmitEvent } from "react";
import { enviarContacto } from "../../servicios/contactoServicio";
import { mensajeDeError } from "../../servicios/api";

function FormularioContacto() {

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [enviando, setEnviando] = useState(false);


  const manejarEnvio = async (e: SubmitEvent<HTMLFormElement>) => {
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
        tipo="text"
        nombre="nombre"
        valor={nombre}
        alCambiar={setNombre}
      />
      <CampoFormulario
        etiqueta="Correo electrónico"
        tipo="email"
        nombre="correo"
        valor={correo}
        alCambiar={setCorreo}
      />
      <CampoFormulario
        etiqueta="Mensaje"
        tipo="text"
        nombre="mensaje"
        valor={mensaje}
        alCambiar={setMensaje}
      />

      <button
        type="submit"
        className="btn btn-primary"
        disabled={enviando}
      >
        {enviando ? "Enviando..." : "Enviar mensaje"}
      </button>
    </form>
  );
}

export default FormularioContacto;
