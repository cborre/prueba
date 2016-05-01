// Invocar el modo JavaScript 'strict'
'use strict';

// Carga las dependencias del módulo
var config = require('./config'),
	mongoose = require('mongoose');

// Definir el método de configuración de Mongoose
module.exports = function() {
	// Usar Mongoose para conectar a MongoDB
	var db = mongoose.connect(config.db);
	
	// Cargar el modelo 'User'
	require('../app/models/user.server.model');
	
	// Cargar el modelo 'Article'
	require('../app/models/article.server.model');
	
	// Cargar el modelo 'Sede'
	require('../app/models/sede.server.model');
	
	// Cargar el modelo 'Cliente'
	require('../app/models/cliente.server.model');
	
	// Cargar el modelo 'Producto'
	require('../app/models/producto.server.model');
	
	// Cargar el modelo 'Compra'
	require('../app/models/compra.server.model');
	
	// Devolver la instancia de conexión a Mongoose 
	return db;
};