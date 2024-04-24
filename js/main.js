let miVentana = null;
let miVentana2 = null;
let ultimoComando = ''; // Variable para almacenar el último comando detectado
let ultimaHora = ''; // Variable para almacenar la última hora detectada
let primeraCarga = true; // Variable para controlar la primera carga

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
                
                // Si es la primera carga, actualizar el último comando y hora detectados sin mostrarlo en la página
                if (primeraCarga) {
                    ultimoComando = ultimoRegistro.textoComando;
                    ultimaHora = ultimoRegistro.hora;
                    primeraCarga = false;
                    return;
                }

                // Mostrar la última orden en la página solo si hay un cambio en el comando o la hora
                if (ultimoRegistro.textoComando !== ultimoComando || ultimoRegistro.hora !== ultimaHora) {
                    OrdenText.textContent = ultimoRegistro.textoComando.toUpperCase();

                    const kw1 = 'pestaña nueva';
                    const kw2 = 'la cuerda';
                    const kw3 = 'tamaño pequeño';
                    const kw4 = 'Abre YouTube';
                    const kw5 = 'cierra navegador';

                    if (ultimoRegistro.textoComando.includes(kw1)) {
                        window.alert("Abriendo Pestaña Nueva");
                        miVentana = window.open('https://www.google.com', '_blank');
                    } else if (ultimoRegistro.textoComando.includes(kw2)) {
                        window.alert("Abriendo Página de 'LaCuerda'");
                        miVentana2 = window.open('https://acordes.lacuerda.net', '_blank');
                    } else if (ultimoRegistro.textoComando.includes(kw3)) {
                        const opciones = 'width=600,height=400,left=100,top=100';
                        window.alert("Abriendo Ventana Pequeña");
                        window.open('https://www.google.com', '_blank', opciones);
                    } else if (ultimoRegistro.textoComando.includes(kw4)) {
                        window.alert("Abriendo YouTube");
                        abrirYouTube('dQw4w9WgXcQ&ab');
                    } else if (ultimoRegistro.textoComando.includes(kw5)) {
                        window.alert("Puedes cerrar el navegador");
                    } else {
                        console.log("No se detectó el comando");
                    }

                    // Actualizar el último comando y hora detectados
                    ultimoComando = ultimoRegistro.textoComando;
                    ultimaHora = ultimoRegistro.hora;
                    
                    function abrirYouTube(videoId) {
                        var url = 'https://www.youtube.com/watch?v=' + videoId;
                        var intentUrl = 'vnd.youtube://' + videoId;
                        
                        // Intentar abrir la aplicación de YouTube utilizando el enlace profundo
                        window.location.href = intentUrl;
                      
                        // Si la apertura de la aplicación falla, abrir el enlace web de YouTube
                        setTimeout(function() {
                          window.location.href = url;
                        }, 1000);
                      }
                      
                }
            }
        })
        .catch(error => console.error('Error al obtener registros del MockAPI:', error));
    }

    // Llamar a la función leerComandoDeMockAPI cada 2 segundos
    setInterval(leerComandoDeMockAPI, 2000);
});
