// Lab 19 - A01713207 Oscar Alexander Vilchis Soto
// util/is-auth.js
module.exports = (request, response, next) => {
    if (!request.session.isLoggedIn) {
        return response.redirect('/users/login');
    }
    next();
}