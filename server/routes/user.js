const express = require('express');
const app = express();
const userController = require('../../controllers/userController');
var routes = express.Router();
var db = require('../connection.js')

routes.get('/User/:id', async (req, res) => {
    pt = await userController.findUserById(req.params.id) ;
    res.json(pt);
});

routes.get('/User/', async (req, res) => {
    pt = await userController.findAllUser();
    res.json(pt);
});

routes.post('/User/', async (req, res) => {
    pt = await userController.createUser(req.body);
    res.json(pt); 
});

routes.put('/User/:id', async (req, res) => {
    pt = await userController.updateUser(req.body, req.params.id);
    res.json(pt); 
});

routes.delete('/User/:id', async (req, res) => {
    pt = await userController.deleteUser(req.params.id);
    res.json(pt); 
});


module.exports = routes;