document.addEventListener('DOMContentLoaded', () => {

    const btnCatalogo = document.querySelector('.btn-catalog');
    

    if (btnCatalogo) {
        btnCatalogo.addEventListener('click', () => {

            window.location.href = 'catalogo.html';
        });
    }
});