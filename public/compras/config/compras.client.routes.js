// Invocar modo JavaScript 'strict'
'use strict';

// Configurar el módulo routes de 'compras'
angular.module('compras').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/compras', {
			templateUrl: 'compras/views/list-compras.client.view.html'
		}).
		when('/compras/create', {
			templateUrl: 'compras/views/create-compra.client.view.html'
		}).
		when('/compras/:compraId', {
			templateUrl: 'compras/views/view-compra.client.view.html'
		}).
		when('/compras/:compraId/edit', {
			templateUrl: 'compras/views/edit-compra.client.view.html'
		}).
		when('/compras/:compraId/delete', {
			templateUrl: 'compras/views/delete-compra.client.view.html'
		});
	}
]); 