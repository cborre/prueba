// Invocar modo JavaScript 'strict'
'use strict';

// Crear el service 'compras'
angular.module('compras').factory('Compras', ['$resource', function($resource) {
	// Usar el service '$resource' para devolver un objeto '$resource' compra
    return $resource('api/compras/:compraId', {
        compraId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);