let carrito = JSON.parse(localStorage.getItem("carritoCompras")) || [];

document.addEventListener("DOMContentLoaded", renderizarCarrito);

function renderizarCarrito() {
    let contenedor = document.getElementById("contenedorCarrito");
    let spanContador = document.getElementById("cart-count");
    let sumaTotal = 0;
    let totalItems = 0;

    contenedor.innerHTML = "";

    if (carrito.length === 0) {
        contenedor.innerHTML = `<div class="alert alert-light text-center py-5 border text-muted">Tu carrito está vacío. <a href="catalogo.html" class="text-dark fw-bold">Volver al catálogo</a></div>`;
        document.getElementById("carritoTotal").innerText = "$0";
        spanContador.innerText = "0";
        return;
    }

    carrito.forEach((producto, index) => {
        let precioFormateado = new Intl.NumberFormat('es-CL').format(producto.precio);
        let subtotal = producto.precio * producto.cantidad;
        sumaTotal += subtotal;
        totalItems += producto.cantidad;

        contenedor.innerHTML += `
            <div class="d-flex align-items-center gap-4 border-bottom py-3">
                <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 100px; height: 100px; object-fit: contain;" class="border bg-white p-2">
                <div class="flex-grow-1">
                    <h5 class="fw-bold mb-1">${producto.nombre}</h5>
                    <button class="btn btn-link text-danger p-0 text-decoration-none fs-7" onclick="eliminarProducto('${producto.id}')"><i class="fa fa-trash"></i> Eliminar</button>
                </div>
                <div class="text-end">
                    <h5 class="fw-bold mb-2">$${precioFormateado}</h5>
                    <div class="d-flex align-items-center justify-content-end gap-2">
                        <button class="btn btn-outline-dark btn-sm rounded-circle px-2" onclick="modificarCantidad('${producto.id}', -1)"><i class="fa fa-minus fs-8"></i></button>
                        <span class="fw-bold px-2">${producto.cantidad}</span>
                        <button class="btn btn-outline-dark btn-sm rounded-circle px-2" onclick="modificarCantidad('${producto.id}', 1)"><i class="fa fa-plus fs-8"></i></button>
                    </div>
                </div>
            </div>
        `;
    });


    document.getElementById("carritoTotal").innerText = "$" + new Intl.NumberFormat('es-CL').format(sumaTotal);
    spanContador.innerText = totalItems;
}

function modificarCantidad(id, cambio) {
    let producto = carrito.find(p => p.id === id);
    if (producto) {
        producto.cantidad += cambio;
        if (producto.cantidad <= 0) {
            eliminarProducto(id); // Si llega a 0, se elimina
            return;
        }
        localStorage.setItem("carritoCompras", JSON.stringify(carrito));
        renderizarCarrito();
    }
}

function eliminarProducto(id) {
    carrito = carrito.filter(p => p.id !== id);
    localStorage.setItem("carritoCompras", JSON.stringify(carrito));
    renderizarCarrito();
}

function vaciarCarrito() {
    if(confirm("¿Estás seguro de vaciar el carrito?")) {
        carrito = [];
        localStorage.setItem("carritoCompras", JSON.stringify(carrito));
        renderizarCarrito();
    }
}

function pagar() {
    if (carrito.length === 0) {
        alert("Agrega productos al carrito primero.");
        return;
    }
    alert("Procesando pago... ");
    carrito = [];
    localStorage.setItem("carritoCompras", JSON.stringify(carrito));
    window.location.href = "catalogo.html";
}