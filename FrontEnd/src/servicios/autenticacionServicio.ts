import { http } from "./api";
import type { Usuario } from "./tipos";

export const registrar = (datos: { nombre: string; correo: string; password: string; telefono?: string }) =>
  http<Usuario>("/auth/registro", { method: "POST", body: JSON.stringify(datos) });

// Devuelve el usuario (id, nombre, rol). 401 si el correo o la contraseña no coinciden.
export const iniciarSesion = (correo: string, password: string) =>
  http<Usuario>("/auth/login", { method: "POST", body: JSON.stringify({ correo, password }) });

export const obtenerUsuario = (id: number) => http<Usuario>(`/usuarios/${id}`);

export const editarPerfil = (id: number, datos: { nombre: string; telefono?: string }) =>
  http<Usuario>(`/usuarios/${id}`, { method: "PUT", body: JSON.stringify(datos) });
