const routes = require('express').Router();

const Country = require('../../models/ps_country');
const CountryController = require('../../controllers/countryController');


/**
 * ==== RETURN SI NO HAY ERROR ====
 * Objeto json de tipo Country
 * { atributo1: value1, atributo2: value2 }
 * 
 * ==== RETURN SI HAY ERROR ====
 * Array con errores
 * [ 'mensaje_de_error_1', 'mensaje_de_error_2' ]
 */
routes.get('/Country/:id', async(req, res) => {

    try {
        st = await CountryController.findOneCountry(req.params.id);
        res.send(st);
    } catch (err) {
        res.status(400).send(err);
    }

});


/**
 * ==== RETURN ====
 * Array de objetos json de tipo Country
 * [ { atributo1: value1, atributo2: value2 }, { atributo1: value1, atributo2: value2 } ]
 */
routes.get('/Country/', async(req, res) => {

    try {
        st = await CountryController.findAllCountries();
    } finally {
        res.send(st);
    }

});


/**
 * ==== RETURN SI NO HAY ERROR ====
 * Objeto json de tipo Country
 * { atributo1: value1, atributo2: value2 }
 * 
 * ==== RETURN SI HAY ERROR ====
 * Array con errores
 * [ 'mensaje_de_error_1', 'mensaje_de_error_2' ]
 */
routes.post('/Country/', async(req, res) => {

    try {
        st = await CountryController.createCountry(req.body);
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
routes.put('/Country/:id', async(req, res) => {

    try {
        st = await CountryController.updateCountry(req.params.id, req.body);
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
routes.delete('/Country/:id', async(req, res) => {

    try {
        st = await CountryController.deleteCountry(req.params.id);
        res.send(st);
    } catch (err) {
        res.status(400).send(err);
    }

});

module.exports = routes;