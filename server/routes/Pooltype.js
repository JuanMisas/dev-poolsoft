const routes = require('express').Router();

const PoolType = require('../../models/ps_pooltype');
const PoolTypeController = require('../../controllers/poolTypeController');
const { verifyToken } = require('../../controllers/AuthController');

/**
 * ==== RETURN SI NO HAY ERROR ====
 * Objeto json de tipo PoolType
 * { atributo1: value1, atributo2: value2 }
 * 
 * ==== RETURN SI HAY ERROR ====
 * Array con errores
 * [ 'mensaje_de_error_1', 'mensaje_de_error_2' ]
 */
routes.get('/PoolType/:id', verifyToken, async(req, res) => {

    try {
        st = await PoolTypeController.findOnePoolType(req.params.id);
        res.send(st);
    } catch (err) {
        res.status(400).send(err);
    }

});


/**
 * ==== RETURN ====
 * Array de objetos json de tipo PoolType
 * [ { atributo1: value1, atributo2: value2 }, { atributo1: value1, atributo2: value2 } ]
 */
routes.get('/PoolType/', verifyToken, async(req, res) => {

    try {
        st = await PoolTypeController.findAllPoolType();
    } finally {
        res.send(st);
    }

});


/**
 * ==== RETURN SI NO HAY ERROR ====
 * Objeto json de tipo PoolType
 * { atributo1: value1, atributo2: value2 }
 * 
 * ==== RETURN SI HAY ERROR ====
 * Array con errores
 * [ 'mensaje_de_error_1', 'mensaje_de_error_2' ]
 */
routes.post('/PoolType/', verifyToken, async(req, res) => {

    try {
        st = await PoolTypeController.createPoolType(req.body);
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
routes.put('/PoolType/:id', verifyToken, async(req, res) => {

    try {
        console.log(req.body)
        st = await PoolTypeController.updatePoolType(req.params.id, req.body);
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
routes.delete('/PoolType/:id', verifyToken, async(req, res) => {

    try {
        st = await PoolTypeController.deletePoolType(req.params.id);
        res.send(st);
    } catch (err) {
        res.status(400).send(err);
    }

});

module.exports = routes;