document.addEventListener('DOMContentLoaded', function () {
    const OrdenText = document.getElementById('orden');

    function leerComandoDeMockAPI() {
        const url = "https://6604c6232ca9478ea17e7e32.mockapi.io/ComandosDetectados";

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                const ultimoRegistro = data[data.length - 1];
                console.log('Último registro en MockAPI:', ultimoRegistro);
                
                // Mostrar la última orden en la página
                OrdenText.textContent = ultimoRegistro.textoComando; // Cambiamos a "comando" en lugar de "orden"
            }
        })
        .catch(error => console.error('Error al obtener registros del MockAPI:', error));
    }

    // Llamar a la función leerComandoDeMockAPI cada 2 segundos
    setInterval(leerComandoDeMockAPI, 2000);
});







