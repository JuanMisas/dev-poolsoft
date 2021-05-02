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
            if (tipo != 6) {
                var x1 = await CUSTOMER.count({where : {'idCustomer' : id}});
                if (x1 == 0) 
                    errores.push('El ID No existe');
            }
            else{
                var x1 = await CUSTOMER.count({where : {'IdNumberCustomers' : id}});
                if (x1 == 0) 
                    errores.push('El Numero de identificacion no existe');
            }
        } 
        if (tipo == 1 || tipo == 2){
            if (tipo == 1) {
                if (CUS.idCustomer != undefined) {
                    var x1 = await CUSTOMER.count({where : {'idCustomer' : CUS.idCustomer}});
                    if (x1 > 0) 
                        errores.push('El ID ya existe');
                }
            }    
            if (CUS.idCustomer == undefined && tipo != 1){
                errores.push('El ID no puede ser nulo');
            }
            if (CUS.NameCustomer == '' || CUS.NameCustomer == undefined) {
                errores.push('El Nombre no puede ser nulo');
            }
        }
        if (tipo == 1 || tipo ==2){
            if (CUS.DateEnterCustomers == '' || CUS.DateEnterCustomers == undefined) {
                errores.push('La fecha de ingresa no debe ser nula')
            }
            if (CUS.TypePayCustomers == '' || CUS.TypePayCustomers == undefined) {
                errores.push('La forma de pago no puede ser nula')
            }
            else {
                // Validar que el tipo de pago si exista
                const pay = PAGO.findPayTypeOne(CUS.TypePayCustomers);
                len1 = pay.length;
                if (len1 > 0) {
                    errores.push('El tipo de pago no existe')
                }
            }
                
            if (CUS.IdNumberCustomers == '' || CUS.IdNumberCustomers == undefined) {
                errores.push('El numero de identificacion del cliente no debe ser nula')
            }
        
            if (CUS.IdClientTypeCustomers == '' || CUS.IdClientTypeCustomers == undefined) {
                errores.push('El tipo de identificacion no debe ser nula')
            }
            else {
                // Validar que el tipo de identificacion exista.
                const TIC = TypeIdNumber.findIdClientTypeById(CUS.IdClientTypeCustomers)
                len1 = TIC.length;
                if (len1 > 0){
                    errores.push('El tipo de Identificacion del cliente no existe')
                }
            }

            if (CUS.StatusCustomers == '' || CUS.StatusCustomers == undefined) {
                errores.push('El status del cliente no puede ser nulo')
            }
            else {
                // Validar que estatus 1= Activo 2=inactivo 3=Inactivo en mora, 4=inactivo temporalmente
                if (CUS.StatusCustomers < 0 || CUS.StatusCustomers > 5) {
                    errores.push('El status debe ser Activo, inactivo, Inactivo en mora o inactivo temporalmente')
                }
            }   

            if (CUS.ClientTypecustomers == '' || CUS.ClientTypecustomers == undefined) {
                errores.push('El tipo de cliente no puede ser nulo')
            }
            else {
            //Validar que el tipo de cliente exista
            const TC = TypeCustomer.findClientTypeById(CUS.ClientTypecustomers)
            len1 = TC.length;
            if (len1 > 0 ){
                errores.push('El tipo de cliente no existe')
                }
            }

            if (CUS.AddressBillCustomers == '' || CUS.AddressBillCustomers == undefined) {
                errores.push('La direccion no debe ser nula')
            }

            if (CUS.CountryBillCustomers == '' || CUS.CountryBillCustomers == undefined) {
                errores.push('El pais no debe ser nula')
            }else {
            // Validad la que el pais existe
                const CO = Country.findCountryOne(CUS.CountryBillCustomers);
                len1 = CO.length;
                if (len1 > 0 ){
                    push.errores('El pais no existe')
                }
            }

            if (CUS.EstateBillcustomers == '' || CUS.EstateBillcustomers == undefined) {
                errores.push('El estado no debe ser nula')
            }else {
                // valida que el estado exista
                const ST = State.findStateOne(CUS.EstateBillcustomers)
                len1 = ST.length;
                if (len1 > 0 ){
                    push.errores('El pais no existe')
                }
            }

            if (CUS.CityBillCustomers = '' || CUS.CityBillCustomers == undefined) {
                errores.push('La Ciudad no debe ser nula')
            }else {
                // Valida que la ciudad exista
                const CT = City.findCityOne(CUS.CityBillCustomers)
                len1 = CT.length;
                if (len1 > 0 ) {
                    push.errores('La cuidad no existe')
                }
            }

            if (CUS.FeeCustomers == '' || CUS.FeeCustomers == undefined) {
                errores.push('La cuota que debe pagar el cliente no debe ser nula')
            }

            if (CUS.FeeCustomers < 0) {
                errores.push('La cuota que debe pagar el cliente no debe ser menor que cero')
            }
        
            if (CUS.IdTypeMoneycustomers == '' || CUS.IdTypeMoneycustomers == undefined) {
                errores.push('El tipo de moneda no debe ser nula')
            }
            // validar que el tipo de moneda exista

            if (CUS.Phone1customer == '' || CUS.Phone1customer == undefined) {
                errores.push('el telefono principal no puede ser nulo')
            }

            if (CUS.Emailcustomer == '' || CUS.Emailcustomer == undefined) {
                errores.push('El email principal no puede ser nulo')
            }
            //Validar el formato del email
        }
        const len = errores.length;
        if (len > 0 )
                return errores;
        else
            return false;
    },

    async retorneIdbyNumber(numero){
        const Customer = await CUSTOMER.findAll({where : {IdNumberCustomers : numero}});
        return Customer.idCustomer;
    },

    async findCustomerOneById(id) {
        const err = (await this.valideCustomer({},id,5));
        if (err) {
            return err;
        }
        const Customer = await CUSTOMER.findByPk(id);
        return Customer;
    },

    async findCustomerOnebyNumber(id) {
        const err = (await this.valideCustomer({},id,6));
        if (err) {
            return err;
        }
        const Customer = await CUSTOMER.findAll({where : {IdNumberCustomers : id}});
        return Customer;
    },


    async findAllCustomer(){
        const Customer = await CUSTOMER.findAll({where : {}});
        return Customer;
    },

    async CreateCustomer(NewCustomer) {
          const err = await this.valideCustomer(NewCustomer,0,1);
          if (err) {
              return err;
          }
          const Customer = await CUSTOMER.create(NewCustomer);
          return Customer;
    },

    async UpdateCustomer(body, id) {
        const err = await this.valideCustomer(body,id,2);
        if (err) {
            return err;
        }
        const Customer = await CUSTOMER.update(body , {where : { idCustomer : id}});
        return Customer;
    },

    async DeleteCustomer(id) {
        const err = await this.valideCustomer({},id,3);
        if (err) {
            return err;
        }
      const Customer = await CUSTOMER.destroy({where : { idCustomer : id}});
        return Customer;
    },

};  