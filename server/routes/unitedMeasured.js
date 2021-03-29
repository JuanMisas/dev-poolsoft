const routes = require('express').Router();

const UnitedMeasured = require('../../models/ps_unitedmeasured');
const unitedMeasuredController = require('../../controllers/unitedMeasuredController');

routes.get('/UnitedMeasured/:id', async (req, res) => {
    pt = await unitedMeasuredController.findUnitedMeasuredById(req.params.id) ;
    res.json(pt);
});

routes.get('/UnitedMeasured/', async (req, res) => {
    pt = await unitedMeasuredController.findUnitedMeasured();
    res.json(pt);
});

routes.post('/UnitedMeasured/', async (req, res) => {
    pt = await unitedMeasuredController.createUnitedMeasured(req.body);
    res.json(pt); 
});

routes.put('/UnitedMeasured/:id', async (req, res) => {
    pt = await unitedMeasuredController.updateUnitedMeasured(req.body, req.params.id);
    res.json(pt); 
});

routes.delete('/UnitedMeasured/:id', async (req, res) => {
    pt = await unitedMeasuredController.deleteUnitedMeasured(req.params.id);
    res.json(pt); 
});

module.exports = routes;
