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

console.log(minecraft); // Funciona, var tiene alcance global
console.log(halo); // Error, let tiene alcance de bloque
