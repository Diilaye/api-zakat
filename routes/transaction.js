const express = require('express');


// import all controllers
const  transactionCtrl =  require('../controllers/transaction');

const paiementMiddleware = require('../midleweares/wave-orange-paiment');

const orangeAuth  = require('../midleweares/orange-auth');


const routes = new express.Router();

// Add routes
routes.get('/', transactionCtrl.all);
routes.get('/:id', transactionCtrl.one);
routes.post('/',orangeAuth,paiementMiddleware,transactionCtrl.store);
routes.delete('/:id', transactionCtrl.delete);

module.exports = routes;
    