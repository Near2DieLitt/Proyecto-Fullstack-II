import { http } from "./api";

export const stockDeProducto = (idProducto: number) =>
  http<{ idProducto: number; stockTotal: number }>(`/inventario/producto/${idProducto}`);

// Admin
export const productosBajoStock = () => http<unknown[]>("/inventario/bajo-stock");

export const agregarStock = (idProducto: number, cantidad: number, motivo?: string) =>
  http<{ idProducto: number; stockTotal: number }>("/inventario/agregar", {
    method: "PUT",
    body: JSON.stringify({ idProducto, cantidad, motivo }),
  });
