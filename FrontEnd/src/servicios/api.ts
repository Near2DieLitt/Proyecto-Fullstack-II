// Una sola URL base: el API Gateway (puerto 8800).
// Para hablar directo con un microservicio (como en clase) cambia .env,
// por ejemplo VITE_API_URL=http://localhost:8082/api  (solo sirve para ese servicio).
export const API: string = import.meta.env.VITE_API_URL ?? "http://localhost:8800/api";

// Error que lanzan todos los servicios cuando el backend responde 4xx/5xx.
// body trae lo que mando el backend, por ejemplo:
//   { status: 400, error: "Validación", campos: { precio: "El precio debe ser mayor a 0" } }
//   { status: 409, mensaje: "Stock insuficiente ..." }
export class ApiError extends Error {
  status: number;
  body: { mensaje?: string; campos?: Record<string, string> } | null;

  constructor(status: number, body: ApiError["body"]) {
    const campos = body?.campos ? Object.values(body.campos).join(" ") : undefined;
    super(body?.mensaje ?? campos ?? `Error HTTP ${status}`);
    this.status = status;
    this.body = body;
  }
}

export async function http<T>(ruta: string, opciones: RequestInit = {}): Promise<T> {
  const respuesta = await fetch(`${API}${ruta}`, {
    headers: { "Content-Type": "application/json" },
    ...opciones,
  });

  if (respuesta.status === 204) {
    return undefined as T;
  }
  const cuerpo = await respuesta.json().catch(() => null);
  if (!respuesta.ok) {
    throw new ApiError(respuesta.status, cuerpo);
  }
  return cuerpo as T;
}

// Convierte el error del backend en un texto para mostrar al usuario (alert, toast, etc.)
export function mensajeDeError(error: unknown, porDefecto = "Ocurrió un error. Intente nuevamente."): string {
  if (error instanceof ApiError) {
    if (error.body?.campos) {
      return Object.values(error.body.campos).join("\n");
    }
    return error.message;
  }
  return porDefecto;
}
