const routes = require('express').Router();

const Customer = require('../../models/ps_customer');
const CustomerController = require('../../controllers/CustomerController');

routes.get('/Customer/:typeid/:id', async (req, res) => {
    cus = await CustomerController.findCustomerOnebyNumber(req.params.id);
    res.json(cus);
});

routes.get('/Customer/:id', async (req, res) => {
    cus = await CustomerController.findCustomerOneById(req.params.id);
    res.json(cus);
});


routes.get('/Customer/', async (req, res) => {
    cus = await CustomerController.findAllCustomer();
    res.json(cus);
});

routes.post('/Customer/', async (req, res) => {
    cus = await CustomerController.CreateCustomer(req.body);
    res.json(cus); 
});

routes.put('/Customer/:id', async (req, res) => {
    cus = await CustomerController.UpdateCustomer(req.body, req.params.id);
    res.json(cus); 
});

routes.delete('/Customer/:id', async (req, res) => {
    cus = await CustomerController.DeleteCustomer(req.params.id);
    res.json(cus); 
});

module.exports = routes;

