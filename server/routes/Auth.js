// const express = require('express');
// const passport = require('passport');
// const cookieParser = require('cookie-parser');
// const session = require('express-session');
// const PassportLocal = require('passport-local').Strategy;
// const path = require('path');
// const app = express();
// const userController = require('../../controllers/UserController');
// const User = require('../../models/ps_user');
// const bcrypt = require('bcryptjs');
// const { check, validationResult } = require('express-validator');

// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser('mi ultra hiper secreto'));
// app.use(session({
//     secret: 'mi ultra hiper secreto',
//     resave: true,
//     saveUninitialized: true
// }));
// app.use(passport.initialize());
// app.use(passport.session());
// app.set('view engine', 'ejs');

// /* Autentica si el usuario ingresado en el login en válido */
// passport.use(new PassportLocal(async function(username, password, done) {
//     response = await userController.findUser(username, password);
//     if (response != null) {
//         return done(null, { id: response.idUser, name: response.NameUser });
//     } else {
//         done(null, false);
//     }
// }));

// /* Serialización del usuario autenticado */
// passport.serializeUser(function(user, done) {
//     done(null, user.id);
// });

// /* Deserialización del usuario autenticado */
// passport.deserializeUser(function(id, done) {
//     user = User.findByPk(id);
//     done(null, { id: user.idUser, name: user.NameUser });
// });

// /* Redireccionamiento desde "/" */
// app.get("/", (req, res, next) => {
//     // Si no hemos iniciado sesión redireccionar a /login
//     if (req.isAuthenticated()) return next();
//     res.redirect("/login");
// }, (req, res) => {
//     // Si ya iniciamos mostrar bienvenida
//     res.render("pages/index");
// });

// /* Redireccionamiento al login */
// app.get("/login", (req, res) => {
//     res.render("pages/login/login");
// });

// /* Redireccionamiento desde el formulario del login */
// app.post("/login", passport.authenticate('local', {
//     successRedirect: "/",
//     failureRedirect: "/login"
// }));

// /* Redireccionamiento a recuperar la contraseña */
// app.get("/recover", (req, res) => {
//     res.render("pages/login/recover");
// });

// app.post("/register", [
//     check('username', 'El username es obligatorio').not().isEmpty(),
//     check('password', 'El password es obligatorio').not().isEmpty()
// ], async(req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(422).json({ errores: errors.array() })
//     }
//     req.body.password = bcrypt.hashSync(req.body.password, 10);
//     await userController.createUser(req.body.username, req.body.password, req.body.role);
// });

// /* Método para testear. NO BORRAR */
// app.get("/test", (req, res) => {
//     userController.deleteUser(124);
//     res.render("pages/login/recover");
// });

// module.exports = app;


const routes = require('express').Router();

const USER = require('../../models/ps_user');
const AuthController = require('../../controllers/AuthController');

/**
 * ==== RETURN SI NO HAY ERROR ====
 * Objeto json de tipo City
 * { atributo1: value1, atributo2: value2 }
 * 
 * ==== RETURN SI HAY ERROR ====
 * Array con errores
 * [ 'mensaje_de_error_1', 'mensaje_de_error_2' ]
 */
routes.post('/Login/', async(req, res) => {

    try {
        st = await AuthController.login(req.body);
        res.json({ token: st });
    } catch (err) {
        res.status(400).send(err);
    }

});

module.exports = routes;