const express = require('express');


const auth = require('../midleweares/auth');

// import all controllers
const  projectCtrl =  require('../controllers/project');


const routes = new express.Router();

// Add routes
routes.get('/', projectCtrl.all);
routes.get('/by-type/:type', projectCtrl.allByType);
routes.get('/by-user/', projectCtrl.projectByUser);
routes.get('/by-status/:status', projectCtrl.projectByStatus);
routes.get('/:id', projectCtrl.one);
routes.post('/',auth,projectCtrl.store);
routes.put('/:id',auth,projectCtrl.update);
routes.delete('/:id', projectCtrl.delete);

module.exports = routes;
    