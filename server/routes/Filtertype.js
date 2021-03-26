const routes = require('express').Router();

const FilterType = require('../../models/ps_filtertype');
const FilterTypeController = require('../../controllers/FilterTypeController');

routes.get('/FilterType/:id', async (req, res) => {
    ft = await FilterTypeController.findFilterTypeOne(req.params.id) ;
    res.json(ft);
});

routes.get('/FilterType/', async (req, res) => {
    ft = await FilterTypeController.findAllFilterType();
    res.json(ft);
});

routes.post('/Filtertype/', async (req, res) => {
    ft = await FilterTypeController.CreateFilterType(req.body);
    res.json(ft); 
});

routes.put('/Filtertype/:id', async (req, res) => {
    ft = await FilterTypeController.UpdateFilterType(req.body, req.params.id);
    res.json(ft); 
});

routes.delete('/Filtertype/:id', async (req, res) => {
    ft = await FilterTypeController.DeleteFilterType(req.params.id);
    res.json(ft); 
});

module.exports = routes;

