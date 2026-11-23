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

export const crearInventarioInicial = (idProducto: number, stockInicial: number, stockMinimo: number) =>
  http<{ id: number; idProducto: number; idBodega: number; stockActual: number; stockMinimo: number }>("/inventario", {
    method: "POST",
    body: JSON.stringify({ idProducto, stockInicial, stockMinimo }),
  });

export async function ajustarStock(idProducto: number, stockDeseado: number) {
  if (!Number.isSafeInteger(stockDeseado) || stockDeseado < 0) {
    throw new Error("El stock debe ser un número entero igual o mayor a cero.");
  }

  const { stockTotal } = await stockDeProducto(idProducto);
  const diferencia = stockDeseado - stockTotal;
  if (diferencia === 0) return { idProducto, stockTotal };

  try {
    const resultado = diferencia > 0
      ? await agregarStock(idProducto, diferencia, "Ajuste desde panel de administración")
      : await descontarStock(idProducto, Math.abs(diferencia), "Ajuste desde panel de administración");
    return resultado;
  } catch (error) {
    const actualizado = await stockDeProducto(idProducto).catch(() => null);
    if (actualizado?.stockTotal === stockDeseado) return actualizado;
    throw error;
  }
}
