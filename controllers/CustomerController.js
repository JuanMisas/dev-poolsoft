const Sequelize = require('sequelize');
const CUSTOMER = require('../models/ps_Customer');
const server = require('../server/server');
const { validate } = require('../server/connection');
const { INTEGER } = require('sequelize');
const PAGO = require('../controllers/PayTypeController');
const TypeIdNumber = require('../controllers/idClientTypeController');
const TypeCustomer = require('../controllers/clientTypeController');
const Country = require('../controllers/CountryController');
const State = require('../controllers/StateController');
const City = require('../controllers/CityController');
const Money = require('../controllers/MoneyTypeController');


module.exports = {

    async valideCustomer(CUS, id, tipo){
        var errores = [];
        var len1 = 0;
        if (tipo > 1) {
            var x1 = await CUSTOMER.count({where : {'idCustomer' : id}});
            if (x1 == 0) 
                errores.push('El ID No existe');
        } 
        if (tipo == 1 || tipo == 2){
            if (tipo == 1) {
                var x1 = await CUSTOMER.count({where : {'idCustomer' : CUS.idCustomer}});
                if (x1 > 0) 
                    errores.push('El ID ya existe');
            }    
            if (CUS.idCustomer == undefined ){
                errores.push('El ID no puede ser nulo');
            }
            if (CUS.NameCustomer == '' || CUS.NameCustomer == undefined) {
                errores.push('El Nombre no puede ser nulo');
            }
        }
        if ((CUS.DateEnterCustomers == '' || CUS.DateEnterCustomers == undefined) && (tipo == 1 || tipo == 2) ){
            errores.push('La fecha de ingresa no debe ser nula')
        }
        if ((CUS.TypePayCustomers == '' || CUS.TypePayCustomers == undefined) && (tipo == 1 || tipo == 2) ){
            errores.push('La forma de pago no puede ser nula')
        }
        else {
            // Validar que el tipo de pago si exista
            const pay = PAGO.findByPk(CUS.TypePayCustomers);
            len1 = pay.length;
            if (len1 > 0) {
                errores.push('El tipo de pago no existe')
            }
        }
                
        if ((CUS.IdNumberCustomers == '' || CUS.IdNumberCustomers == undefined) && (tipo == 1 || tipo == 2) ){
            errores.push('El numero de identificacion del cliente no debe ser nula')
        }
        
        if ((CUS.IdClientTypeCustomers == '' || CUS.IdClientTypeCustomers == undefined) && (tipo == 1 || tipo == 2) ){
            errores.push('El tipo de identificacion no debe ser nula')
        }
        else {
        // Validar que el tipo de identificacion exista.
            const TIC = TypeIdNumber.findByPk(CUS.IdNumberCustomers)
            len1 = TIC.length;
            if (len1 > 0){
                errores.push('El tipo de Identificacion del cliente no existe')
            }
        }

        if ((CUS.StatusCustomers == '' || CUS.StatusCustomers == undefined) && (tipo == 1 || tipo == 2) ){
            errores.push('El status del cliente no puede ser nulo')
        }
        else {
        // Validar que estatus 1= Activo 2=inactivo 3=Inactivo en mora, 4=inactivo temporalmente
        if ((CUS.StatusCustomers < 0 || CUS.StatusCustomers > 5) && (tipo == 1 || tipo == 2) ){
            errores.push('El status debe ser Activo, inactivo, Inactivo en mora o inactivo temporalmente')
            }
        }   

        if ((CUS.ClientTypecustomers == '' || CUS.ClientTypecustomers == undefined) && (tipo == 1 || tipo == 2) ){
            errores.push('El tipo de cliente no puede ser nulo')
        }else {
        //Validar que el tipo de cliente exista
        const TC = TypeCustomer.findByPk(CUS.ClientTypecustomers)
        len1 = TC.length;
        if (len1 > 0 ){
            errores.push('El tipo de cliente no existe')
            }
        }

        if ((CUS.AddressBillCustomers == '' || CUS.AddressBillCustomers == undefined) && (tipo == 1 || tipo == 2) ){
            errores.push('La direccion no debe ser nula')
        }

        if ((CUS.CountryBillCustomers == '' || CUS.CountryBillCustomers == undefined) && (tipo == 1 || tipo == 2) ){
            errores.push('La direccion no debe ser nula')
        }else {
        // Validad la que el pais existe
            const CO = Country.findByPk(CUS.CountryBillCustomers);
            len1 = CO.length;
            if (len1 > 0 ){
                push.errores('El pais no existe')
            }
        }

        if ((CUS.EstateBillcustomers == '' || CUS.EstateBillcustomers == undefined) && (tipo == 1 || tipo == 2) ){
            errores.push('La direccion no debe ser nula')
        }else {
        // valida que el estado exista
            const ST = State.findByPk(CUS.EstateBillcustomers)
            len1 = ST.length;
            if (len1 > 0 ){
                push.errores('El pais no existe')
            }
        }

        if ((CUS.CityBillCustomers == '' || CUS.CityBillCustomers == undefined) && (tipo == 1 || tipo == 2) ){
            errores.push('La direccion no debe ser nula')
        }else {
        // Valida que la ciudad exista
        const CT = City.findByPk(CUS.CityBillCustomers)
        len1 = CT.length;
        if (len1 > 0 ) {
            push.errores('La cuidad no existe')
            }
        }

        if ((CUS.FeeCustomers == '' || CUS.FeeCustomers == undefined) && (tipo == 1 || tipo == 2) ){
            errores.push('La cuota que debe pagar el cliente no debe ser nula')
        }

        if ((CUS.FeeCustomers < 0) && (tipo == 1 || tipo == 2) ){
            errores.push('La cuota que debe pagar el cliente no debe ser menor que cero')
        }
        
        if ((CUS.IdTypeMoneycustomers == '' || CUS.IdTypeMoneycustomers == undefined) && (tipo == 1 || tipo == 2) ){
            errores.push('El tipo de moneda no debe ser nula')
        }
        // validar que el tipo de moneda exista

        if ((CUS.Phone1customer == '' || CUS.Phone1customer == undefined) && (tipo == 1 || tipo == 2) ){
            errores.push('el telefono principal no puede ser nulo')
        }

        if ((CUS.Emailcustomer == '' || CUS.Emailcustomer == undefined) && (tipo == 1 || tipo == 2) ){
            errores.push('el telefono principal no puede ser nulo')
        }
        //Validar el formato del email

        const len = errores.length;
        if (len > 0 )
            return errores;
        else
            return false;
    },

    async retorneIdbyNumber(numero){
        const Customer = await CUS.findAll({where : {IdNumberCustomers : numero}});
        return Customer.idCustomer;
    },

    async findCustomerOneById(id) {
        const err = (await this.valideCustomer({},id,5));
        if (err) {
            return err;
        }
        const Customer = await CUS.findByPk(id);
        return Customer;
    },

    async findCustomerOneByNumber(id) {
        const err = (await this.valideCustomer({},id,6));
        if (err) {
            return err;
        }
        const Customer = await CUS.findAll({where : {IdNumberCustomers : id}});
        return Customer;
    },


    async findAllCustomer(){
        const Customer = await CUS.findAll({where : {}});
        return Customer;
    },

    async CreateCustomer(NewCustomer) {
          const err = await this.valideCustomer(NewCustomer,0,1);
          if (err) {
              return err;
          }
          const Customer = await CUS.create(NewCustomer);
          return Customer;
    },

    async UpdateCustomer(body, id) {
        const err = await this.valideCustomer(body,id,2);
        if (err) {
            return err;
        }
        const Customer = await PAY.update(body , {where : { idCustomer : id}});
        return Customer;
    },

    async DeleteCustomer(id) {
        const err = await this.valideCustomer({},id,3);
        if (err) {
            return err;
        }
      const Customer = await PAY.destroy({where : { idCustomer : id}});
        return Customer;
    },

};  