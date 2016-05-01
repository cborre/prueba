// Invocar modo JavaScript 'strict' 
'use strict';

// Cargar las dependencias del módulo
var mongoose = require('mongoose'),
	Compra = mongoose.model('Compra');

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

// Crear un nuevo método controller para crear nuevos compras
exports.create = function(req, res) {
	// Crear un nuevo objeto compra
	var compra = new Compra(req.body);

	// Configurar la propiedad 'creador' del compra
	compra.creador = req.user;

	// Intentar salvar el compra
	compra.save(function(err) {
		if (err) {
			// Si ocurre algún error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del compra 
			res.json(compra);
		}
	});
};

// Crear un nuevo método controller que recupera una lista de compras
exports.list = function(req, res) {
	// Usar el método model 'find' para obtener una lista de compras
	console.log('list');
	Compra.find().sort('-fecha')
	.populate('id_cliente', 'documento nombres detalles')
	.populate('id_producto', 'producto precio descripcion')
	.populate('id_sede', 'sede direccion')
	.exec(function(err, compras) {
		console.log(compras);
		if (err) {
			// Si un error ocurre enviar un mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {			
			res.json(compras);
		}
	});
};

// Crear un nuevo método controller que devuelve un compra existente
exports.read = function(req, res) {
	res.json(req.compra);
};

// Crear un nuevo método controller que actualiza un compra existente
exports.update = function(req, res) {
	// Obtener el compra usando el objeto 'request'
	var compra = req.compra;

	// Actualizar los campos compra
	compra.id_cliente = req.body.id_cliente;
	compra.id_producto = req.body.id_producto;
	compra.id_sede = req.body.id_sede;
	compra.precio = req.body.precio;
	compra.descripcion = req.body.descripcion;
	compra.fecha = req.body.fecha;

	// Intentar salvar el compra actualizado
	compra.save(function(err) {
		if (err) {
			// si ocurre un error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del compra 
			res.json(compra);
		}
	});
};

// Crear un nuevo método controller que borre un compra existente
exports.delete = function(req, res) {
	// Obtener el compra usando el objeto 'request'
	var compra = req.compra;

	// Usar el método model 'remove' para borrar el compra
	compra.remove(function(err) {
		if (err) {
			// Si ocurre un error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del compra 
			res.json(compra);
		}
	});
};

// Crear un nuevo controller middleware que recupera un único compra existente
exports.compraByID = function(req, res, next, id) {
	// Usar el método model 'findById' para encontrar un único compra 
	Compra.findById(id)
	.populate('id_cliente', 'documento nombres detalles')
	.populate('id_producto', 'producto precio descripcion')
	.populate('id_sede', 'sede direccion')
	.exec(function(err, compra) {
		console.log(compra);
		if (err) return next(err);
		if (!compra) return next(new Error('Fallo al cargar el compra ' + id));

		// Si un compra es encontrado usar el objeto 'request' para pasarlo al siguietne middleware
		req.compra = compra;

		// Llamar al siguiente middleware
		next();
	});
};

// Crear un nuevo controller middleware que es usado para autorizar una operación compra 
exports.hasAuthorization = function(req, res, next) {
	// si el usuario actual no es el creador del compra, enviar el mensaje de error apropiado
	/*if (req.compra.creador.id !== req.user.id) {
		return res.status(403).send({
			message: 'Usuario no está autorizado'
		});
	}*/

	// Llamar al siguiente middleware
	next();
};