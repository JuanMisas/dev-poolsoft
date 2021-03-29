const routes = require('express').Router();

const ClientType = require('../../models/ps_clienttype');
const clientTypeController = require('../../controllers/clientTypeController');

// const app = require('express')
// app.use(express.json());
// const bodyParser = require('body-parser');
// const { check, validationResult } = require('express-validator');
// const urlEncodedParser = bodyParser.urlencoded({ extended: false })

routes.get('/ClientType/:id', async (req, res) => {
    pt = await clientTypeController.findClientTypeById(req.params.id) ;
    res.json(pt);
});

routes.get('/ClientType/', async (req, res) => {
    pt = await clientTypeController.findClientType();
    res.json(pt);
});

// routes.post('/ClientType/', urlEncodedParser, [
//     check('nameClientType', 'The name is required')
//         .exists()
// ], async (req, res) => {
//     const errors = validationResult(req)
//     if (!errors.isEmpty()) {
//         return res.status(422).jsonp(errors.array())
//     }
//     pt = await clientTypeController.createClientType(req.body);
//     res.json(pt); 
// });

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
