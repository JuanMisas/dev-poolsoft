const routes = require('express').Router();

const Role = require('../../models/ps_role');
const roleController = require('../../controllers/roleController');

routes.get('/Role/:id', async (req, res) => {
    pt = await roleController.findRoleById(req.params.id) ;
    res.json(pt);
});

routes.get('/Role/', async (req, res) => {
    pt = await roleController.findRole();
    res.json(pt);
});

routes.post('/Role/', async (req, res) => {
    pt = await roleController.createRole(req.body);
    res.json(pt); 
});

routes.put('/Role/:id', async (req, res) => {
    pt = await roleController.updateRole(req.body, req.params.id);
    res.json(pt); 
});

routes.delete('/Role/:id', async (req, res) => {
    pt = await roleController.deleteRole(req.params.id);
    res.json(pt); 
});

module.exports = routes;
