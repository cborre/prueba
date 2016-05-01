// Invocar modo JavaScript 'strict' 
'use strict';

// Cargar las dependencias del módulo
var mongoose = require('mongoose'),
	Producto = mongoose.model('Producto');

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

// Crear un nuevo método controller para crear nuevos productos
exports.create = function(req, res) {
	// Crear un nuevo objeto producto
	var producto = new Producto(req.body);

	// Configurar la propiedad 'creador' del producto
	producto.creador = req.user;

	// Intentar salvar el producto
	producto.save(function(err) {
		if (err) {
			// Si ocurre algún error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del producto 
			res.json(producto);
		}
	});
};

// Crear un nuevo método controller que recupera una lista de productos
exports.list = function(req, res) {
	// Usar el método model 'find' para obtener una lista de productos
	Producto.find().sort('-creado').populate('creador', 'firstName lastName fullName').exec(function(err, productos) {
		if (err) {
			// Si un error ocurre enviar un mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del producto 
			res.json(productos);
		}
	});
};

// Crear un nuevo método controller que devuelve un producto existente
exports.read = function(req, res) {
	res.json(req.producto);
};

// Crear un nuevo método controller que actualiza un producto existente
exports.update = function(req, res) {
	// Obtener el producto usando el objeto 'request'
	var producto = req.producto;

	// Actualizar los campos producto
	producto.producto = req.body.producto;
	producto.precio = req.body.precio;
	producto.descripcion = req.body.descripcion;

	// Intentar salvar el producto actualizado
	producto.save(function(err) {
		if (err) {
			// si ocurre un error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del producto 
			res.json(producto);
		}
	});
};

// Crear un nuevo método controller que borre un producto existente
exports.delete = function(req, res) {
	// Obtener el producto usando el objeto 'request'
	var producto = req.producto;

	// Usar el método model 'remove' para borrar el producto
	producto.remove(function(err) {
		if (err) {
			// Si ocurre un error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del producto 
			res.json(producto);
		}
	});
};

// Crear un nuevo controller middleware que recupera un único producto existente
exports.productoByID = function(req, res, next, id) {
	// Usar el método model 'findById' para encontrar un único producto 
	Producto.findById(id).populate('creador', 'firstName lastName fullName').exec(function(err, producto) {
		if (err) return next(err);
		if (!producto) return next(new Error('Fallo al cargar el producto ' + id));

		// Si un producto es encontrado usar el objeto 'request' para pasarlo al siguietne middleware
		req.producto = producto;

		// Llamar al siguiente middleware
		next();
	});
};

// Crear un nuevo controller middleware que es usado para autorizar una operación producto 
exports.hasAuthorization = function(req, res, next) {
	// si el usuario actual no es el creador del producto, enviar el mensaje de error apropiado
	/*if (req.producto.creador.id !== req.user.id) {
		return res.status(403).send({
			message: 'Usuario no está autorizado'
		});
	}*/

	// Llamar al siguiente middleware
	next();
};