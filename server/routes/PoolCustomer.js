const routes = require('express').Router();

const PoolCustomer = require('../../models/ps_poolcustomers');
const PoolCustomerController = require('../../controllers/poolCustomerController');

/**
 * ==== RETURN SI NO HAY ERROR ====
 * Objeto json de tipo PoolCustomer
 * { atributo1: value1, atributo2: value2 }
 * 
 * ==== RETURN SI HAY ERROR ====
 * Array con errores
 * [ 'mensaje_de_error_1', 'mensaje_de_error_2' ]
 */
routes.get('/PoolCustomer/:id', async(req, res) => {

    try {
        st = await PoolCustomerController.findOnePoolCustomer(req.params.id);
        res.send(st);
    } catch (err) {
        res.status(400).send(err);
    }

});


/**
 * ==== RETURN ====
 * Array de objetos json de tipo PoolCustomer
 * [ { atributo1: value1, atributo2: value2 }, { atributo1: value1, atributo2: value2 } ]
 */
routes.get('/PoolCustomer/', async(req, res) => {

    try {
        st = await PoolCustomerController.findAllPoolCustomers();
    } finally {
        res.send(st);
    }

});


/**
 * ==== RETURN SI NO HAY ERROR ====
 * Objeto json de tipo PoolCustomer
 * { atributo1: value1, atributo2: value2 }
 * 
 * ==== RETURN SI HAY ERROR ====
 * Array con errores
 * [ 'mensaje_de_error_1', 'mensaje_de_error_2' ]
 */
routes.post('/PoolCustomer/', async(req, res) => {

    try {
        st = await PoolCustomerController.createPoolCustomer(req.body);
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
routes.put('/PoolCustomer/:id', async(req, res) => {

    try {
        st = await PoolCustomerController.updatePoolCustomer(req.params.id, req.body);
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
routes.delete('/PoolCustomer/:id', async(req, res) => {

    try {
        st = await PoolCustomerController.deletePoolCustomer(req.params.id);
        res.send(st);
    } catch (err) {
        res.status(400).send(err);
    }

});

module.exports = routes;