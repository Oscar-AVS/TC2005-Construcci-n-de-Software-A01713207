// Lab 14 - A01713207 Oscar Alexander Vilchis Soto
// controllers/users.controller.js

exports.get_login = (request, response, next) => {
    const cookieHeader = request.get('Cookie') || '';
    const match = cookieHeader.split(';').find(c => c.trim().startsWith('lastUser='));
    const lastUser = match ? match.trim().split('=')[1] : '';
    response.render('login', { title: 'Login', lastUser });
};

exports.post_login = (request, response, next) => {
    request.session.username = request.body.username;
    response.setHeader('Set-Cookie', `lastUser=${request.body.username}; HttpOnly`);
    response.redirect('/cartelera');
};

exports.get_logout = (request, response, next) => {
    request.session.destroy(() => {
        response.redirect('/users/login');
    });
};