const routes = require('express').Router();

const UnitedMeasured = require('../../models/ps_unitedmeasured');
const UnitedMeasuredController = require('../../controllers/UnitedMeasuredController');

/**
 * ==== RETURN SI NO HAY ERROR ====
 * Objeto json de tipo UnitedMeasured
 * { atributo1: value1, atributo2: value2 }
 * 
 * ==== RETURN SI HAY ERROR ====
 * Array con errores
 * [ 'mensaje_de_error_1', 'mensaje_de_error_2' ]
 */
routes.get('/UnitedMeasured/:id', async(req, res) => {

    try {
        st = await UnitedMeasuredController.findUnitedMeasuredById(req.params.id);
        res.send(st);
    } catch (err) {
        res.status(400).send(err);
    }

});


/**
 * ==== RETURN ====
 * Array de objetos json de tipo UnitedMeasured
 * [ { atributo1: value1, atributo2: value2 }, { atributo1: value1, atributo2: value2 } ]
 */
routes.get('/UnitedMeasured/', async(req, res) => {

    try {
        st = await UnitedMeasuredController.findAllUnitedMeasured();
    } finally {
        res.send(st);
    }

});


/**
 * ==== RETURN SI NO HAY ERROR ====
 * Objeto json de tipo UnitedMeasured
 * { atributo1: value1, atributo2: value2 }
 * 
 * ==== RETURN SI HAY ERROR ====
 * Array con errores
 * [ 'mensaje_de_error_1', 'mensaje_de_error_2' ]
 */
routes.post('/UnitedMeasured/', async(req, res) => {

    try {
        st = await UnitedMeasuredController.createUnitedMeasured(req.body);
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
routes.put('/UnitedMeasured/:id', async(req, res) => {

    try {
        st = await UnitedMeasuredController.updateUnitedMeasured(req.params.id, req.body);
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
routes.delete('/UnitedMeasured/:id', async(req, res) => {

    try {
        st = await UnitedMeasuredController.deleteUnitedMeasured(req.params.id);
        res.send(st);
    } catch (err) {
        res.status(400).send(err);
    }

});

module.exports = routes;