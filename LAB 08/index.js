// Oscar Alexander Vilchis Soto A01713207 - Lab 06: Validación de contraseñas
// Archivo JavaScript para el laboratorio 06. 
// Contiene la lógica de validación de contraseñas y manejo de eventos.

const formulario     = document.getElementById("pwForm");
const campoPw1       = document.getElementById("pw1");
const campoPw2       = document.getElementById("pw2");

const mensajeEstado  = document.getElementById("msg");
const tituloPrincipal = document.getElementById("mainPageTitle");

const indicadorPunto = document.getElementById("dot");
const textoEstado    = document.getElementById("statusText");

const ayudaPw1       = document.getElementById("helpPw1");
const ayudaPw2       = document.getElementById("helpPw2");

const barraFuerza    = document.getElementById("strengthBar");
const etiquetaFuerza = document.getElementById("strengthLabel");

const reglaLongitud  = document.getElementById("rLen");
const reglaMayuscula = document.getElementById("rUpper");
const reglaNumero    = document.getElementById("rDigit");
const reglaEspecial  = document.getElementById("rSpecial");
const reglaCoincidir = document.getElementById("rMatch");



function marcarRegla(elemento, cumple) {
  elemento.classList.toggle("ok", cumple);
  elemento.classList.toggle("bad", !cumple);
}

function mostrarMensaje(texto, tipo) {
  const clases = { ok: "is-success", bad: "is-danger", info: "is-info" };
  mensajeEstado.className = `message ${clases[tipo]}`;
  mensajeEstado.textContent = texto;
  mensajeEstado.classList.remove("hiddenMsg");
}

function actualizarPunto(color, texto) {
  indicadorPunto.style.background = color;
  textoEstado.textContent = texto;
}



function obtenerResultados() {
  const valor1 = campoPw1.value;
  const valor2 = campoPw2.value;

  return {
    longitud:   valor1.length >= 8,
    mayuscula:  /[A-Z]/.test(valor1),
    numero:     /[0-9]/.test(valor1),
    especial:   /[^A-Za-z0-9]/.test(valor1),
    coincide:   valor1.length > 0 && valor1 === valor2,
    pw1: valor1,
    pw2: valor2,
  };
}

function calcularFuerza(r) {
  let puntos = 0;
  if (r.longitud)        puntos += 35;
  if (r.mayuscula)       puntos += 20;
  if (r.numero)          puntos += 20;
  if (r.especial)        puntos += 15;
  if (r.pw1.length >= 12) puntos += 10;
  return Math.min(puntos, 100);
}

function etiquetaDeFuerza(puntos) {
  if (puntos === 0)  return { texto: "—",      clase: "is-dark" };
  if (puntos < 40)   return { texto: "Tu contraseña es débil :(",  clase: "is-danger" };
  if (puntos < 70)   return { texto: "Tu contraseña es moderada :/",  clase: "is-warning" };
  return              { texto: "Tu contraseña es fuerte :)", clase: "is-success" };
}



function validarEnVivo() {
  const r = obtenerResultados();

  marcarRegla(reglaLongitud,  r.longitud);
  marcarRegla(reglaMayuscula, r.mayuscula);
  marcarRegla(reglaNumero,    r.numero);
  marcarRegla(reglaEspecial,  r.especial);
  marcarRegla(reglaCoincidir, r.coincide);

  const fuerza = calcularFuerza(r);
  barraFuerza.value = fuerza;

  const { texto, clase } = etiquetaDeFuerza(fuerza);
  etiquetaFuerza.textContent = texto;
  etiquetaFuerza.className = `tag ${clase} is-small`;

  if (!r.pw1 && !r.pw2) {
    actualizarPunto("#9ca3af", "Esperando ingreso de contraseña ");
    mostrarMensaje("Estado: esperando ingreso de contraseña", "info");
    return;
  }

  const requisitoMinimo = r.longitud && r.mayuscula && r.numero;

  if (!requisitoMinimo) {
    actualizarPunto("#ef4444", "No cumple requisitos");
    mostrarMensaje("Tu contraseña aún no cumple los requisitos mínimos", "bad");
  } else if (!r.coincide) {
    actualizarPunto("#f59e0b", "Validación pendiente");
    mostrarMensaje("La contraseña tiene los requisitos necesarios", "info");
  } else {
    actualizarPunto("#22c55e", "Validada");
    mostrarMensaje("Contraseña ha sido validada ", "ok");
  }
}


function alEnviar(e) {
  e.preventDefault();
  validarEnVivo();

  const r = obtenerResultados();
  const todoOk = r.longitud && r.mayuscula && r.numero && r.coincide;

  if (todoOk) {
    mostrarMensaje("Contraseña validada - Coinciden ambas contraseñas", "ok");
    setTimeout(() => mensajeEstado.classList.add("hiddenMsg"), 2500);
  } else {
    mostrarMensaje("Contraseña no fue validada- Revisa Nuevamente ", "bad");
  }
}



function mostrarAyuda(el) { el.classList.remove("hiddenHelp"); }
function ocultarAyuda(el) { el.classList.add("hiddenHelp"); }



tituloPrincipal.addEventListener("mouseenter", () => tituloPrincipal.classList.add("titleGlow"));
tituloPrincipal.addEventListener("mouseleave", () => tituloPrincipal.classList.remove("titleGlow"));

document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "t") tituloPrincipal.classList.toggle("titleAltFont");
});


// ===== Registro de eventos =====

campoPw1.addEventListener("input", validarEnVivo);
campoPw2.addEventListener("input", validarEnVivo);

campoPw1.addEventListener("focus", () => mostrarAyuda(ayudaPw1));
campoPw1.addEventListener("blur",  () => ocultarAyuda(ayudaPw1));

campoPw2.addEventListener("focus", () => mostrarAyuda(ayudaPw2));
campoPw2.addEventListener("blur",  () => ocultarAyuda(ayudaPw2));

formulario.addEventListener("submit", alEnviar);

// Estado inicial
ocultarAyuda(ayudaPw1);
ocultarAyuda(ayudaPw2);
validarEnVivo();