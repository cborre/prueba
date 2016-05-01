// Invocar modo JavaScript 'strict'
'use strict';

// Cargar las dependencias del módulo
var users = require('../../app/controllers/users.server.controller'),
	sedes = require('../../app/controllers/sedes.server.controller');

// Definir el método routes de module
module.exports = function(app) {
	// Configurar la rutas base a 'sedes'  
	app.route('/api/sedes')
	   .get(sedes.list)
	   .post(users.requiresLogin, sedes.create);
	
	// Configurar las rutas 'sedes' parametrizadas
	app.route('/api/sedes/:sedeId')
	   .get(sedes.read)
	   .put(users.requiresLogin, sedes.hasAuthorization, sedes.update)
	   .delete(users.requiresLogin, sedes.hasAuthorization, sedes.delete);

	// Configurar el parámetro middleware 'sedeId'   
	app.param('sedeId', sedes.sedeByID);
};