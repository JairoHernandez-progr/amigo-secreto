// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.

let amigosIngresados =[];
let contadorGanadores = {}; // Contador de victorias por amigos
//let limiteDeVictorias = 10;

//personalizar alert toastr
toastr.options = {
    "closeButton": true,
    "progressBar": true,
    "positionClass": "toast-top-right",  // Cambia la posición si lo deseas
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",  // Duración de la notificación
  };
  
/* Añade estas modificaciones a tu JavaScript (app.js) */

function crearCartas() {
        const contenedor = document.getElementById('contenedor-cartas');
        contenedor.innerHTML = '';
    
        const escena = document.createElement('div');
        escena.classList.add('escena-cartas');
    
        const ruleta = document.createElement('div');
        ruleta.classList.add('ruleta-cartas');
    
        amigosIngresados.forEach((nombre, index) => {
            const carta = document.createElement('div');
            carta.classList.add('carta');
            carta.dataset.index = index;
    
            const frente = document.createElement('div');
            frente.classList.add('frente');
            frente.textContent = nombre;
    
            const dorso = document.createElement('div');
            dorso.classList.add('dorso');
    
            carta.appendChild(frente);
            carta.appendChild(dorso);
            ruleta.appendChild(carta);
    
            const angulo = (360 / amigosIngresados.length) * index;
            const radio = 300; // Radio fijo para el carrusel
            const offsetY = -70; // Ajusta este valor según cuánto quieras subir
            carta.style.transform = `rotateY(${angulo}deg) translateZ(${radio}px) translateY(${offsetY}px)`;});
    
        escena.appendChild(ruleta);
        contenedor.appendChild(escena);
    
}

  
// Función para validar el nombre del amigo
function validarNombreAmigo(nombre) {
    if (nombre.trim() === "") {
        Swal.fire({
            title: '¡Atención!',
            text: 'Por favor, inserte un nombre.',
            icon: 'warning',
            confirmButtonText: 'Entendido'
        });
        return false;
    }

    if (amigosIngresados.includes(nombre)) {
        Swal.fire({
            title: '¡Atención!',
            text: 'Este nombre ya fue Ingresado.',
            icon: 'warning',
            confirmButtonText: 'Entendido'
        });
        return false;
    }

    return true;
}

// Función para ingresar amigos
function ingresarAmigos() {
    let textoIngresado = document.getElementById('amigo');
    const nombre = textoIngresado.value.trim();

    if (validarNombreAmigo(nombre)) {
        amigosIngresados.push(nombre);
        contadorGanadores[nombre] = 0; // Inicializa el contador
        textoIngresado.value = "";
        renderizarLista(); // Renderiza la lista de amigos
        actualizarListaContador(); // Renderiza los contadores
        crearCartas(); // Actualizar cartas
    }
}

//agregar amigos a la lista
function renderizarLista() {
    let amigosLista = document.getElementById('listaAmigos');
    amigosLista.innerHTML = ""; // Limpia la lista

    amigosIngresados.forEach((amigo, i) => {
        const li = document.createElement("li");
        li.classList.add("lista-item");

        // Nombre del amigo
        const nombreAmigo = document.createElement("span");
        nombreAmigo.textContent = amigo;
        nombreAmigo.classList.add("nombre-amigo");

        // Botón de eliminación
        const eliminarIcono = document.createElement("i");
        eliminarIcono.classList.add("fas", "fa-trash", "icono-eliminar");
        eliminarIcono.addEventListener("click", function () {
            eliminarAmigo(i);
        });

        // Añadir elementos al <li>
        li.appendChild(nombreAmigo);
        li.appendChild(eliminarIcono);

        // Añadir <li> a la lista
        amigosLista.appendChild(li);
    });
}

//eliminar amigos de lista de ganadores
function eliminarAmigo(index) {
    const nombreAmigo = amigosIngresados[index]; // Obtener el nombre del amigo
    console.log("Intentando eliminar a:", nombreAmigo); // Mensaje de depuraciónd

    amigosIngresados.splice(index, 1); // Eliminar del array de amigos
    console.log("Lista después de eliminar:", amigosIngresados); // Ver la lista actualizada

    delete contadorGanadores[nombreAmigo]; // Intentar eliminar del objeto de contadores
    console.log("Contadores después de eliminar:", contadorGanadores); // Ver el objeto de contadores

    renderizarLista(); // Actualizar la lista de amigos
    actualizarListaContador(); // Actualizar la lista de contadores de victorias
    crearCartas(); // Actualizar cartas
}

// contador de victorias
function actualizarListaContador() {
    let listaContador = document.getElementById('lista__Contador');
    listaContador.innerHTML = "";

    for (const [nombre, conteo] of Object.entries(contadorGanadores)) {
        const li = document.createElement("li");
        li.textContent = `${nombre}: ${conteo} victoria(s)`;
        listaContador.appendChild(li);
        
    }
}

//funcion limpiar
function limpiarLista() {
    document.querySelector('#listaAmigos').innerHTML = "";
    amigosIngresados = [];
    contadorGanadores = {}; // Reinicia el contador de victorias
    document.getElementById('lista__Contador').innerHTML = "";
    const input = document.getElementById('amigo');
    input.value = "";
    const inputContador = document.getElementById('limiteVictorias');
    inputContador.value = "1";
    crearCartas();

}

// resetear cartas
function resetearCartas() {
    const cartas = document.querySelectorAll('.carta');

    cartas.forEach((carta) => {
        // Eliminar todas las posibles clases aplicadas
        carta.classList.remove('ganadora', 'apilada', 'volteada', 'neutral', 'ruleta-girando');

        // Reiniciar estilos y transformaciones
        carta.style.transform = 'rotateY(0deg) translateZ(0) scale(1)';
        carta.style.zIndex = 'auto';
        carta.style.boxShadow = 'none';
        carta.style.transition = 'none'; // Deshabilitar transiciones para evitar efectos no deseados
    });
}


function activarTransiciones() {
    const cartas = document.querySelectorAll('.carta');
    cartas.forEach((carta) => {
        carta.style.transition = 'transform 0.6s ease-out';
    });
}

function marcarCartaGanadora(carta) {
    // Eliminar cualquier clase o transformación previa
    carta.classList.remove('apilada');
    carta.style.transform = '';
    carta.classList.add('ganadora'); // Marcar como ganadora
}

function finalizarSorteo(cartaGanadora, ruleta) {
    // Detener la animación de la ruleta
    ruleta.classList.remove('ruleta-girando');
    // Marcar la carta ganadora
    marcarCartaGanadora(cartaGanadora);
}

function seleccionarGanador(cartaGanadora, cartas) {
    // Limpiar todas las cartas antes de aplicar clases
    cartas.forEach((carta) => {
        carta.classList.remove('ganadora', 'apilada', 'neutral');
        carta.classList.add('neutral'); // Asegurar que todas estén rectas
    });

    // Aplicar clase ganadora a la carta correspondiente
    cartaGanadora.classList.add('ganadora');
}
//funcion sortear
function sortearAmigos() {
    // Reiniciar las cartas antes de empezar el sorteo
    resetearCartas();
    activarTransiciones();

    // Validar si hay amigos suficientes para el sorteo
    if (amigosIngresados.length === 0) {
        Swal.fire({
            title: '¡Atención!',
            text: 'La lista está vacía. No se puede iniciar el sorteo.',
            icon: 'warning',
            confirmButtonText: 'Entendido'
        });
        return;
    }

    if (amigosIngresados.length < 2) {
        Swal.fire({
            title: '¡Atención!',
            text: 'Necesitas al menos dos amigos para iniciar el sorteo.',
            icon: 'warning',
            confirmButtonText: 'Entendido'
        });
        return;
    }

    const ruleta = document.querySelector('.ruleta-cartas');
    const cartas = document.querySelectorAll('.carta');
    const numCartas = cartas.length;
    let currentIndex = 0;

    // Configurar las posiciones iniciales del carrusel
    function setCarouselPositions() {
        const angle = 360 / numCartas;
        cartas.forEach((carta, index) => {
            carta.style.transform = `rotateY(${index * angle}deg) translateZ(300px)`;
        });
    }

    // Resetear la posición de la ruleta
    function resetRuleta() {
        ruleta.style.transform = `translate(-50%, -50%) rotateY(0deg)`;
    }

    // Mostrar la siguiente carta en el carrusel
    function showNextCard() {
        const angle = 360 / numCartas;
        currentIndex = (currentIndex + 1) % numCartas;
        cartas.forEach((carta, index) => {
            const cardIndex = (index + currentIndex) % numCartas;
            carta.style.transform = `rotateY(${cardIndex * angle}deg) translateZ(300px)`;
        });
    }

    // Inicializar el carrusel
    setCarouselPositions();
    resetRuleta();
    const interval = setInterval(showNextCard, 2000); // Cambiar cartas cada 2 segundos

    // Seleccionar el ganador después de la animación
    setTimeout(() => {
        clearInterval(interval); // Detener el carrusel
        const indiceGanador = Math.floor(Math.random() * amigosIngresados.length);
        const cartaGanadora = cartas[indiceGanador];
        const nombreGanador = amigosIngresados[indiceGanador];

        // Detener la ruleta y marcar la carta ganadora
        finalizarSorteo(cartaGanadora, ruleta);

        // Asegurar que todas las cartas estén en estado neutral y marcar la ganadora
        seleccionarGanador(cartaGanadora, cartas);

        // Después de 3 segundos, apilar las cartas
        setTimeout(() => {
            cartas.forEach((carta, index) => {
                // Apilar las cartas de forma ordenada
                carta.style.transform = `translateZ(-${(cartas.length - index) * 10}px) rotateY(0deg)`;
                carta.style.transition = 'transform 1.5s ease-out'; // Transición suave
            });

            // Destacar la carta ganadora al frente
            cartaGanadora.style.transform = `translateZ(200px) rotateY(0deg) scale(1.2)`;
            cartaGanadora.style.zIndex = 1000;
        }, 3000);

        // Actualizar los contadores de victorias y mostrar el resultado
        contadorGanadores[nombreGanador]++;
        actualizarListaContador();
        document.getElementById("resultado").innerHTML = `¡${nombreGanador} ha sido seleccionado!`;

        // Verificar si alguien alcanzó el límite de victorias
        let limiteDeVictorias = parseInt(document.getElementById("limiteVictorias").value);
        if (contadorGanadores[nombreGanador] >= limiteDeVictorias) {
            setTimeout(() => {
                Swal.fire({
                    title: '¡Felicidades!',
                    text: `${nombreGanador} ha ganado el juego con ${limiteDeVictorias} victorias.`,
                    icon: 'success',
                    confirmButtonText: '¡Genial!'
                }).then(NuevoJuego);
            }, 1500);
        }
    }, 8000); // El ganador se selecciona después de 4 segundos
}



//funcion iniciar sorteo
/*function iniciarSorteo() {
    if (amigosIngresados.length === 0) {
      Swal.fire({
        title: '¡Atención!',
        text: 'No hay amigos en la lista.',
        icon: 'warning',
        confirmButtonText: 'Entendido'
      });
      return;
    } else if (amigosIngresados.length < 2) {
      Swal.fire({
        title: '¡Atención!',
        text: 'Añade por lo menos dos amigos para poder sortear.',
        icon: 'warning',
        confirmButtonText: 'Entendido'
      });
      return;
    }
  
    const cartas = document.querySelectorAll('.carta');
    cartas.forEach((carta) => {
      carta.classList.add('volteada');
    });
  
    setTimeout(() => {
      mezclarCartas(cartas);
  
      setTimeout(() => {
        const indiceAleatorio = Math.floor(Math.random() * cartas.length);
        const cartaSorteada = cartas[indiceAleatorio];
        cartaSorteada.classList.remove('volteada');
        cartaSorteada.classList.add('seleccionada');
  
        const amigoSorteado = amigosIngresados[indiceAleatorio];
        document.getElementById("resultado").innerHTML = `El amigo secreto sorteado es ${amigoSorteado}`;
        contadorGanadores[amigoSorteado]++;
        actualizarListaContador();
  
        let limiteDeVictorias = parseInt(document.getElementById("limiteVictorias").value);
        if (contadorGanadores[amigoSorteado] >= limiteDeVictorias) {
          Swal.fire({
            title: '¡Felicidades!',
            text: `${amigoSorteado} ha ganado el juego con ${limiteDeVictorias} victorias.`,
            icon: 'success',
            confirmButtonText: '¡Genial!'
          }).then(NuevoJuego);
        }
      }, 2000);
    }, 1000);
  }*/
  //funcion mezclar cartas
 /* function mezclarCartas(cartas) {
    cartas.forEach((carta) => {
        const x = Math.random() * 300 - 150;
        const y = Math.random() * 300 - 150;
        const rot = Math.random() * 360;
        carta.style.transition = 'transform 0.6s ease-out';
        carta.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg)`;
    });
 }
  
  document.addEventListener('DOMContentLoaded', crearCartas);
  document.getElementById('btn-sorteo').addEventListener('click', sortearAmigos);*/


//boton nuevo juego
// Modificar la función NuevoJuego para manejar las cartas
function NuevoJuego() {
    limpiarLista();
    document.getElementById('resultado').innerHTML = "";
    const contenedor = document.getElementById('contenedor-cartas');
    contenedor.innerHTML = '';
    
    Swal.fire({
        title: '¡Nuevo Juego!',
        text: "El juego ha comenzado de nuevo",
        icon: 'success',
        confirmButtonText: '¡Genial!'
    });
}