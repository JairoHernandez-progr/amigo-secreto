// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.

let amigosIngresados =[];
let contadorGanadores = {}; // Contador de victorias por amigos
let limiteDeVictorias = 10;


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
}

function sortearAmigos(){
    
    if (amigosIngresados.length === 0){

        alert ("No hay amigos en la lista.");
        return;
    }else if(amigosIngresados.length < 2 ){
        alert("Añade por lo menos dos amigos para poder sortear");
        return;
    }else{

    const indiceAleatorio = Math.floor(Math.random() * amigosIngresados.length);
    const amigoSorteado = amigosIngresados[indiceAleatorio];

    const resultadoElemento = document.getElementById("resultado");
    resultadoElemento.innerHTML = `El amigo secreto sorteado es ${amigoSorteado}`;
   
    contadorGanadores[amigoSorteado]++;
    actualizarListaContador();

        //limite de victorias
    if (contadorGanadores[amigoSorteado] >= limiteDeVictorias) {
        Swal.fire({
            title: '¡Felicidades!',
            text: `${amigoSorteado} ha ganado el juego con ${limiteDeVictorias} victorias.`,
            icon: 'success',
            confirmButtonText: '¡Genial!'
        }).then(() => {
            // Reiniciar el juego después de que el usuario cierre la alerta
            NuevoJuego();
        });
    
    }

}
}
function NuevoJuego(){
    //limpia la lista
    limpiarLista();
    //limpiamos el resultado del juego
    const resultadoElemento = document.getElementById('resultado');
    resultadoElemento.innerHTML = "";
    //limpiamos el array
    amigosIngresados = [];

    alert ("El juego a comenzado de Nuevo Añade nuevos Nombres");


}