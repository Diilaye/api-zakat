const express = require('express');


const auth = require('../midleweares/auth');

// import all controllers
const  projectCtrl =  require('../controllers/project');


const routes = new express.Router();

// Add routes
routes.get('/', projectCtrl.all);
routes.get('/by-type/:type', auth,projectCtrl.allByType);
routes.get('/by-user/', auth,projectCtrl.projectByUser);
routes.get('/by-status/:status', auth,projectCtrl.projectByStatus);
routes.get('/:id', auth,projectCtrl.one);
routes.post('/',auth,projectCtrl.store);
routes.put('/:id',auth,projectCtrl.update);
routes.delete('/:id', auth,projectCtrl.delete);

module.exports = routes;
    