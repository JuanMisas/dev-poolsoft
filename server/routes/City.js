const routes = require('express').Router();

const City = require('../../models/ps_city');
const CityController = require('../../controllers/CityController');
const { verifyToken } = require('../../controllers/AuthController');

/**
 * ==== RETURN SI NO HAY ERROR ====
 * Objeto json de tipo City
 * { atributo1: value1, atributo2: value2 }
 * 
 * ==== RETURN SI HAY ERROR ====
 * Array con errores
 * [ 'mensaje_de_error_1', 'mensaje_de_error_2' ]
 */
routes.get('/City/:id', verifyToken, async(req, res) => {

    try {
        st = await CityController.findOneCity(req.params.id);
        res.send(st);
    } catch (err) {
        res.status(400).send(err);
    }

});


/**
 * ==== RETURN ====
 * Array de objetos json de tipo City
 * [ { atributo1: value1, atributo2: value2 }, { atributo1: value1, atributo2: value2 } ]
 */
routes.get('/City/', verifyToken, async(req, res) => {

    try {
        st = await CityController.findAllCities();
    } finally {
        res.send(st);
    }

});

routes.get('/CityAll/', verifyToken, async(req, res) => {
    try {
        st = await CityController.findAllCityStateCountry();
    } finally {
        res.send(st);
    }
});


/**
 * ==== RETURN SI NO HAY ERROR ====
 * Objeto json de tipo City
 * { atributo1: value1, atributo2: value2 }
 * 
 * ==== RETURN SI HAY ERROR ====
 * Array con errores
 * [ 'mensaje_de_error_1', 'mensaje_de_error_2' ]
 */
routes.post('/City/', verifyToken, async(req, res) => {

    try {
        st = await CityController.createCity(req.body);
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
routes.put('/City/:id', verifyToken, async(req, res) => {

    try {
        st = await CityController.updateCity(req.params.id, req.body);
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
routes.delete('/City/:id', verifyToken, async(req, res) => {

    try {
        st = await CityController.deleteCity(req.params.id);
        res.send(st);
    } catch (err) {
        res.status(400).send(err);
    }

});

module.exports = routes;