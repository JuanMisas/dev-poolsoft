const routes = require('express').Router();

const PoolType = require('../../models/ps_pooltype');

const PoolTypeController = require('../../controllers/poolTypeController')

routes.get('/PoolType/:id', async (req, res) => {
   
    pt = await PoolTypeController.findPoolType(req.params.id) ;
    console.log(pt);
    res.json(pt);
});

module.exports = routes;

