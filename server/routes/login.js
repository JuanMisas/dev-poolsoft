const express = require('express');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const PassportLocal = require('passport-local').Strategy;
const path = require('path');
const app = express();
const userController = require('../../controllers/userController');
const User = require('../../models/ps_user');

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('mi ultra hiper secreto'));
app.use(session({
    secret: 'mi ultra hiper secreto',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.set('view engine', 'ejs');

/* Autentica si el usuario ingresado en el login en válido */
passport.use(new PassportLocal(async function(username, password, done){
    response = await userController.findUser(username, password);
    console.log(response, 'epaaaa');
    if(response != null) {
        
        return done(null,{ id: response.idUser, name: response.NameUser });
    }else{
        done(null, false);
    }
}));

/* Serialización del usuario autenticado */
passport.serializeUser(function(user,done){
    done(null,user.id);
});

/* Deserialización del usuario autenticado */
passport.deserializeUser(function(id,done){
    user = User.findByPk(id);
    done(null, {id: user.idUser, name: user.NameUser });
});

/* Redireccionamiento desde "/" */
app.get("/",(req,res,next)=>{
    // Si no hemos iniciado sesión redireccionar a /login
    if(req.isAuthenticated()) return next();
    res.redirect("/login");
},(req,res)=>{
    // Si ya iniciamos mostrar bienvenida
    res.render("pages/index");
});

/* Redireccionamiento al login */
app.get("/login",(req,res)=>{
    res.render("pages/login/login");
});

/* Redireccionamiento desde el formulario del login */
app.post("/login", passport.authenticate('local', {
    successRedirect: "/",
    failureRedirect: "/login"
}));

/* Redireccionamiento a recuperar la contraseña */
app.get("/recover",(req,res)=>{
    res.render("pages/login/recover");
});

app.get("/test",(req,res)=>{
    userController.updateUser(1, 'momo', 'momo123', 1);
    res.render("pages/login/recover");
});

module.exports = app;   