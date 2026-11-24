import { http } from "./api";
import type { Producto, ProductoForm } from "./tipos";

export interface FiltrosProducto {
  categoria?: number;
  marca?: number;
  min?: number;
  max?: number;
  q?: string;
  destacado?: boolean;
}

// Arma ?categoria=1&min=1000... solo con los filtros que vengan con valor
export function listarProductos(filtros: FiltrosProducto = {}) {
  const params = new URLSearchParams();
  Object.entries(filtros).forEach(([clave, valor]) => {
    if (valor !== undefined && valor !== "") params.append(clave, String(valor));
  });
  const query = params.toString();
  return http<Producto[]>(`/productos${query ? `?${query}` : ""}`);
}

export const obtenerProducto = (id: number) => http<Producto>(`/productos/${id}`);

export const crearProducto = (p: ProductoForm) =>
  http<Producto>("/productos", { method: "POST", body: JSON.stringify(p) });

export const editarProducto = (id: number, p: ProductoForm) =>
  http<Producto>(`/productos/${id}`, { method: "PUT", body: JSON.stringify(p) });

export const eliminarProducto = (id: number) => http<void>(`/productos/${id}`, { method: "DELETE" });

export const listarCategorias = () => http<{ id: number; nombre: string }[]>("/categorias");
export const listarMarcas = () => http<{ id: number; nombre: string }[]>("/marcas");
