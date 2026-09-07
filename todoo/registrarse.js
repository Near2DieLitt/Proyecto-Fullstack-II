document.addEventListener("DOMContentLoaded", function() {
    // Activar contadores en vivo
    const inputsConContador = [
        { id: "Nombre", max: 50 },
        { id: "Apellidos", max: 100 },
        { id: "Direccion", max: 300 }
    ];

    inputsConContador.forEach(item => {
        let input = document.getElementById(item.id);
        if (input) {
            let contador = input.nextElementSibling; 
            input.addEventListener('input', () => {
                contador.textContent = input.value.length + "/" + item.max;
            });
        }
    });
});

function registrar() {
    let run = document.getElementById("Run").value;
    let nombre = document.getElementById("Nombre").value; 
    let correo = document.getElementById("CorreoReg").value;
    let clave = document.getElementById("ClaveReg").value;
    let claveConf = document.getElementById("ClaveConf").value;
    let region = document.getElementById("Region").value;

    if (run === "" || nombre === "" || correo === "" || clave === "" || region === "") {
        alert("Por favor, completa todos los campos obligatorios (*).");
        return;
    }

    if (clave !== claveConf) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    // Guardamos que se registró un CLIENTE y su nombre
    localStorage.setItem("nombreUsuario", nombre);
    localStorage.setItem("rolUsuario", "cliente");

    alert("¡Cuenta creada exitosamente para " + nombre + "!");
    window.location.href = "mi-perfil.html";
}