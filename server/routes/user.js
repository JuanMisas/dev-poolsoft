const routes = require('express').Router();
const UserController = require('../../controllers/userController');
const User = require('../../models/ps_user');


/**
 * ==== RETURN SI NO HAY ERROR ====
 * Objeto json de tipo User
 * { atributo1: value1, atributo2: value2 }
 * 
 * ==== RETURN SI HAY ERROR ====
 * Array con errores
 * [ 'mensaje_de_error_1', 'mensaje_de_error_2' ]
 */
routes.get('/User/:id', async(req, res) => {

    try {
        st = await UserController.findUserById(req.params.id);
        res.send(st);
    } catch (err) {
        res.status(400).send(err);
    }
});


/**
 * ==== RETURN ====
 * Array de objetos json de tipo User
 * [ { atributo1: value1, atributo2: value2 }, { atributo1: value1, atributo2: value2 } ]
 */
routes.get('/User/', async(req, res) => {

    try {
        st = await UserController.findAllUser();
    } finally {
        res.send(st);
    }

});


/**
 * ==== RETURN SI NO HAY ERROR ====
 * Objeto json de tipo User
 * { atributo1: value1, atributo2: value2 }
 * 
 * ==== RETURN SI HAY ERROR ====
 * Array con errores
 * [ 'mensaje_de_error_1', 'mensaje_de_error_2' ]
 */
routes.post('/User/', async(req, res) => {

    try {
        st = await UserController.createUser(req.body);
        res.send(st);
    } catch (err) {
        res.status(400).send(err);
    }

});


/**
 * ==== RETURN SI NO HAY ERROR ====
 * Variable boolean true
 * 
 * ==== RETURN SI HAY ERROR ====
 * Array con errores
 * [ 'mensaje_de_error_1', 'mensaje_de_error_2' ]
 */
routes.put('/User/:id', async(req, res) => {

    try {
        st = await UserController.updateUser(req.params.id, req.body);
        res.send(st);
    } catch (err) {
        res.status(400).send(err);
    }

});


/**
 * ==== RETURN SI NO HAY ERROR ====
 * Variable boolean true
 * 
 * ==== RETURN SI HAY ERROR ====
 * Array con errores
 * [ 'mensaje_de_error_1', 'mensaje_de_error_2' ]
 */
routes.delete('/User/:id', async(req, res) => {

    try {
        st = await UserController.deleteUser(req.params.id);
        res.send(st);
    } catch (err) {
        res.status(400).send(err);
    }

});

module.exports = routes;