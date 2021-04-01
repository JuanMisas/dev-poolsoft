const routes = require('express').Router();

const City = require('../../models/ps_city');
const CityController = require('../../controllers/CityController');

routes.get('/City/:id', async (req, res) => {
    st = await CityController.findCityOne(req.params.id) ;
    res.json(st);
});

routes.get('/City/', async (req, res) => {
    st = await CityController.findAllCity();
    res.json(st);
});

routes.post('/City/', async (req, res) => {
    st = await CityController.CreateCity(req.body);
    res.json(st); 
});

routes.put('/City/:id', async (req, res) => {
    st = await CityController.UpdateCity(req.body, req.params.id);
    res.json(st); 
});

routes.delete('/City/:id', async (req, res) => {
    st = await CityController.DeleteCity(req.params.id);
    res.json(st); 
});

module.exports = routes;

