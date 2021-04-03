const routes = require('express').Router();

const ClientType = require('../../models/ps_clienttype');
const clientTypeController = require('../../controllers/clientTypeController');

routes.get('/ClientType/:id', async (req, res) => {
    pt = await clientTypeController.findClientTypeById(req.params.id) ;
    res.json(pt);
});

routes.get('/ClientType/', async (req, res) => {
    pt = await clientTypeController.findAllClientType();
    res.json(pt);
});

routes.post('/ClientType/', async (req, res) => {
    pt = await clientTypeController.createClientType(req.body);
    res.json(pt); 
});

routes.put('/ClientType/:id', async (req, res) => {
    pt = await clientTypeController.updateClientType(req.body, req.params.id);
    res.json(pt); 
});

routes.delete('/ClientType/:id', async (req, res) => {
    pt = await clientTypeController.deleteClientType(req.params.id);
    res.json(pt); 
});

module.exports = routes;
