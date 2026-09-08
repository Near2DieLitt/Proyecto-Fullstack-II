function ingresar() {
    let correo = document.getElementById("Correo").value.trim();
    let clave = document.getElementById("Clave").value.trim();

    if (correo === "" || clave === "") {
        alert("Debe completar todos los campos");
        return;
    }


    if (correo === "admin@sonidovivo.cl" && clave === "admin123") {
        localStorage.setItem("nombreUsuario", "Administrador");
        localStorage.setItem("rolUsuario", "admin");
        window.location.href = "admin-productos.html";
    } 
  
    else {
        let nombre = correo.split("@")[0]; 
        localStorage.setItem("nombreUsuario", nombre);
        localStorage.setItem("rolUsuario", "cliente");
        window.location.href = "mi-perfil.html";
    }
}