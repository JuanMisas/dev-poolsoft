const Sequelize = require('sequelize');
const CUSTOMER = require('../models/ps_customer');
const server = require('../server/server');
const { validate } = require('../server/connection');
const { INTEGER } = require('sequelize');
const PayTypeController = require('../controllers/PayTypeController');
const IdClientTypeController = require('./IdClientTypeController');
const ClientTypeController = require('./CustomerTypeController');
const CountryController = require('../controllers/CountryController');
const StateController = require('../controllers/StateController');
const CityController = require('../controllers/CityController');
const MoneyTypeController = require('../controllers/MoneyTypeController');


module.exports = {

    /**
     * Valida dependiendo del tipo: 'find_one', 'find_all', 'create', 'update', 'delete'.
     * Variables de entrada: tipo, id, body.
     * Retorna: un arreglo con los mensajes de error. Si no hay errores, retorna un arreglo vacío.
     */
    async validateCustomer(tipo, id, body) {

        err = [];

        if (tipo == 'find_one') {

            if (id == undefined) {
                err.push('El ID del cliente no puede ser nulo.');
            }
            if (!(await this.existsIdCustomer(id))) {
                err.push('El cliente no existe.');
            }
            return err;

        } else if (tipo == 'find_all') {

            return err;

        } else if (tipo == 'create') {

            if (body.idCustomer) {
                if (await this.existsIdCustomer(body.idCustomer)) {
                    err.push('El cliente ya existe.');
                }
            }
            console.log('punto 1')
            if (body.NameCustomer == null || body.NameCustomer == "") {
                err.push('El nombre no puede ser vacío.');
            }
            console.log('punto 2')
            if (body.TypePayCustomers == null || body.TypePayCustomers == "") {
                err.push('El ID del tipo de pago no puede ser vacío.');
            }
            console.log('punto 3')
            if (body.TypePayCustomers) {
                if (!(await PayTypeController.existsIdPayType(body.TypePayCustomers))) {
                    err.push('El tipo de pago no existe.');
                }
            }
            console.log('punto 4')
            if (body.IdNumberCustomers == null || body.IdNumberCustomers == "") {
                err.push('El número de clientes no puede ser vacío.');
            }
            console.log('punto 5')
            if (body.IdClientTypeCustomers == null || body.IdClientTypeCustomers == "") {
                err.push('El ID del tipo de cliente no puede ser vacío.');
            }
            console.log('punto 5')
            if (body.IdClientTypeCustomers) {
                if (!(await ClientTypeController.existsIdCustomerType(body.IdClientTypeCustomers))) {
                    err.push('El tipo de cliente no existe.');
                }
            }
            console.log('punto 6')
            if (body.StatusCustomers == null || body.StatusCustomers == "") {
                err.push('El status del cliente no puede ser vacío.');
            }
            console.log('punto 7')
            if (body.IdIdClientTypeCustomers == null || body.IdIdClientTypeCustomers == "") {
                err.push('El ID del tipo de identificación de cliente no puede ser vacío.');
            }
            console.log('punto 8')
            if (body.IdIdClientTypeCustomers) {
                if (!(await IdClientTypeController.existsIdIdClientType(body.IdIdClientTypeCustomers))) {
                    err.push('El tipo de identificación de cliente no existe.');
                }
            }
            console.log('punto 9')
            if (body.AddressBillCustomers == null || body.AddressBillCustomers == "") {
                err.push('La dirección de pago del cliente no puede ser vacío.');
            }
            console.log('punto 10')
            if (body.CountryBillCustomers == null || body.CountryBillCustomers == "") {
                err.push('El ID del país de pago del cliente no puede ser vacío.');
            }
            console.log('punto 11')
            if (body.CountryBillCustomers) {
                if (!(await CountryController.existsIdCountry(body.CountryBillCustomers))) {
                    err.push('El país de pago del cliente no existe.');
                }
            }
            console.log('punto 12')
            if (body.EstateBillcustomers == null || body.EstateBillcustomers == "") {
                err.push('El ID del estado desde donde paga el cliente no puede ser vacío.');
            }
            console.log('punto 13')
            if (body.EstateBillcustomers) {
                if (!(await StateController.existsIdState(body.EstateBillcustomers))) {
                    err.push('El estado desde donde paga el cliente no existe.');
                }
            }
            console.log('punto 14')
            if (body.CityBillCustomers == null || body.CityBillCustomers == "") {
                err.push('El ID de la ciudad desde donde paga el cliente no puede ser vacío.');
            }
            console.log('punto 15')
            if (body.CityBillCustomers) {
                if (!(await CityController.existsIdCity(body.CityBillCustomers))) {
                    err.push('La ciudad desde donde paga el cliente no existe.');
                }
            }
            console.log('punto 16')
            if (body.FeeCustomers == null || body.FeeCustomers == "") {
                err.push('El impuesto del cliente no puede ser vacío.');
            }
            console.log('punto 17')
            if (body.IdTypeMoneycustomers == null || body.IdTypeMoneycustomers == "") {
                err.push('El ID del tipo de moneda del cliente no puede ser vacío.');
            }
            console.log('punto 18')
            if (body.IdTypeMoneycustomers) {
                if (!(await MoneyTypeController.existsIdMoneyType(body.IdTypeMoneycustomers))) {
                    err.push('El tipo de moneda del cliente no existe.');
                }
            }
            console.log('punto 19')
            if (body.Phone1customer == null || body.Phone1customer == "") {
                err.push('El número de teléfono 1 no puede ser vacío.');
            }
            console.log('punto 20')
            if (body.Emailcustomer == null || body.Emailcustomer == "") {
                err.push('El E-mail no puede ser vacío.');
            }
            console.log('punto 21')
            return err;

        } else if (tipo == 'update') {

            if (id == undefined) {
                err.push('El ID del cliente no puede ser nulo.');
            }
            if (!(await this.existsIdCustomer(id))) {
                err.push('El cliente no existe.');
            }
            if (body.NameCustomer == null || body.NameCustomer == "") {
                err.push('El nombre no puede ser vacío.');
            }
            if (body.TypePayCustomers == null || body.TypePayCustomers == "") {
                err.push('El ID del tipo de pago no puede ser vacío.');
            }
            if (body.TypePayCustomers) {
                if (!(await PayTypeController.existsIdPayType(body.TypePayCustomers))) {
                    err.push('El tipo de pago no existe.');
                }
            }
            if (body.IdNumberCustomers == null || body.IdNumberCustomers == "") {
                err.push('El número de clientes no puede ser vacío.');
            }
            if (body.IdClientTypeCustomers == null || body.IdClientTypeCustomers == "") {
                err.push('El ID del tipo de cliente no puede ser vacío.');
            }
            if (body.IdClientTypeCustomers) {
                if (!(await ClientTypeController.existsIdClientType(body.IdClientTypeCustomers))) {
                    err.push('El tipo de cliente no existe.');
                }
            }
            if (body.StatusCustomers == null || body.StatusCustomers == "") {
                err.push('El status del cliente no puede ser vacío.');
            }
            if (body.IdIdClientTypeCustomers == null || body.IdIdClientTypeCustomers == "") {
                err.push('El ID del tipo de identificación de cliente no puede ser vacío.');
            }
            if (body.IdIdClientTypeCustomers) {
                if (!(await IdClientTypeController.existsIdIdClientType(body.IdIdClientTypeCustomers))) {
                    err.push('El tipo de identificación de cliente no existe.');
                }
            }
            if (body.AddressBillCustomers == null || body.AddressBillCustomers == "") {
                err.push('La dirección de pago del cliente no puede ser vacío.');
            }
            if (body.CountryBillCustomers == null || body.CountryBillCustomers == "") {
                err.push('El ID del país de pago del cliente no puede ser vacío.');
            }
            if (body.CountryBillCustomers) {
                if (!(await CountryController.existsIdCountry(body.CountryBillCustomers))) {
                    err.push('El país de pago del cliente no existe.');
                }
            }
            if (body.EstateBillcustomers == null || body.EstateBillcustomers == "") {
                err.push('El ID del estado desde donde paga el cliente no puede ser vacío.');
            }
            if (body.EstateBillcustomers) {
                if (!(await StateController.existsIdState(body.EstateBillcustomers))) {
                    err.push('El estado desde donde paga el cliente no existe.');
                }
            }
            if (body.CityBillCustomers == null || body.CityBillCustomers == "") {
                err.push('El ID de la ciudad desde donde paga el cliente no puede ser vacío.');
            }
            if (body.CityBillCustomers) {
                if (!(await CityController.existsIdCity(body.CityBillCustomers))) {
                    err.push('La ciudad desde donde paga el cliente no existe.');
                }
            }
            if (body.FeeCustomers == null || body.FeeCustomers == "") {
                err.push('El impuesto del cliente no puede ser vacío.');
            }
            if (body.IdTypeMoneycustomers == null || body.IdTypeMoneycustomers == "") {
                err.push('El ID del tipo de moneda del cliente no puede ser vacío.');
            }
            if (body.IdTypeMoneycustomers) {
                if (!(await MoneyTypeController.existsIdMoneyType(body.IdTypeMoneycustomers))) {
                    err.push('El tipo de moneda del cliente no existe.');
                }
            }
            if (body.Phone1customer == null || body.Phone1customer == "") {
                err.push('El número de teléfono 1 no puede ser vacío.');
            }
            if (body.Emailcustomer == null || body.Emailcustomer == "") {
                err.push('El E-mail no puede ser vacío.');
            }
            return err;

        } else if (tipo == 'delete') {

            if (id == undefined) {
                err.push('El ID del cliente no puede ser nulo.');
            }
            if (!(await this.existsIdCustomer(id))) {
                err.push('El cliente no existe.');
            }
            return err;

        }
    },

    //  =======================
    //  ======= C R U D =======
    //  =======================

    /**
     * @param {id} id 
     * @returns Objeto Customer o array de errores
     */
    async findOneCustomer(id) {
        const err = await this.validateCustomer('find_one', id, {});
        if (err.length > 0) {
            throw err;
        }

        const Customer = await CUSTOMER.findByPk(id);
        return Customer;
    },

    /**
     * 
     * @returns Array de objetos Customer
     */
    async findAllCustomers() {
        // const err = await this.validateCustomer('find_all', {}, {});
        // if (err.length > 0) {
        //     throw err;
        // }

        const Customer = await CUSTOMER.findAll({ where: {} });
        return Customer;
    },

    /**
     * 
     * @param {body} body 
     * @returns Objeto Customer o array de errores
     */
    async createCustomer(body) {
        const err = await this.validateCustomer('create', {}, body);
        console.log('llego')
        if (err.length > 0) {
            throw err;
        }

        const Customer = await CUSTOMER.create(body);
        return Customer;
    },

    /**
     * 
     * @param {id} id
     * @param {body} body  
     * @returns Variable boolean true o array de errores
     */
    async updateCustomer(id, body) {
        const err = await this.validateCustomer('update', id, body);
        if (err.length > 0) {
            throw err;
        }

        body.idCustomer = id;
        const Customer = await CUSTOMER.update(body, { where: { idCustomer: id } });
        if (Customer[0] == 1) {
            return true;
        }
    },

    /**
     * 
     * @param {id} id 
     * @returns Variable boolean true o array de errores
     */
    async deleteCustomer(id) {
        const err = await this.validateCustomer('delete', id, {});
        if (err.length > 0) {
            throw err;
        }

        const Customer = await CUSTOMER.destroy({ where: { idCustomer: id } });
        if (Customer == 1) {
            return true;
        }
    },

    //  ===========================
    //  ======= Q U E R Y S =======
    //  ===========================

    /** Devuelve true si lo encuentra, sino devuelve false */
    async existsIdCustomer(id) {
        aux = await CUSTOMER.findByPk(id).catch(function() {
            console.log("Promise Rejected");
        });
        if (aux == null) {
            return false;
        } else {
            return true;
        }
    }

};