document.addEventListener('DOMContentLoaded', () => {
    const infoTexts = document.querySelectorAll('.info-text p');

    infoTexts.forEach(text => {
        text.style.cursor = 'pointer';
        text.title = 'Haz clic para copiar';

        text.addEventListener('click', () => {
            const textToCopy = text.innerText;
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalColor = text.style.color;
                text.style.color = '#B07820'; 
                text.innerText = '¡Copiado!';
                
                setTimeout(() => {
                    text.style.color = originalColor;
                    text.innerText = textToCopy;
                }, 1000);
            }).catch(err => {
                console.error('Error al copiar: ', err);
            });
        });
    });
});