const express = require('express');
const app = express();
var router = express.Router();

var db = require('../connection.js')

const userController = require('../../controllers/userController');

// module.exports = (app) => {
//     app.get('/api', (req, res) => res.status(200).send ({
//          message: 'Example project did not give you access to the api web services',
//     }));
//     app.post('/api/usuario/create/username/:username/status/:status', userController.create);
//     app.get('/api/usuario/list', userController.list);
//     app.get('/api/usuario/find/username/:username', userController.find);
//  };

// router.get("/login",(req,res)=>{
//     res.render("../../views/pages/login/login");
// });



//app.get("/login",(req,res)=>res.render('login'));
//app.get('/', (req, res) => res.render('pages/index'));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Insert user
// app.get('/adduser1', (req, res) => {
//     let user = {NameUser: 'Post One', PasswordUser: 'lalala', RoleUser: 1};
//     let sql = 'INSERT INTO ps_user SET ?';
//     let query = db.query(sql, user, (err, result) => {
//         if(err) throw err;
//         console.log(result);
//         res.send('User added ......  ');
//     })
// });

// app.get('/selectusers1', (req, res) => {
//     let user = {NameUser: 'Post One', PasswordUser: 'lalala', RoleUser: 1};
//     let sql = 'SELECT * FROM ps_user';
//     let query = db.query(sql, (err, result) => {
//         if(err) throw err;
//         console.log(result);
//         res.send('User fetched ......  ');
//     })
// });


// app.get('/selectuser1/:id', (req, res) => {
//     let sql = `SELECT * FROM ps_user WHERE idUser = ${req.params.id}`;
//     let query = db.query(sql, (err, result) => {
//         if(err) throw err;
//         console.log(result);
//         res.send('User fetched ......  ');
//     })
// });


// app.get('/updateuser1/:id', (req, res) => {
//     let newUser = 'Updated User';
//     let sql = `UPDATE ps_user SET NameUser = ${newUser} WHERE idUser = ${req.params.id}`;
//     let query = db.query(sql, (err, result) => {
//         if(err) throw err;
//         console.log(result);
//         res.send('User updated ......  ');
//     })
// });

// app.get('/deleteuser1/:id', (req, res) => {
//     let newUser = 'Updated User';
//     let sql = `DELETE FROM ps_user WHERE idUser = ${req.params.id}`;
//     let query = db.query(sql, (err, result) => {
//         if(err) throw err;
//         console.log(result);
//         res.send('User deleted ......  ');
//     })
// });

app.get('/adduser', (req, res) => {
    userController.createUser();
    res.render("pages/index");
});

module.exports = app;
