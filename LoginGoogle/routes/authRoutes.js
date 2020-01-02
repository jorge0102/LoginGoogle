const passport = require('passport');

//lo metemos todo dentro de una funcion flecha para poder exportarlo todo a la vez
module.exports = server => {

  // este get es la peticion de token
  server.get('/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  // este enrutado es donde te rederige una vez autentificado
  server.get('/auth/google/callback', passport.authenticate('google'));

  // Aqui nos redirige cuando estamos autenticados
  server.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });


  // Cerramos sesion
  server.get('/api/logout', (req, res) => {
    req.logout();
    res.send(req.user);
  })

};

