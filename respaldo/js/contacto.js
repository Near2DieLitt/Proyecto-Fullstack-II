document.addEventListener("DOMContentLoaded", function() {
    

    const inputsContact = [
        { id: "NombreContacto", max: 100 },
        { id: "MensajeContacto", max: 500 }
    ];

    inputsContact.forEach(item => {
        let input = document.getElementById(item.id);
        
        if (input) {

            let contador = input.nextElementSibling;
            

            input.addEventListener('input', () => {
                contador.textContent = input.value.length + "/" + item.max;
            });
        }
    });
});


function enviarMensaje() {
    let nombre = document.getElementById("NombreContacto").value;
    let correo = document.getElementById("CorreoContacto").value;
    let mensaje = document.getElementById("MensajeContacto").value;


    if (nombre.trim() === "" || correo.trim() === "" || mensaje.trim() === "") {
        alert("Por favor, completa todos los campos obligatorios (*).");
        return; 
    }


    alert("¡Gracias por escribirnos, " + nombre + "! Hemos recibido tu mensaje y te responderemos pronto al correo " + correo + ".");
    

    document.getElementById("NombreContacto").value = "";
    document.getElementById("CorreoContacto").value = "";
    document.getElementById("MensajeContacto").value = "";
    

    document.getElementById("cont-nombre").textContent = "0/100";
    document.getElementById("cont-mensaje").textContent = "0/500";
}