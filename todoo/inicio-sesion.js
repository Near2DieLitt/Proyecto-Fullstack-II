function ingresar() {
    let correo = document.getElementById("Correo").value.trim();
    let clave = document.getElementById("Clave").value.trim();

    if (correo === "" || clave === "") {
        alert("Debe completar todos los campos");
        return;
    }

    // Si es el Administrador
    if (correo === "admin@sonidovivo.cl" && clave === "admin123") {
        localStorage.setItem("nombreUsuario", "Administrador");
        localStorage.setItem("rolUsuario", "admin"); // <-- ESTO ES CLAVE
        window.location.href = "admin-productos.html";
    } 
    // Si es un Cliente (Cualquier otro correo)
    else {
        let nombre = correo.split("@")[0]; // Saca el nombre del correo para saludarlo
        localStorage.setItem("nombreUsuario", nombre);
        localStorage.setItem("rolUsuario", "cliente"); // <-- ESTO ES CLAVE
        window.location.href = "mi-perfil.html";
    }
}