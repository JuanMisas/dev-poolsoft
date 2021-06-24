const routes = require('express').Router();

const Customer = require('../../models/ps_customer');
const CustomerController = require('../../controllers/CustomerController');
const { verifyToken } = require('../../controllers/AuthController');

/**
 * ==== RETURN SI NO HAY ERROR ====
 * Objeto json de tipo Customer
 * { atributo1: value1, atributo2: value2 }
 * 
 * ==== RETURN SI HAY ERROR ====
 * Array con errores
 * [ 'mensaje_de_error_1', 'mensaje_de_error_2' ]
 */
routes.get('/Customer/:id', verifyToken, async(req, res) => {

    try {
        st = await CustomerController.findOneCustomer(req.params.id);
        res.send(st);
    } catch (err) {
        res.status(400).send(err);
    }

});


/**
 * ==== RETURN ====
 * Array de objetos json de tipo Customer
 * [ { atributo1: value1, atributo2: value2 }, { atributo1: value1, atributo2: value2 } ]
 */
routes.get('/Customer/', verifyToken, async(req, res) => {

    try {
        st = await CustomerController.findAllCustomers();
    } finally {
        res.send(st);
    }

});


/**
 * ==== RETURN SI NO HAY ERROR ====
 * Objeto json de tipo Customer
 * { atributo1: value1, atributo2: value2 }
 * 
 * ==== RETURN SI HAY ERROR ====
 * Array con errores
 * [ 'mensaje_de_error_1', 'mensaje_de_error_2' ]
 */
routes.post('/Customer/', verifyToken, async(req, res) => {

    try {
        st = await CustomerController.createCustomer(req.body);
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
routes.put('/Customer/:id', verifyToken, async(req, res) => {

    try {
        st = await CustomerController.updateCustomer(req.params.id, req.body);
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
routes.delete('/Customer/:id', verifyToken, async(req, res) => {

    try {
        st = await CustomerController.deleteCustomer(req.params.id);
        res.send(st);
    } catch (err) {
        res.status(400).send(err);
    }

});

module.exports = routes;