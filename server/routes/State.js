const routes = require('express').Router();

const State = require('../../models/ps_state');
const StateController = require('../../controllers/stateController');

routes.get('/State/:id', async (req, res) => {
    st = await StateController.findStateOne(req.params.id) ;
    res.json(st);
});

routes.get('/State/', async (req, res) => {
    st = await StateController.findAllState();
    res.json(st);
});

routes.post('/State/', async (req, res) => {
    st = await StateController.CreateState(req.body);
    res.json(st); 
});

routes.put('/State/:id', async (req, res) => {
    st = await StateController.UpdateState(req.body, req.params.id);
    res.json(st); 
});

routes.delete('/State/:id', async (req, res) => {
    st = await StateController.DeleteState(req.params.id);
    res.json(st); 
});

module.exports = routes;

