import { useEffect, useState } from "react";
import { listarContactos } from "../service/contactoServicio";
import type { Contacto } from "../service/tipos";

function ListadoContactos() {
  const [contactos, setContactos] = useState<Contacto[]>([]);

  useEffect(() => {
    listarContactos()
      .then(setContactos)
      .catch(() => alert("No se pudieron cargar los contactos"));
  }, []);

  return (
    <div className="container mt-5">
      <h2>Contactos recibidos</h2>
      {contactos.map((contacto) => (
        <div className="card p-3 mb-3" key={contacto.id}>
          <h5>
            {contacto.nombreCompleto}{" "}
            <span className="badge bg-secondary">{contacto.estado}</span>
          </h5>
          <p>{contacto.correo}</p>
          <p>{contacto.mensaje}</p>
        </div>
      ))}
    </div>
  );
}

export default ListadoContactos;