// Cargar productos del localStorage
let productos = JSON.parse(localStorage.getItem("productosCatalogo")) || [];

document.addEventListener("DOMContentLoaded", mostrarProductos);

function mostrarProductos() {
    let tbody = document.getElementById("tablaProductos");
    tbody.innerHTML = "";
    
    productos.forEach((p, index) => {
        // Lógica de alerta por Stock Crítico 
        let alertaStock = (p.stockCritico && p.stock <= p.stockCritico) ? `<br><span class="badge bg-danger mt-1">¡Stock Crítico!</span>` : '';
        let img = p.imagen ? p.imagen : "https://via.placeholder.com/50";

        tbody.innerHTML += `
            <tr>
                <td class="fw-bold">${p.id}</td>
                <td><img src="${img}" alt="${p.nombre}" width="50" height="50" style="object-fit:cover;" class="border"></td>
                <td>${p.nombre} ${alertaStock}</td>
                <td>${p.categoria || "S/C"}</td>
                <td class="text-success fw-bold">$${p.precio}</td>
                <td>${p.stock || 0} unid.</td>
                <td>
                    <button class="btn btn-sm btn-outline-dark me-1" onclick="prepararEditar(${index})" data-bs-toggle="modal" data-bs-target="#modalProducto"><i class="fa fa-edit"></i></button>
                    <button class="btn btn-sm btn-danger" onclick="eliminarProducto(${index})"><i class="fa fa-trash"></i></button>
                </td>
            </tr>
        `;
    });
}

function prepararCrear() {
    document.getElementById("modalTitle").innerText = "Nuevo Producto";
    document.getElementById("formProducto").reset();
    document.getElementById("prodIndex").value = ""; 
}

function prepararEditar(index) {
    document.getElementById("modalTitle").innerText = "Editar Producto";
    let p = productos[index];
    
    document.getElementById("prodIndex").value = index; 
    document.getElementById("prodCodigo").value = p.id;
    document.getElementById("prodNombre").value = p.nombre;
    document.getElementById("prodPrecio").value = p.precio;
    document.getElementById("prodStock").value = p.stock || 0;
    document.getElementById("prodStockCritico").value = p.stockCritico || '';
    document.getElementById("prodCategoria").value = p.categoria || "";
    document.getElementById("prodDesc").value = p.descripcion || "";
    document.getElementById("prodImg").value = p.imagen || "";
}

document.getElementById("formProducto").addEventListener("submit", function(e) {
    e.preventDefault(); 
    
    let index = document.getElementById("prodIndex").value;
    
    let nuevoProducto = {
        id: document.getElementById("prodCodigo").value,
        nombre: document.getElementById("prodNombre").value,
        precio: parseFloat(document.getElementById("prodPrecio").value),
        stock: parseInt(document.getElementById("prodStock").value),
        stockCritico: parseInt(document.getElementById("prodStockCritico").value) || 0,
        categoria: document.getElementById("prodCategoria").value,
        descripcion: document.getElementById("prodDesc").value,
        imagen: document.getElementById("prodImg").value,
        marca: "Sonido Vivo" // Dato por defecto para compatibilidad con tu catálogo
    };

    if (index === "") {
        productos.push(nuevoProducto); // Crear
    } else {
        productos[index] = nuevoProducto; // Modificar
    }
    
    localStorage.setItem("productosCatalogo", JSON.stringify(productos));
    mostrarProductos();
    
    // Cerrar ventana modal
    let modal = bootstrap.Modal.getInstance(document.getElementById('modalProducto'));
    modal.hide();
});

function eliminarProducto(index) {
    if(confirm("¿Estás seguro de que deseas eliminar este producto?")) {
        productos.splice(index, 1);
        localStorage.setItem("productosCatalogo", JSON.stringify(productos));
        mostrarProductos();
    }
}