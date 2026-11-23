import { guardarProductos } from "../components/ts/almacenamiento";
import type { Producto as ProductoTienda } from "../components/ts/datos";
import { stockDeProducto } from "./inventarioServicio";
import { listarProductos, obtenerProducto } from "./productosServicio";

async function convertirProducto(producto: Awaited<ReturnType<typeof listarProductos>>[number]): Promise<ProductoTienda> {
  const inventario = await stockDeProducto(producto.id);
  return {
    id: String(producto.id),
    marca: producto.marca,
    nombre: producto.nombre,
    precio: Number(producto.precio),
    descripcion: producto.descripcion ?? "",
    categoria: producto.categoria,
    stock: inventario.stockTotal,
    stockCritico: 2,
    imagen: producto.imagenUrl ?? "https://placehold.co/600x400?text=Producto",
    destacado: producto.destacado,
    idCategoria: producto.idCategoria,
    idMarca: producto.idMarca,
  };
}

export async function listarProductosDeTienda(): Promise<ProductoTienda[]> {
  const productos = await listarProductos();
  const productosConStock = await Promise.all(productos.filter((producto) => producto.activo).map(convertirProducto));

  guardarProductos(productosConStock);
  return productosConStock;
}

export async function obtenerProductoDeTienda(id: string): Promise<ProductoTienda> {
  const idNumerico = Number(id);
  if (!Number.isSafeInteger(idNumerico) || idNumerico < 1) throw new Error("El producto solicitado no existe.");
  const producto = await obtenerProducto(idNumerico);
  if (!producto.activo) throw new Error("El producto solicitado no está disponible.");
  const productoConStock = await convertirProducto(producto);
  const guardados = JSON.parse(localStorage.getItem("productosCatalogo") ?? "[]") as ProductoTienda[];
  guardarProductos([...guardados.filter((item) => item.id !== productoConStock.id), productoConStock]);
  return productoConStock;
}