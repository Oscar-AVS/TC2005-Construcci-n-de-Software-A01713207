// Intro a JavaScript, ejercicio hecho en clase con Lalo :D
// consola (log, info, warn, error, assert)
console.log("Hola mundo");
console.info("Esto es una información");
console.warn("Esto es una advertencia");
console.error("Esto es un error");
//Compara valores
console.assert(1 == true);

//Compara valor y tipo de dato
console.assert(1 === true);

//-------------- variables, constantes -------------

// Forma antigua de declarar variables, no se recomienda
var videojuego_1 = "Minecraft";

// Forma moderna de declarar variables:
let videojuego_2 = "Halo";

//Constantes:
const precio = 55;


// Alcance de las variables
{
    var minecraft = "5 estrellas";
    let halo = "4 estrellas";
}

//la variable manicraft sigue viviendo fuera del ámbito en el que fue declarada
console.log(minecraft);

//la línea lanza un error porque la variable halo, murió al terminar el ámbito en el que fue declarada
//console.log(halo);


//---------------------------------- alert, prompt, confirm
alert("Hola gamers!");

const favorito = prompt("¿Cuál es tu videojuego favorito?");

console.log("Tu juego favortio es: " + favorito);

const ganas_jugar = confirm("¿Tienes ganas de jugar?");

if (ganas_jugar) {
    console.log("¡A jugar!");
} else {
    console.log("¡A comer!");
}



// funciones tradicionales 
function is_precio () {
    return precio; 
}

console.log(is_precio());

//funciones modernas 
() => {}

() => {
    console.log ("Te quedan 3 vidas");
}

vidas ();

//------------------- arreglos 
const videojuegos = ["Minecraft"];
const jugadores  = new Array();
