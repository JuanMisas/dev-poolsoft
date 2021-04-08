const routes = require('express').Router();

const PoolCustomer = require('../../models/ps_poolcustomers');
const PoolCustomerController = require('../../controllers/poolCustomerController');

routes.get('/PoolCustomer/:id', async (req, res) => {
    pt = await PoolCustomerController.findPoolCustomerOne(req.params.id) ;
    res.json(pt);
});

routes.get('/PoolCustomer/', async (req, res) => {
    pt = await PoolCustomerController.findAllPoolCustomer();
    res.json(pt);
});

routes.post('/PoolCustomer/', async (req, res) => {
    pt = await PoolCustomerController.CreatePoolCustomer(req.body);
    res.json(pt); 
});

routes.put('/PoolCustomer/:id', async (req, res) => {
    pt = await PoolCustomerController.UpdatePoolCustomer(req.body, req.params.id);
    res.json(pt); 
});

routes.delete('/PoolCustomer/:id', async (req, res) => {
    pt = await PoolCustomerController.DeletePoolCustomer(req.params.id);
    res.json(pt); 
});

module.exports = routes;

