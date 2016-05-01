// Invocar modo JavaScript 'strict'
'use strict';

// Crear el service 'productos'
angular.module('productos').factory('Productos', ['$resource', function($resource) {
	// Usar el service '$resource' para devolver un objeto '$resource' producto
    return $resource('api/productos/:productoId', {
        productoId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);