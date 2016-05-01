// Invocar modo JavaScript 'strict' 
'use strict';

// Cargar las dependencias del módulo
var mongoose = require('mongoose'),
	Sede = mongoose.model('Sede');

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

// Crear un nuevo método controller para crear nuevas sedes 
exports.create = function(req, res) {
	// Crear un nuevo objeto sede
	var sede = new Sede(req.body);

	// Configurar la propiedad 'creador' de la sede 
	sede.creador = req.user;

	// Intentar salvar la sede
	sede.save(function(err) {
		if (err) {
			// Si ocurre algún error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON de la sede 
			res.json(sede);
		}
	});
};

// Crear un nuevo método controller que recupera una lista de sedes
exports.list = function(req, res) {
	// Usar el método model 'find' para obtener una lista de artículos
	Sede.find().sort('-creado').populate('creador', 'firstName lastName fullName').exec(function(err, articles) {
		if (err) {
			// Si un error ocurre enviar un mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del artículo 
			res.json(articles);
		}
	});
};

// Crear un nuevo método controller que devuelve una sede existente
exports.read = function(req, res) {
	res.json(req.sede);
};

// Crear un nuevo método controller que actualiza una sede existente
exports.update = function(req, res) {
	// Obtener la sede usando el objeto 'request'
	var sede = req.sede;

	// Actualizar los campos sede
	sede.sede = req.body.sede;
	sede.direccion = req.body.direccion;

	// Intentar salvar la sede actualizada
	sede.save(function(err) {
		if (err) {
			// si ocurre un error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON de la sede 
			res.json(sede);
		}
	});
};

// Crear un nuevo método controller que borre una sede existente
exports.delete = function(req, res) {
	// Obtener la sede usando el objeto 'request'
	var sede = req.sede;

	// Usar el método model 'remove' para borrar la sede
	sede.remove(function(err) {
		if (err) {
			// Si ocurre un error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON de la sede 
			res.json(sede);
		}
	});
};

// Crear un nuevo controller middleware que recupera una única sede existente
exports.sedeByID = function(req, res, next, id) {
	// Usar el método model 'findById' para encontrar una única sede	
	Sede.findById(id).populate('creador', 'firstName lastName fullName').exec(function(err, sede) {
		if (err) return next(err);
		if (!sede) return next(new Error('Fallo al cargar la sede ' + id));

		// Si una sede es encontrada usar el objeto 'request' para pasarlo al siguietne middleware
		req.sede = sede;

		// Llamar al siguiente middleware
		next();
	});
};

// Crear un nuevo controller middleware que es usado para autorizar una operación sede 
exports.hasAuthorization = function(req, res, next) {
	// si el usuario actual no es el creador del artículo, enviar el mensaje de error apropiado
	/*if (req.article.creador.id !== req.user.id) {
		return res.status(403).send({
			message: 'Usuario no está autorizado'
		});
	}*/

	// Llamar al siguiente middleware
	next();
};