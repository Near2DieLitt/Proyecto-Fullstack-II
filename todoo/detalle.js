let productoSeleccionado = JSON.parse(localStorage.getItem("producto"));

// Si el usuario entra directamente a detalle.html sin elegir un producto, lo devolvemos al catálogo
if (!productoSeleccionado) {
    window.location.href = "catalogo.html";
}

document.addEventListener("DOMContentLoaded", function() {

    let precioFormateado = new Intl.NumberFormat('es-CL').format(productoSeleccionado.precio);


    document.getElementById("bread-categoria").innerText = productoSeleccionado.categoria || "Producto";
    document.getElementById("det-img").src = productoSeleccionado.imagen;
    document.getElementById("det-thumb").src = productoSeleccionado.imagen; // Miniatura
    document.getElementById("det-marca").innerText = productoSeleccionado.marca;
    document.getElementById("det-nombre").innerText = productoSeleccionado.nombre;
    document.getElementById("det-precio").innerText = "$" + precioFormateado;
    document.getElementById("det-desc").innerText = productoSeleccionado.descripcion;


    let badgeStock = document.getElementById("det-stock");
    let inputCantidad = document.getElementById("det-cantidad");

    if (productoSeleccionado.stock > 0) {
        badgeStock.innerText = "En stock (" + productoSeleccionado.stock + " unid.)";
        badgeStock.className = "badge bg-success mb-4 px-3 py-2";
        inputCantidad.max = productoSeleccionado.stock; 
    } else {
        badgeStock.innerText = "Agotado";
        badgeStock.className = "badge bg-danger mb-4 px-3 py-2";
        inputCantidad.disabled = true;
        document.querySelector(".btn-dark").disabled = true; 
    }
});


function agregarAlCarrito() {
    let cantidadIngresada = parseInt(document.getElementById("det-cantidad").value);

  
    let carrito = JSON.parse(localStorage.getItem("carritoCompras")) || [];


    let productoExistente = carrito.find(item => item.id === productoSeleccionado.id);

    if (productoExistente) {
        productoExistente.cantidad += cantidadIngresada;
    } else {
  
        carrito.push({
            id: productoSeleccionado.id,
            nombre: productoSeleccionado.nombre,
            precio: productoSeleccionado.precio,
            imagen: productoSeleccionado.imagen,
            cantidad: cantidadIngresada
        });
    }


    localStorage.setItem("carritoCompras", JSON.stringify(carrito));

    alert("¡Producto añadido al carrito con éxito!");

    window.location.href = "catalogo.html"; 
}