const routes = require('express').Router();

const ClientType = require('../../models/ps_clienttype');
const ClientTypeController = require('../../controllers/ClientTypeController');

/**
 * ==== RETURN SI NO HAY ERROR ====
 * Objeto json de tipo ClientType
 * { atributo1: value1, atributo2: value2 }
 * 
 * ==== RETURN SI HAY ERROR ====
 * Array con errores
 * [ 'mensaje_de_error_1', 'mensaje_de_error_2' ]
 */
routes.get('/ClientType/:id', async(req, res) => {

    try {
        st = await ClientTypeController.findOneClientType(req.params.id);
        res.send(st);
    } catch (err) {
        res.status(400).send(err);
    }

});


/**
 * ==== RETURN ====
 * Array de objetos json de tipo ClientType
 * [ { atributo1: value1, atributo2: value2 }, { atributo1: value1, atributo2: value2 } ]
 */
routes.get('/ClientType/', async(req, res) => {

    try {
        st = await ClientTypeController.findAllClientTypes();
    } finally {
        res.send(st);
    }

});


/**
 * ==== RETURN SI NO HAY ERROR ====
 * Objeto json de tipo ClientType
 * { atributo1: value1, atributo2: value2 }
 * 
 * ==== RETURN SI HAY ERROR ====
 * Array con errores
 * [ 'mensaje_de_error_1', 'mensaje_de_error_2' ]
 */
routes.post('/ClientType/', async(req, res) => {

    try {
        st = await ClientTypeController.createClientType(req.body);
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
routes.put('/ClientType/:id', async(req, res) => {

    try {
        st = await ClientTypeController.updateClientType(req.params.id, req.body);
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
routes.delete('/ClientType/:id', async(req, res) => {

    try {
        st = await ClientTypeController.deleteClientType(req.params.id);
        res.send(st);
    } catch (err) {
        res.status(400).send(err);
    }

});

module.exports = routes;