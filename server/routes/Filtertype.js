const routes = require('express').Router();

const FilterType = require('../../models/ps_filtertype');
const FilterTypeController = require('../../controllers/FilterTypeController');

/**
 * ==== RETURN SI NO HAY ERROR ====
 * Objeto json de tipo FilterType
 * { atributo1: value1, atributo2: value2 }
 * 
 * ==== RETURN SI HAY ERROR ====
 * Array con errores
 * [ 'mensaje_de_error_1', 'mensaje_de_error_2' ]
 */
routes.get('/FilterType/:id', async(req, res) => {

    try {
        st = await FilterTypeController.findOneFilterType(req.params.id);
        res.send(st);
    } catch (err) {
        res.status(400).send(err);
    }

});


/**
 * ==== RETURN ====
 * Array de objetos json de tipo FilterType
 * [ { atributo1: value1, atributo2: value2 }, { atributo1: value1, atributo2: value2 } ]
 */
routes.get('/FilterType/', async(req, res) => {

    try {
        st = await FilterTypeController.findAllFilterTypes();
    } finally {
        res.send(st);
    }

});


/**
 * ==== RETURN SI NO HAY ERROR ====
 * Objeto json de tipo FilterType
 * { atributo1: value1, atributo2: value2 }
 * 
 * ==== RETURN SI HAY ERROR ====
 * Array con errores
 * [ 'mensaje_de_error_1', 'mensaje_de_error_2' ]
 */
routes.post('/FilterType/', async(req, res) => {

    try {
        st = await FilterTypeController.createFilterType(req.body);
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
routes.put('/FilterType/:id', async(req, res) => {

    try {
        st = await FilterTypeController.updateFilterType(req.params.id, req.body);
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
routes.delete('/FilterType/:id', async(req, res) => {

    try {
        st = await FilterTypeController.deleteFilterType(req.params.id);
        res.send(st);
    } catch (err) {
        res.status(400).send(err);
    }

});

module.exports = routes;