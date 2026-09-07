let productoSeleccionado = JSON.parse(localStorage.getItem("producto"));

// Si el usuario entra directamente a detalle.html sin elegir un producto, lo devolvemos al catálogo
if (!productoSeleccionado) {
    window.location.href = "catalogo.html";
}

document.addEventListener("DOMContentLoaded", function() {

    let precioFormateado = new Intl.NumberFormat('es-CL').format(productoSeleccionado.precio);

    // 3. Inyectar los datos en el HTML
    document.getElementById("bread-categoria").innerText = productoSeleccionado.categoria || "Producto";
    document.getElementById("det-img").src = productoSeleccionado.imagen;
    document.getElementById("det-thumb").src = productoSeleccionado.imagen; // Miniatura
    document.getElementById("det-marca").innerText = productoSeleccionado.marca;
    document.getElementById("det-nombre").innerText = productoSeleccionado.nombre;
    document.getElementById("det-precio").innerText = "$" + precioFormateado;
    document.getElementById("det-desc").innerText = productoSeleccionado.descripcion;

    // Validación visual de stock
    let badgeStock = document.getElementById("det-stock");
    let inputCantidad = document.getElementById("det-cantidad");

    if (productoSeleccionado.stock > 0) {
        badgeStock.innerText = "En stock (" + productoSeleccionado.stock + " unid.)";
        badgeStock.className = "badge bg-success mb-4 px-3 py-2";
        inputCantidad.max = productoSeleccionado.stock; // Evitar que pidan más de lo que hay
    } else {
        badgeStock.innerText = "Agotado";
        badgeStock.className = "badge bg-danger mb-4 px-3 py-2";
        inputCantidad.disabled = true;
        document.querySelector(".btn-dark").disabled = true; // Desactivar botón de compra
    }
});

// 4. Función para guardar en el carrito usando localStorage (Requerimiento de la rúbrica)
function agregarAlCarrito() {
    let cantidadIngresada = parseInt(document.getElementById("det-cantidad").value);

    // Traer el carrito actual de la memoria, o crear un arreglo vacío si es la primera compra
    let carrito = JSON.parse(localStorage.getItem("carritoCompras")) || [];

    // Verificar si el producto ya está en el carrito para sumar la cantidad en lugar de duplicarlo
    let productoExistente = carrito.find(item => item.id === productoSeleccionado.id);

    if (productoExistente) {
        productoExistente.cantidad += cantidadIngresada;
    } else {
        // Agregar nuevo ítem al arreglo del carrito
        carrito.push({
            id: productoSeleccionado.id,
            nombre: productoSeleccionado.nombre,
            precio: productoSeleccionado.precio,
            imagen: productoSeleccionado.imagen,
            cantidad: cantidadIngresada
        });
    }

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem("carritoCompras", JSON.stringify(carrito));

    alert("¡Producto añadido al carrito con éxito!");
    //Redirigir al catálogo para seguir comprando
    window.location.href = "catalogo.html"; 
}