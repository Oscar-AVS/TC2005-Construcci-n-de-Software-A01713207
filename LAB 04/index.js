// Laboratorio 04 JavaScript - Oscar Alexander Vilchis Soto
// Archivo JavaScript para resolver los ejercicios del laboratorio 04,
// así como también el ejercicio extra de mi elección (calculadora de progreso en el gimnasio.

/* ========== 1 ========== */
function ej1(){
  const n = Number(prompt("Ingresa un número "));
  if(!Number.isInteger(n) || n<=0){
    alert("Entrada inválida");
    return;
  }

  document.write("<h2>Tabla del 1 al "+n+"</h2>");
  document.write("<table><tr><th>n</th><th>n²</th><th>n³</th></tr>");

  for(let i=1;i<=n;i++){
    document.write("<tr>");
    document.write("<td>"+i+"</td>");
    document.write("<td>"+(i*i)+"</td>");
    document.write("<td>"+(i*i*i)+"</td>");
    document.write("</tr>");

  }

  document.write("</table>");
      document.write('<br><button onclick="window.location.reload()">Volver al inicio</button>')

}

/* ========== 2 ========== */
function ej2(){
  const a = Math.floor(Math.random()*100);
  const b = Math.floor(Math.random()*100);

  const inicio = new Date();
  const respuesta = Number(prompt(`¿Cuánto es ${a} + ${b}?`));
  const fin = new Date();

  const correcto = respuesta === (a+b);
  const tiempo = ((fin - inicio)/1000).toFixed(2);

  document.getElementById("out2").innerHTML =
    `Resultado correcto: ${a+b}<br>
     Tu respuesta: ${respuesta}<br>
     Estado: ${correcto ? "Correcto " : "Incorrecto "}<br>
     Tiempo: ${tiempo} segundos`;
}

/* ========== 3 ========== */
function contador(arr){
  let negativos=0, ceros=0, positivos=0;

  for(let i=0;i<arr.length;i++){
    if(arr[i]<0) negativos++;
    else if(arr[i]===0) ceros++;
    else positivos++;
  }

  return {negativos, ceros, positivos};
}

function demo3(){
  console.assert(JSON.stringify(contador([-1,0,2])) === JSON.stringify({negativos:1,ceros:1,positivos:1}), "Error en prueba");

  const datos = [-3,0,5,2,-1,0];
  document.getElementById("out3").textContent =
    "Arreglo: "+JSON.stringify(datos)+"\n"+
    "Resultado: "+JSON.stringify(contador(datos), null, 2);
}

/* ========== 4 ========== */
function promedios(matriz){
  const resultado = [];

  for(let i=0;i<matriz.length;i++){
    let suma=0;
    for(let j=0;j<matriz[i].length;j++){
      suma += matriz[i][j];
    }
    resultado.push(suma/matriz[i].length);
  }

  return resultado;
}

function demo4(){
  console.assert(JSON.stringify(promedios([[10,20],[5,5]])) === JSON.stringify([15,5]), "Error prueba");

  const m = [[10,20,30],[5,5],[2,4,6]];
  document.getElementById("out4").textContent =
    "Matriz: "+JSON.stringify(m)+"\n"+
    "Promedios: "+JSON.stringify(promedios(m));
}

/* ========== 5 ========== */
function inverso(numero){
  const signo = numero<0 ? -1 : 1;
  const invertido = String(Math.abs(numero)).split("").reverse().join("");
  return signo * Number(invertido);
}

function demo5(){
  console.assert(inverso(123)===321, "Error prueba");
  console.assert(inverso(-45)===-54, "Error prueba");

  document.getElementById("out5").textContent =
    "inverso(120340) = "+inverso(120340)+"\n"+
    "inverso(-507) = "+inverso(-507);
}

/* ========== 6 ========== */

function Ejercicio(peso, repeticiones){
  this.peso = peso;
  this.repeticiones = repeticiones;

  // Método 1- calcular 1RM ( repetición máxima) usando una fórmula 1RM=peso×(1+repeticiones/30)
  this.calcular1RM = function(){
    return this.peso * (1 + this.repeticiones / 30);
  };

  // Método 2- comparar con sesión anterior
  this.compararCon = function(otroEjercicio){
    return this.calcular1RM() - otroEjercicio.calcular1RM();
  };
}

function demo6(){

  const pesoAnt = Number(document.getElementById("pesoAnt").value);
  const repsAnt = Number(document.getElementById("repsAnt").value);
  const pesoAct = Number(document.getElementById("pesoAct").value);
  const repsAct = Number(document.getElementById("repsAct").value);

  if(!pesoAnt || !repsAnt || !pesoAct || !repsAct){
    document.getElementById("out6").innerHTML = 
      "<p style='color:red'>Por favor llena todos los campos.</p>";
    return;
  }

  const anterior = new Ejercicio(pesoAnt, repsAnt);
  const actual = new Ejercicio(pesoAct, repsAct);

  // Comparar resultados
  const rmAnterior = anterior.calcular1RM();
  const rmActual = actual.calcular1RM();
  const diferencia = actual.compararCon(anterior);

  let mensaje;

  if(diferencia > 0){
    mensaje = " Congrats, has mejorado  tu fuerza";
  } 
  else if(diferencia < 0){
    mensaje = "Ojito... Bajaste tu rendimiento";
  } 
  else{
    mensaje = "Hay que entrenar más para mejorar tu fuerza.";
  }

  document.getElementById("out6").innerHTML =
    `<h3>Resultados:</h3>
     <p>1RM anterior: ${rmAnterior.toFixed(2)} kg</p>
     <p>1RM actual: ${rmActual.toFixed(2)} kg</p>
     <p>Diferencia: ${diferencia.toFixed(2)} kg</p>
     <h4>${mensaje}</h4>`;
}

