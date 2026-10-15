const usuariosPermitidos = [
    {
        correo: "admin@sonidovivo.cl",
        clave: "admin123",
        nombre: "Administrador",
        rol: "admin"
    },
    {
        correo: "juan@cliente.cl",
        clave: "cli123",
        nombre: "Juan",
        rol: "cliente"
    },
    {
        correo: "profe@duoc.cl",
        clave: "duoc123",
        nombre: "Profesor",
        rol: "cliente"
    }
];


function ingresar() {
    let correoInput = document.getElementById("Correo").value.trim().toLowerCase();
    let claveInput = document.getElementById("Clave").value.trim();


    if (correoInput === "" || claveInput === "") {
        alert("Debe completar todos los campos");
        return;
    }



    let usuarioEncontrado = usuariosPermitidos.find(
        user => user.correo === correoInput && user.clave === claveInput
    );

    if (usuarioEncontrado) {

        localStorage.setItem("nombreUsuario", usuarioEncontrado.nombre);
        localStorage.setItem("rolUsuario", usuarioEncontrado.rol);


        if (usuarioEncontrado.rol === "admin") {
            window.location.href = "admin-productos.html";
        } else {
            window.location.href = "mi-perfil.html";
        }
    } else {

        alert("Correo o contraseña incorrectos.");
    }
}