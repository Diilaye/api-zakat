const express = require('express');


const auth = require('../midleweares/auth');

// import all controllers
const  fileCtrl =  require('../controllers/file');


const routes = new express.Router();

// Add routes
routes.get('/', fileCtrl.all);
routes.get('/:id', fileCtrl.one);
routes.post('/',auth,fileCtrl.store);
routes.delete('/:id', fileCtrl.delete);

module.exports = routes;
    