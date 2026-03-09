// Oscar Alexander Vilchi Soto - A01713207 
// Laboratorio 08: Introducción a Backend

const fs = require('fs');
const http = require('http');

// Ejercicio 1: función que devuelve el promedio de un arreglo
function arregloPromedio(arreglo) {
  if (arreglo.length === 0) return 0;

  let suma = 0;
  for (let i = 0; i < arreglo.length; i++) {
    suma += arreglo[i];
  }
  return suma / arreglo.length;
}

const numeros = [4, 5, 6, 7, 120, 4, 300, 8, 20, 50, 45];
console.log('Ejercicio 1: promedio de un arreglo');
console.log('Arreglo: [4, 5, 6, 7, 120, 4, 300, 8, 20, 50, 45]');
console.log(`Promedio: ${arregloPromedio(numeros)}`);

// Ejercicio 2: función que escribe un string en un archivo de texto haciendo uso del módulo fs
function escribirArchivo(texto) {
  fs.writeFileSync('salida.txt', texto);
  console.log('Ejercicio 2: texto escrito en salida.txt');
}

escribirArchivo('Este es un texto de prueba para el ejercicio de mi  laboratorio 08 :D');

// Ejercicio 3: how-many-positives y count, hechas en Racket para mi clase de progra de este semestre

function howManyPositives(lista) {
  let contador = 0;
  for (let i = 0; i < lista.length; i++) {
    if (lista[i] > 0) contador++;
  }
  return contador;
}

function count(numero, lista) {
  let contador = 0;
  for (let i = 0; i < lista.length; i++) {
    if (lista[i] === numero) contador++;
  }
  return contador;
}

console.log('Ejercicio 3: funciones de  mi clase de Progra con Racket pero ahora en JS ');
console.log ('1er ejercicio: La función how-many-positives recibe una lista lst como entrada. La lista regresa la cantidad de números positivos dentro de la lista.')
console.log ('2ndo ejercicio: La función count recibe como parámetro una lista lst y un número b. La función devuelve la cantidad de veces que b se encuentra dentro de lst.')
console.log(`howManyPositives([-1, 2, -3, 4, -5]) = ${howManyPositives([-1, 2, -3, 4, -5])}`);
console.log(`howManyPositives([]) = ${howManyPositives([])}`);
console.log(`howManyPositives([-1, -2, 3, -4, -5]) = ${howManyPositives([-1, -2, 3, -4, -5])}`);
console.log(`count(5, []) = ${count(5, [])}`);
console.log(`count(5, [1, 9, 7, 5, 4, 2]) = ${count(5, [1, 9, 7, 5, 4, 2])}`);
console.log(`count(5, [1, 5, 2, 3, 5]) = ${count(5, [1, 5, 2, 3, 5])}`);

// Ejercicio 4: servidor web que sirve una página HTML
const server = http.createServer((request, response) => {
  console.log(request.url);
  const html = fs.readFileSync('index.html', 'utf8');
  response.setHeader('Content-Type', 'text/html');
  response.write(html);
  response.end();
});

server.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});