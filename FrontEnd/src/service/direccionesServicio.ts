import { http } from "./api";
import type { Direccion } from "./tipos";

export const listarRegiones = () => http<{ id: number; nombre: string }[]>("/regiones");
export const listarComunas = (idRegion: number) =>
  http<{ id: number; nombre: string }[]>(`/regiones/${idRegion}/comunas`);

export const direccionesDeUsuario = (idUsuario: number) =>
  http<Direccion[]>(`/direcciones/usuario/${idUsuario}`);

export const crearDireccion = (d: {
  idUsuario: number; calle: string; numero: string; depto?: string; referencia?: string;
  idComuna: number; principal?: boolean;
}) => http<Direccion>("/direcciones", { method: "POST", body: JSON.stringify(d) });

export const eliminarDireccion = (id: number) => http<void>(`/direcciones/${id}`, { method: "DELETE" });
