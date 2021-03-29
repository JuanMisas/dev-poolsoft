const routes = require('express').Router();

const IdClientType = require('../../models/ps_idclienttype');
const idClientTypeController = require('../../controllers/idClientTypeController');

routes.get('/IdClientType/:id', async (req, res) => {
    pt = await idClientTypeController.findIdClientTypeById(req.params.id) ;
    res.json(pt);
});

routes.get('/IdClientType/', async (req, res) => {
    pt = await idClientTypeController.findIdClientType();
    res.json(pt);
});

routes.post('/IdClientType/', async (req, res) => {
    pt = await idClientTypeController.createIdClientType(req.body);
    res.json(pt); 
});

routes.put('/IdClientType/:id', async (req, res) => {
    pt = await idClientTypeController.updateIdClientType(req.body, req.params.id);
    res.json(pt); 
});

routes.delete('/IdClientType/:id', async (req, res) => {
    pt = await idClientTypeController.deleteIdClientType(req.params.id);
    res.json(pt); 
});

module.exports = routes;
