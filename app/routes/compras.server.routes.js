// Invocar modo JavaScript 'strict'
'use strict';

// Cargar las dependencias del módulo
var users = require('../../app/controllers/users.server.controller'),
	compras = require('../../app/controllers/compras.server.controller');

// Definir el método routes de module
module.exports = function(app) {
	// Configurar la rutas base a 'compras'  
	app.route('/api/compras')
	   .get(compras.list)
	   .post(users.requiresLogin, compras.create);
	
	// Configurar las rutas 'compras' parametrizadas
	app.route('/api/compras/:compraId')
	   .get(compras.read)
	   .put(users.requiresLogin, compras.hasAuthorization, compras.update)
	   .delete(users.requiresLogin, compras.hasAuthorization, compras.delete);

	// Configurar el parámetro middleware 'compraId'   
	app.param('compraId', compras.compraByID);
};