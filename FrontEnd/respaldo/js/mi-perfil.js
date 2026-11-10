document.addEventListener("DOMContentLoaded", function() {

    let nombreGuardado = localStorage.getItem("nombreUsuario");


    if (nombreGuardado) {
        document.getElementById("saludo-usuario").innerText = "Hola, " + nombreGuardado;
    } else {

        window.location.href = "inicio-sesion.html";
    }
});

function cerrarSesion() {

    localStorage.removeItem("nombreUsuario");

    window.location.href = "inicio-sesion.html";
}