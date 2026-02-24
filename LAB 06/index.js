// ===== DOM: agarrar elementos por ID (PPT: getElementById) =====
const form = document.getElementById("pwForm");
const pw1 = document.getElementById("pw1");
const pw2 = document.getElementById("pw2");

const msg = document.getElementById("msg");
const helpBox = document.getElementById("helpBox");
const title = document.getElementById("mainPageTitle");
const dot = document.getElementById("dot");

// reglas
const rLen = document.getElementById("rLen");
const rUpper = document.getElementById("rUpper");
const rDigit = document.getElementById("rDigit");
const rMatch = document.getElementById("rMatch");

// ===== Helpers visuales =====
function setRule(li, ok) {
  li.classList.remove("ok", "bad");
  li.classList.add(ok ? "ok" : "bad");
}

function setMsg(text, type) {
  // type: "ok" | "bad" | "info"
  msg.classList.remove("is-success", "is-danger", "is-info");
  msg.classList.add(type === "ok" ? "is-success" : type === "bad" ? "is-danger" : "is-info");
  msg.textContent = text;

  // visibility (lo mostramos cuando haya interacción)
  msg.classList.remove("hiddenMsg");
}

// ===== Validación básica (simple pero funcional) =====
function checks() {
  const a = pw1.value;
  const b = pw2.value;

  const len = a.length >= 8;
  const upper = /[A-Z]/.test(a);
  const digit = /[0-9]/.test(a);
  const match = a.length > 0 && a === b;

  return { len, upper, digit, match, a, b };
}

// ===== Render en vivo (se llama con evento input) =====
function validateLive() {
  const c = checks();

  setRule(rLen, c.len);
  setRule(rUpper, c.upper);
  setRule(rDigit, c.digit);
  setRule(rMatch, c.match);

  // status dot: gris/rojo/verde (usando DOM style)
  if (c.a.length === 0 && c.b.length === 0) {
    dot.style.background = "#666";
    setMsg("Estado: esperando input…", "info");
    return;
  }

  const baseOk = c.len && c.upper && c.digit;

  if (!baseOk) {
    dot.style.background = "#ef4444";
    setMsg("Tu password aún no cumple las reglas base.", "bad");
  } else if (!c.match) {
    dot.style.background = "#ef4444";
    setMsg("Va bien, pero falta que coincida con confirmación.", "bad");
  } else {
    dot.style.background = "#22c55e";
    setMsg("✅ Password fuerte y confirmado.", "ok");
  }
}

// ===== Submit (evento submit, POE) =====
function onSubmit(e) {
  e.preventDefault(); // validación antes de “enviar” (buena práctica)

  validateLive();
  const c = checks();
  const allOk = c.len && c.upper && c.digit && c.match;

  if (allOk) {
    setMsg("✅ Listo: podrías enviar esto al servidor.", "ok");

    // opcional setTimeout: esconder mensaje después
    setTimeout(() => {
      msg.classList.add("hiddenMsg"); // visibility hidden
    }, 2500);
  } else {
    setMsg("🚫 No se puede enviar: revisa reglas y confirmación.", "bad");
  }
}

// ===== Ayuda dinámica (focus/blur) =====
function showHelp(text) {
  helpBox.textContent = text;
  helpBox.style.visibility = "visible";
}

function hideHelp() {
  // dejamos un mensajito base
  helpBox.textContent = "Tip: Haz focus en un campo para ver ayuda.";
}

// ===== Cambiar estilo de letras sin click (mouseover/mouseout) =====
title.addEventListener("mouseover", () => {
  title.style.fontStyle = "italic"; // tutorial: fontStyle
  title.style.letterSpacing = "1px";
});

title.addEventListener("mouseout", () => {
  title.style.fontStyle = "normal";
  title.style.letterSpacing = "0px";
});

// ===== Registrar eventos (PPT: addEventListener) =====
pw1.addEventListener("input", validateLive);
pw2.addEventListener("input", validateLive);

pw1.addEventListener("focus", () => showHelp("Password: mínimo 8, 1 mayúscula y 1 número."));
pw1.addEventListener("blur", hideHelp);

pw2.addEventListener("focus", () => showHelp("Confirmación: debe coincidir EXACTO."));
pw2.addEventListener("blur", hideHelp);

form.addEventListener("submit", onSubmit);

// Inicio
validateLive();
