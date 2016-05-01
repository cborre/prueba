// Invocar modo JavaScript 'strict'
'use strict';

// Cargar las dependencias del módulo
var users = require('../../app/controllers/users.server.controller'),
	productos = require('../../app/controllers/productos.server.controller');

// Definir el método routes de module
module.exports = function(app) {
	// Configurar la rutas base a 'productos'  
	app.route('/api/productos')
	   .get(productos.list)
	   .post(users.requiresLogin, productos.create);
	
	// Configurar las rutas 'productos' parametrizadas
	app.route('/api/productos/:productoId')
	   .get(productos.read)
	   .put(users.requiresLogin, productos.hasAuthorization, productos.update)
	   .delete(users.requiresLogin, productos.hasAuthorization, productos.delete);

	// Configurar el parámetro middleware 'productoId'   
	app.param('productoId', productos.productoByID);
};