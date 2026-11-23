
export const API: string = import.meta.env.VITE_API_URL ?? "http://localhost:8800/api";

export class ApiError extends Error {
  status: number;
  body: { mensaje?: string; campos?: Record<string, string> } | null;

  constructor(status: number, body: ApiError["body"]) {
    super(body?.mensaje ?? `Error HTTP ${status}`);
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


export function mensajeDeError(error: unknown, porDefecto = "Ocurrió un error. Intente nuevamente."): string {
  if (error instanceof ApiError) {
    if (error.body?.campos) {
      return Object.values(error.body.campos).join("\n");
    }
    return error.message;
  }
  return porDefecto;
}
