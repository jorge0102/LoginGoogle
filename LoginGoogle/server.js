const express = require("express");
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const Keys = require('./config/keys');
const User = require('./models/User');
//no la declaramos como una constante porque como no lo vamos a utilizar en el codigo ,
//solo es una afirmacion para que se pueda utilizar
require('./services/passport');

// Siempre a tener encuenta en la barra del localhost donde apunta la coleccion 
mongoose.connect('mongodb://localhost:27017/users',
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, res) => {
        if (err) {
            throw err;
        }

        server.listen(5000, () => console.log("Conexion a la Base de Datos Correcta"))
    })

const server = express();

// Aqui indicamos cuando queremos que expire nuestra clave y que la codifique con el metodo que le pasamos
server.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, // Esto equivael a 30 dias ya que lo pasamos a milisegundos
        keys: [Keys.cookieKey]
    })
);

// Indicamos que use passport
server.use(passport.initialize());
server.use(passport.session()); 

require('./routes/authRoutes')(server);


