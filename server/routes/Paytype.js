const routes = require('express').Router();

const PayType = require('../../models/ps_paytype');
const PayTypeController = require('../../controllers/PayTypeController');

routes.get('/PayType/:id', async (req, res) => {
    pt = await PayTypeController.findPayTypeOne(req.params.id) ;
    res.json(pt);
});

routes.get('/PayType/', async (req, res) => {
    pt = await PayTypeController.findAllPayType();
    res.json(pt);
});

routes.post('/Paytype/', async (req, res) => {
    pt = await PayTypeController.CreatePayType(req.body);
    res.json(pt); 
});

routes.put('/Paytype/:id', async (req, res) => {
    pt = await PayTypeController.UpdatePayType(req.body, req.params.id);
    res.json(pt); 
});

routes.delete('/Paytype/:id', async (req, res) => {
    pt = await PayTypeController.DeletePayType(req.params.id);
    res.json(pt); 
});

module.exports = routes;

