const routes = require('express').Router();

const MoneyType = require('../../models/ps_moneytype');
const MoneyTypeController = require('../../controllers/MoneyTypeController');

routes.get('/MoneyType/:id', async (req, res) => {
    mt = await MoneyTypeController.findMoneyTypeOne(req.params.id) ;
    res.json(mt);
});

routes.get('/MoneyType/', async (req, res) => {
    mt = await MoneyTypeController.findAllMoneyType();
    res.json(mt);
});

routes.post('/MoneyType/', async (req, res) => {
    mt = await MoneyTypeController.CreateMoneyType(req.body);
    res.json(mt); 
});

routes.put('/MoneyType/:id', async (req, res) => {
    mt = await MoneyTypeController.UpdateMoneyType(req.body, req.params.id);
    res.json(mt); 
});

routes.delete('/MoneyType/:id', async (req, res) => {
    mt = await MoneyTypeController.DeleteMoneyType(req.params.id);
    res.json(mt); 
});

module.exports = routes;

