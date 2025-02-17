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
    
    // Crear el contenedor de la escena
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
        
        // Distribuir las cartas en círculo
        const angulo = (360 / amigosIngresados.length) * index;
        const radio = Math.min(150, 400 / amigosIngresados.length); // Radio adaptativo
        carta.style.transform = `rotateY(${angulo}deg) translateZ(${radio}px)`;
    });
    
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

// Escuchar el evento "Enter"
    document.getElementById("amigo").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        ingresarAmigos();
    }
});


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

function sortearAmigos() {
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

    // Eliminar la clase "ganadora" de cualquier carta anterior
    cartas.forEach(carta => {
        carta.classList.remove('ganadora');
    });

    // Voltear todas las cartas
    cartas.forEach(carta => {
        carta.classList.add('volteada');
    });

    // Iniciar la animación de la ruleta
    ruleta.classList.add('ruleta-girando');

    // Seleccionar ganador después de la animación
    setTimeout(() => {
        const indiceGanador = Math.floor(Math.random() * amigosIngresados.length);
        const cartaGanadora = cartas[indiceGanador];
        const nombreGanador = amigosIngresados[indiceGanador];

        // Detener la ruleta y mostrar el ganador
        ruleta.classList.remove('ruleta-girando');
        cartaGanadora.classList.remove('volteada');
        cartaGanadora.classList.add('ganadora');

        // Actualizar contadores y mostrar resultado
        contadorGanadores[nombreGanador]++;
        actualizarListaContador();
        document.getElementById("resultado").innerHTML = `¡${nombreGanador} ha sido seleccionado!`;

        // Verificar límite de victorias
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
    }, 8000);
}


function iniciarSorteo() {
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
  }
  
  function mezclarCartas(cartas) {
    cartas.forEach((carta) => {
      const x = Math.random() * 300 - 150;
      const y = Math.random() * 300 - 150;
      carta.style.transform = `translate(${x}px, ${y}px) rotate(${Math.random() * 360}deg)`;
    });
  }
  
  document.addEventListener('DOMContentLoaded', crearCartas);
  document.getElementById('btn-sorteo').addEventListener('click', iniciarSorteo);

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