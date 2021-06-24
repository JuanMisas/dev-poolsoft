const routes = require('express').Router();
const Supplies = require('../../models/ps_supplies');
const SuppliesController = require('../../controllers/SuppliesController');
const { verifyToken } = require('../../controllers/AuthController');


routes.get('/Supplies/:id', verifyToken, async(req, res) => {

    try {
        st = await SuppliesController.findSupplyById(req.params.id);
        res.send(st);
    } catch (err) {
        res.status(400).send(err);
    }

});

routes.get('/Supplies/', verifyToken, async(req, res) => {

    try {
        st = await SuppliesController.findAllSupply();
    } finally {
        res.send(st);
    }

});

routes.get('/SuppliesAll/', verifyToken, async(req, res) => {

    try {
        st = await SuppliesController.findAllSupliesUnd();
        res.send(st);
    } catch (err) {
        res.status(400).send(err);
    }

});

routes.post('/Supplies/', verifyToken, async(req, res) => {

    try {
        st = await SuppliesController.createSupply(req.body);
        res.send(st);
    } catch (err) {
        res.status(400).send(err);
    }

});

routes.put('/Supplies/:id', verifyToken, async(req, res) => {

    try {
        st = await SuppliesController.updateSupply(req.body, req.params.id);
        res.send(st);
    } catch (err) {
        res.status(400).send(err);
    }

});

routes.delete('/Supplies/:id', verifyToken, async(req, res) => {

    try {
        st = await SuppliesController.deleteSupply(req.params.id);
        res.send(st);
    } catch (err) {
        res.status(400).send(err);
    }

});

module.exports = routes;