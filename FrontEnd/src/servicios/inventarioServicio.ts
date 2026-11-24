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

export const descontarStock = (idProducto: number, cantidad: number, motivo?: string) =>
  http<{ idProducto: number; stockTotal: number }>("/inventario/descontar", {
    method: "PUT",
    body: JSON.stringify({ idProducto, cantidad, motivo }),
  });

export const crearInventario = (datos: {
  idProducto: number;
  stockInicial: number;
  stockMinimo?: number;
  idBodega?: number;
}) => http<unknown>("/inventario", { method: "POST", body: JSON.stringify(datos) });
