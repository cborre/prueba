// Invocar modo JavaScript 'strict' 
'use strict';

// Cargar las dependencias del módulo
var mongoose = require('mongoose'),
	Cliente = mongoose.model('Cliente');

// Crear un nuevo método controller para el manejo de errores
var getErrorMessage = function(err) {
	if (err.errors) {
		for (var errName in err.errors) {
			if (err.errors[errName].message) return err.errors[errName].message;
		}
	} else {
		return 'Error de servidor desconocido';
	}
};

// Crear un nuevo método controller para crear nuevos clientes
exports.create = function(req, res) {
	// Crear un nuevo objeto cliente
	var cliente = new Cliente(req.body);

	// Configurar la propiedad 'creador' del cliente
	cliente.creador = req.user;

	// Intentar salvar el cliente
	cliente.save(function(err) {
		if (err) {
			// Si ocurre algún error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del cliente 
			res.json(cliente);
		}
	});
};

// Crear un nuevo método controller que recupera una lista de clientes
exports.list = function(req, res) {
	// Usar el método model 'find' para obtener una lista de clientes
	Cliente.find().sort('-creado').populate('creador', 'firstName lastName fullName').exec(function(err, clientes) {
		if (err) {
			// Si un error ocurre enviar un mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del cliente 
			res.json(clientes);
		}
	});
};

// Crear un nuevo método controller que devuelve un cliente existente
exports.read = function(req, res) {
	res.json(req.cliente);
};

// Crear un nuevo método controller que actualiza un cliente existente
exports.update = function(req, res) {
	// Obtener el cliente usando el objeto 'request'
	var cliente = req.cliente;

	// Actualizar los campos cliente
	cliente.documento = req.body.documento;
	cliente.nombres = req.body.nombres;
	cliente.detalles = req.body.detalles;

	// Intentar salvar el cliente actualizado
	cliente.save(function(err) {
		if (err) {
			// si ocurre un error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del cliente 
			res.json(cliente);
		}
	});
};

// Crear un nuevo método controller que borre un cliente existente
exports.delete = function(req, res) {
	// Obtener el cliente usando el objeto 'request'
	var cliente = req.cliente;

	// Usar el método model 'remove' para borrar el cliente
	cliente.remove(function(err) {
		if (err) {
			// Si ocurre un error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del cliente 
			res.json(cliente);
		}
	});
};

// Crear un nuevo controller middleware que recupera un único cliente existente
exports.clienteByID = function(req, res, next, id) {
	// Usar el método model 'findById' para encontrar un único cliente 
	Cliente.findById(id)
	.populate('creador', 'firstName lastName fullName')
	.exec(function(err, cliente) {
		if (err) 
			return next(err);
		if (!cliente) 
			return next(new Error('Fallo al cargar el cliente ' + id));

		// Si un cliente es encontrado usar el objeto 'request' para pasarlo al siguietne middleware
		req.cliente = cliente;

		// Llamar al siguiente middleware
		next();
	});
};

// Crear un nuevo método controller que recupera un unico cliente existente
exports.clienteByDocumento = function(req, res) {
	// Usar el método model 'find' para obtener una lista de clientes
	console.log('Prueba');
	Cliente.find({'documento':'15836400'})	
	.exec(function(err, clientes) {
		console.log('resultado: ' + clientes);
		if (err) {
			// Si un error ocurre enviar un mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del cliente 
			res.json(clientes);			
		}
	});
};

// Crear un nuevo controller middleware que es usado para autorizar una operación cliente 
exports.hasAuthorization = function(req, res, next) {
	// si el usuario actual no es el creador del cliente, enviar el mensaje de error apropiado
	/*if (req.cliente.creador.id !== req.user.id) {
		return res.status(403).send({
			message: 'Usuario no está autorizado'
		});
	}*/

	// Llamar al siguiente middleware
	next();
};