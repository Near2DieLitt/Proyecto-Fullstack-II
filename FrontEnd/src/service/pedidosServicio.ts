import { http } from "./api";
import type { Envio, Pago, Pedido } from "./tipos";

// Checkout: el carrito (Context/localStorage) se convierte en un pedido.
// OJO: solo se manda id y cantidad; el precio lo toma el backend desde el catalogo.
export const crearPedido = (
  idUsuario: number,
  idDireccion: number,
  items: { idProducto: number; cantidad: number }[],
) => http<Pedido>("/pedidos", { method: "POST", body: JSON.stringify({ idUsuario, idDireccion, items }) });

export const metodosDePago = () => http<{ id: number; nombre: string }[]>("/metodos-pago");

// Revisar pago.estado: "APROBADO" o "RECHAZADO" (la respuesta es 201 en ambos casos)
export const pagarPedido = (idPedido: number, idMetodoPago: number, numeroTarjeta?: string) =>
  http<Pago>("/pagos", { method: "POST", body: JSON.stringify({ idPedido, idMetodoPago, numeroTarjeta }) });

export const misPedidos = (idUsuario: number) => http<Pedido[]>(`/pedidos/usuario/${idUsuario}`);
export const obtenerPedido = (id: number) => http<Pedido>(`/pedidos/${id}`);
export const cancelarPedido = (id: number) =>
  http<Pedido>(`/pedidos/${id}/estado`, { method: "PUT", body: JSON.stringify({ estado: "CANCELADO" }) });

export const seguimientoDePedido = (idPedido: number) => http<Envio>(`/envios/pedido/${idPedido}`);
export const buscarPorCodigo = (codigo: string) => http<Envio>(`/envios/seguimiento/${codigo}`);

// Admin
export const todosLosPedidos = (estado?: string) =>
  http<Pedido[]>(`/pedidos${estado ? `?estado=${estado}` : ""}`);
export const crearEnvio = (idPedido: number, empresa: string) =>
  http<Envio>("/envios", { method: "POST", body: JSON.stringify({ idPedido, empresa }) });
export const avanzarEnvio = (idEnvio: number, estado: "EN_CAMINO" | "ENTREGADO", detalle?: string) =>
  http<Envio>(`/envios/${idEnvio}/estado`, { method: "PUT", body: JSON.stringify({ estado, detalle }) });
