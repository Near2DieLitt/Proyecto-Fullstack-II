import { http } from "./api";
import type { Contacto } from "./tipos";

export const enviarContacto = (c: { nombreCompleto: string; correo: string; mensaje: string }) =>
  http<Contacto>("/contactos", { method: "POST", body: JSON.stringify(c) });

export const listarContactos = (estado?: string) =>
  http<Contacto[]>(`/contactos${estado ? `?estado=${estado}` : ""}`);

export const cambiarEstadoContacto = (id: number, estado: "PENDIENTE" | "LEIDO" | "RESPONDIDO") =>
  http<Contacto>(`/contactos/${id}/estado`, { method: "PUT", body: JSON.stringify({ estado }) });

export const responderContacto = (id: number, respuesta: string) =>
  http<Contacto>(`/contactos/${id}/respuesta`, { method: "PUT", body: JSON.stringify({ respuesta }) });
