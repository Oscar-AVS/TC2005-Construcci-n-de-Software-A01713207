
//Visualizar el DOM(Document Object Model) en la consola
//console.log(document);

const halo = document.getElementById("halo");

console.log(halo);

halo.onclick = () => {
    console.log("click en halo");
    halo.innerHTML = "<strong> Halo </strong>";
}
