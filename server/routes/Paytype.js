const routes = require('express').Router();

const PayType = require('../../models/ps_paytype');
const PayTypeController = require('../../controllers/PayTypeController');

routes.get('/PayType/:id', async (req, res) => {
    ft = await PayTypeController.findPayTypeOne(req.params.id) ;
    res.json(ft);
});

routes.get('/PayType/', async (req, res) => {
    ft = await PayTypeController.findAllPayType();
    res.json(ft);
});

routes.post('/Paytype/', async (req, res) => {
    ft = await PayTypeController.CreatePayType(req.body);
    res.json(ft); 
});

routes.put('/Paytype/:id', async (req, res) => {
    ft = await PayTypeController.UpdatePayType(req.body, req.params.id);
    res.json(ft); 
});

routes.delete('/Paytype/:id', async (req, res) => {
    ft = await PayTypeController.DeletePayType(req.params.id);
    res.json(ft); 
});

module.exports = routes;

