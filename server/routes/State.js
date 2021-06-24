const routes = require('express').Router();

const State = require('../../models/ps_state');
const StateController = require('../../controllers/stateController');
const { verifyToken } = require('../../controllers/AuthController');

/**
 * ==== RETURN SI NO HAY ERROR ====
 * Objeto json de tipo State
 * { atributo1: value1, atributo2: value2 }
 * 
 * ==== RETURN SI HAY ERROR ====
 * Array con errores
 * [ 'mensaje_de_error_1', 'mensaje_de_error_2' ]
 */
routes.get('/State/:id', verifyToken, async(req, res) => {

    try {
        st = await StateController.findOneState(req.params.id);
        res.send(st);
    } catch (err) {
        res.status(400).send(err);
    }

});


/**
 * ==== RETURN ====
 * Array de objetos json de tipo State
 * [ { atributo1: value1, atributo2: value2 }, { atributo1: value1, atributo2: value2 } ]
 */
routes.get('/State/', verifyToken, async(req, res) => {

    try {
        st = await StateController.findAllStates();
    } finally {
        res.send(st);
    }

});


routes.get('/AllStateCountry/', verifyToken, async(req, res) => {

    try {
        st = await StateController.findAllStateCountry();
        res.send(st);
    } catch (err) {
        res.status(400).send(err);
    }

});


routes.get('/StateCountry/:id', verifyToken, async(req, res) => {

    try {
        st = await StateController.findStateCountry(req.params.id);
        res.send(st);
    } catch (err) {
        res.status(400).send(err);
    }

});



/**
 * ==== RETURN SI NO HAY ERROR ====
 * Objeto json de tipo State
 * { atributo1: value1, atributo2: value2 }
 * 
 * ==== RETURN SI HAY ERROR ====
 * Array con errores
 * [ 'mensaje_de_error_1', 'mensaje_de_error_2' ]
 */
routes.post('/State/', verifyToken, async(req, res) => {

    try {
        st = await StateController.createState(req.body);
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
routes.put('/State/:id', verifyToken, async(req, res) => {

    try {
        st = await StateController.updateState(req.params.id, req.body);
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
routes.delete('/State/:id', verifyToken, async(req, res) => {

    try {
        st = await StateController.deleteState(req.params.id);
        res.send(st);
    } catch (err) {
        res.status(400).send(err);
    }

});

module.exports = routes;