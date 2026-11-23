export interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  telefono: string | null;
  rol: "CLIENTE" | "ADMIN";
  activo: boolean;
}

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string | null;
  precio: number;
  imagenUrl: string | null;
  idCategoria: number;
  categoria: string;
  idMarca: number;
  marca: string;
  destacado: boolean;
  activo: boolean;
}

export interface ProductoForm {
  nombre: string;
  precio: number;
  idCategoria: number;
  idMarca: number;
  descripcion?: string;
  imagenUrl?: string;
  destacado?: boolean;
}

export interface Direccion {
  id: number;
  idUsuario: number;
  calle: string;
  numero: string;
  depto: string | null;
  referencia: string | null;
  idComuna: number;
  comuna: string;
  region: string;
  principal: boolean;
}

export interface DetallePedido {
  idProducto: number;
  nombreProducto: string;
  precioUnitario: number;
  cantidad: number;
  subtotal: number;
}

export interface Pedido {
  id: number;
  idUsuario: number;
  idDireccion: number;
  subtotal: number;
  costoEnvio: number;
  total: number;
  estado: "CREADO" | "PAGADO" | "DESPACHADO" | "ENTREGADO" | "CANCELADO";
  fechaCreacion: string;
  detalles: DetallePedido[];
}

export interface Pago {
  id: number;
  idPedido: number;
  metodoPago: string;
  monto: number;
  estado: "APROBADO" | "RECHAZADO";
  codigoTransaccion: string;
  fecha: string;
}

export interface Envio {
  id: number;
  idPedido: number;
  idDireccion: number;
  empresa: string;
  codigoSeguimiento: string;
  estado: "PREPARANDO" | "EN_CAMINO" | "ENTREGADO";
  fechaEstimada: string | null;
  fechaCreacion: string;
}

export interface Contacto {
  id: number;
  nombreCompleto: string;
  correo: string;
  mensaje: string;
  estado: "PENDIENTE" | "LEIDO" | "RESPONDIDO";
  respuesta: string | null;
  fechaCreacion: string;
}
