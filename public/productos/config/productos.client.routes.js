// Invocar modo JavaScript 'strict'
'use strict';

// Configurar el módulo routes de 'productos'
angular.module('productos').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/productos', {
			templateUrl: 'productos/views/list-productos.client.view.html'
		}).
		when('/productos/create', {
			templateUrl: 'productos/views/create-producto.client.view.html'
		}).
		when('/productos/:productoId', {
			templateUrl: 'productos/views/view-producto.client.view.html'
		}).
		when('/productos/:productoId/edit', {
			templateUrl: 'productos/views/edit-producto.client.view.html'
		}).
		when('/productos/:productoId/delete', {
			templateUrl: 'productos/views/delete-producto.client.view.html'
		});
	}
]); 