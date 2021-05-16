const routes = require('express').Router();

const MoneyType = require('../../models/ps_moneytype');
const MoneyTypeController = require('../../controllers/MoneyTypeController');

/**
 * ==== RETURN SI NO HAY ERROR ====
 * Objeto json de tipo MoneyType
 * { atributo1: value1, atributo2: value2 }
 * 
 * ==== RETURN SI HAY ERROR ====
 * Array con errores
 * [ 'mensaje_de_error_1', 'mensaje_de_error_2' ]
 */
routes.get('/MoneyType/:id', async(req, res) => {

    try {
        st = await MoneyTypeController.findOneMoneyType(req.params.id);
        res.send(st);
    } catch (err) {
        res.status(400).send(err);
    }

});


/**
 * ==== RETURN ====
 * Array de objetos json de tipo MoneyType
 * [ { atributo1: value1, atributo2: value2 }, { atributo1: value1, atributo2: value2 } ]
 */
routes.get('/MoneyType/', async(req, res) => {

    try {
        st = await MoneyTypeController.findAllMoneyTypes();
    } finally {
        res.send(st);
    }

});


/**
 * ==== RETURN SI NO HAY ERROR ====
 * Objeto json de tipo MoneyType
 * { atributo1: value1, atributo2: value2 }
 * 
 * ==== RETURN SI HAY ERROR ====
 * Array con errores
 * [ 'mensaje_de_error_1', 'mensaje_de_error_2' ]
 */
routes.post('/MoneyType/', async(req, res) => {

    try {
        st = await MoneyTypeController.createMoneyType(req.body);
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
routes.put('/MoneyType/:id', async(req, res) => {

    try {
        st = await MoneyTypeController.updateMoneyType(req.params.id, req.body);
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
routes.delete('/MoneyType/:id', async(req, res) => {

    try {
        st = await MoneyTypeController.deleteMoneyType(req.params.id);
        res.send(st);
    } catch (err) {
        res.status(400).send(err);
    }

});

module.exports = routes;