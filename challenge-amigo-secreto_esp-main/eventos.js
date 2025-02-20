//eventos del juego amigo secreto

//evento para el numero de victorias elegidas por el usuario.
document.addEventListener("DOMContentLoaded", function () {
    const limiteVictoriasInput = document.getElementById('limiteVictorias');

    // Evitar letras y otros caracteres no deseados
    limiteVictoriasInput.addEventListener('keydown', function (event) {
        if (['e', '+', '-', '.'].includes(event.key)) {
            event.preventDefault();
        }
    });

    // Ajustar el valor con la rueda del mouse
    limiteVictoriasInput.addEventListener('wheel', function (e) {
        e.preventDefault();
        let valorActual = parseInt(this.value);
        let incremento = e.deltaY < 0 ? 1 : -1;
        let nuevoValor = Math.max(1, valorActual + incremento);
        this.value = nuevoValor;
    });
});


document.getElementById("limiteVictorias").addEventListener("keydown", function (event) {
    // Permitir teclas de control como backspace, flechas y tab
    if (
        event.key !== "Backspace" &&
        event.key !== "ArrowLeft" &&
        event.key !== "ArrowRight" &&
        event.key !== "Tab" &&
        (event.key < "0" || event.key > "9")
    ) {
        event.preventDefault(); // Evita que se ingresen letras
    }
});

// Escuchar el evento "Enter"
document.getElementById("amigo").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        ingresarAmigos();
    }
});
