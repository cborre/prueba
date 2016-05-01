// Invocar modo JavaScript 'strict'
'use strict';

// Crear el service 'sedes'
angular.module('sedes').factory('Sedes', ['$resource', function($resource) {
	// Usar el service '$resource' para devolver un objeto '$resource' sede
    return $resource('api/sedes/:sedeId', {
        sedeId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);