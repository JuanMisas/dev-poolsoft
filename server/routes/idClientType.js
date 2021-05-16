const routes = require('express').Router();

const IdClientType = require('../../models/ps_idclienttype');
const IdClientTypeController = require('../../controllers/IdClientTypeController');

/**
 * ==== RETURN SI NO HAY ERROR ====
 * Objeto json de tipo IdClientType
 * { atributo1: value1, atributo2: value2 }
 * 
 * ==== RETURN SI HAY ERROR ====
 * Array con errores
 * [ 'mensaje_de_error_1', 'mensaje_de_error_2' ]
 */
routes.get('/IdClientType/:id', async(req, res) => {

    try {
        st = await IdClientTypeController.findOneIdClientType(req.params.id);
        res.send(st);
    } catch (err) {
        res.status(400).send(err);
    }

});


/**
 * ==== RETURN ====
 * Array de objetos json de tipo IdClientType
 * [ { atributo1: value1, atributo2: value2 }, { atributo1: value1, atributo2: value2 } ]
 */
routes.get('/IdClientType/', async(req, res) => {

    try {
        st = await IdClientTypeController.findAllIdClientTypes();
    } finally {
        res.send(st);
    }

});


/**
 * ==== RETURN SI NO HAY ERROR ====
 * Objeto json de tipo IdClientType
 * { atributo1: value1, atributo2: value2 }
 * 
 * ==== RETURN SI HAY ERROR ====
 * Array con errores
 * [ 'mensaje_de_error_1', 'mensaje_de_error_2' ]
 */
routes.post('/IdClientType/', async(req, res) => {

    try {
        st = await IdClientTypeController.createIdClientType(req.body);
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
routes.put('/IdClientType/:id', async(req, res) => {

    try {
        st = await IdClientTypeController.updateIdClientType(req.params.id, req.body);
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
routes.delete('/IdClientType/:id', async(req, res) => {

    try {
        st = await IdClientTypeController.deleteIdClientType(req.params.id);
        res.send(st);
    } catch (err) {
        res.status(400).send(err);
    }

});

module.exports = routes;