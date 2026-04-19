// Lab 24 - A01713207 Oscar Alexander Vilchis Soto
// util/can-view.js
module.exports = (request, response, next) => {
    let continuar = true;
    for (let privilegio of request.session.privilegios) {
        if (privilegio.privilegio == 'ver_cartelera') {
            next();
            continuar = false;
            break;
        }
    }
    if (continuar) {
        request.session.error = "No tienes privilegios para este recurso, el incidente ha sido reportado.";
        return response.redirect('/users/login');
    }
}