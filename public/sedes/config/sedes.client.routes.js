// Invocar modo JavaScript 'strict'
'use strict';

// Configurar el módulo routes de 'sedes'
angular.module('sedes').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/sedes', {
			templateUrl: 'sedes/views/list-sedes.client.view.html'
		}).
		when('/sedes/create', {
			templateUrl: 'sedes/views/create-sede.client.view.html'
		}).
		when('/sedes/:sedeId', {
			templateUrl: 'sedes/views/view-sede.client.view.html'
		}).
		when('/sedes/:sedeId/edit', {
			templateUrl: 'sedes/views/edit-sede.client.view.html'
		}).
		when('/sedes/:sedeId/delete', {
			templateUrl: 'sedes/views/delete-sede.client.view.html'
		});
	}
]); 