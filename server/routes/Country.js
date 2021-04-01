const routes = require('express').Router();

const Contry = require('../../models/ps_country');
const CountryController = require('../../controllers/CountryController');

routes.get('/Country/:id', async (req, res) => {
    co = await CountryController.findCountryOne(req.params.id) ;
    res.json(co);
});

routes.get('/Country/', async (req, res) => {
    co = await CountryController.findAllCountry();
    res.json(co);
});

routes.post('/Country/', async (req, res) => {
    co = await CountryController.CreateCountry(req.body);
    res.json(co); 
});

routes.put('/Country/:id', async (req, res) => {
    co = await CountryController.UpdateCountry(req.body, req.params.id);
    res.json(co); 
});

routes.delete('/Country/:id', async (req, res) => {
    co = await CountryController.DeleteCountry(req.params.id);
    res.json(co); 
});

module.exports = routes;

