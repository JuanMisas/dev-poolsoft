const routes = require('express').Router();
const Supplies = require('../../models/ps_supplies');
const SuppliesController = require('../../controllers/SuppliesController');


routes.get('/Supplies/:id', async (req, res) => {
    pt = await SuppliesController.findSupplyById(req.params.id) ;
    res.json(pt);
});

routes.get('/Supplies/', async (req, res) => {
    pt = await SuppliesController.findAllSupply();
    res.json(pt);
});

routes.post('/Supplies/', async (req, res) => {
    pt = await SuppliesController.createSupply(req.body);
    res.json(pt); 
});

routes.put('/Supplies/:id', async (req, res) => {
    pt = await SuppliesController.updateSupply(req.body, req.params.id);
    res.json(pt); 
});

routes.delete('/Supplies/:id', async (req, res) => {
    pt = await SuppliesController.deleteSupply(req.params.id);
    res.json(pt); 
});

module.exports = routes;
