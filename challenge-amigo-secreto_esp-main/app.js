// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.

let amigosIngresados =[];

function ingresarAmigos(){
    console.log(amigosIngresados);
    let textoIngresado = document.getElementById ('amigo');
        if(textoIngresado.value.trim() !== ''){
            amigosIngresados.push(textoIngresado.value.trim());
            textoIngresado.value = "";
            agregarLista();
            console.log("amigo agregado",amigosIngresados);
        }else{
            alert("Por favor, inserte un nombre");
        }

}

function agregarLista(){
    let amigosLista = document.getElementById ('listaAmigos');
    amigosLista.innerHTML = "";

    // Recorrer el arreglo y crear elementos <li>
    for (let i = 0; i < amigosIngresados.length; i++) {
        const amigo = amigosIngresados[i];

        // Crear un elemento <li>
        const li = document.createElement("li");

        // Añadir el nombre del amigo como texto del <li>
        li.textContent = amigo;

        // Agregar el <li> al contenedor <ul>
        listaAmigos.appendChild(li);
    }  

}
//funcion limpiar
function limpiarLista() {
    document.querySelector('#listaAmigos').innerHTML = "";
    amigosIngresados = [];
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
    return;
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