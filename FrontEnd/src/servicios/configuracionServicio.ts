import { http } from "./api";

export interface Parametro { clave: string; valor: string; descripcion?: string }

export const listarParametros = () => http<Parametro[]>("/configuracion");
export const obtenerParametro = (clave: string) => http<Parametro>(`/configuracion/${clave}`);
export const actualizarParametro = (clave: string, valor: string) =>
  http<Parametro>(`/configuracion/${clave}`, { method: "PUT", body: JSON.stringify({ valor }) });
