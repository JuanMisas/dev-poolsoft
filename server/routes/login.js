const express = require('express');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const PassportLocal = require('passport-local').Strategy;
const path = require('path');
const app = express();

const userController = require('../../controllers/userController');


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

// LOGIN
passport.use(new PassportLocal(async function(username, password, done){
    response = await userController.findUser(username, password);
    if(response == true) {
        // console.log(response, 'asdfasdfasdf', 1232);
        return done(null,{ id: 1, name: "Cody" });
    }else{
        done(null, false);
    }
}));

// { id: 1, name: "Cody" }
// 1 => Serialización
passport.serializeUser(function(user,done){
    done(null,user.id);
});

// Deserialización
passport.deserializeUser(function(id,done){
    done(null, {id: 1, name: "Cody" });
});

app.get("/",(req,res,next)=>{
    // Si no hemos iniciado sesión redireccionar a /login
    if(req.isAuthenticated()) return next();
    res.redirect("/login");
},(req,res)=>{
    // Si ya iniciamos mostrar bienvenida
    res.render("pages/index");
});

app.get("/login",(req,res)=>{
    res.render("pages/login/login");
});

app.post("/login", passport.authenticate('local', {
    successRedirect: "/",
    failureRedirect: "/login"
}));

app.get("/recover",(req,res)=>{
    res.render("pages/login/recover");
});

module.exports = app;   