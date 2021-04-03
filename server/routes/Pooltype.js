const routes = require('express').Router();

const PoolType = require('../../models/ps_pooltype');
const PoolTypeController = require('../../controllers/poolTypeController');

routes.get('/PoolType/:id', async (req, res) => {
    pt = await PoolTypeController.findPoolTypeOne(req.params.id) ;
    res.json(pt);
});

routes.get('/PoolType/', async (req, res) => {
    pt = await PoolTypeController.findAllPoolType();
    res.json(pt);
});

routes.post('/Pooltype/', async (req, res) => {
    pt = await PoolTypeController.CreatePoolType(req.body);
    res.json(pt); 
});

routes.put('/Pooltype/:id', async (req, res) => {
    pt = await PoolTypeController.UpdatePoolType(req.body, req.params.id);
    res.json(pt); 
});

routes.delete('/Pooltype/:id', async (req, res) => {
    pt = await PoolTypeController.DeletePoolType(req.params.id);
    res.json(pt); 
});

module.exports = routes;

