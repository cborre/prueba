// Invocar modo JavaScript 'strict'
'use strict';

// Crear el controller 'productos'
angular.module('productos').controller('ProductosController', ['$scope', '$routeParams', '$location', 'Authentication', 'Productos',
    function($scope, $routeParams, $location, Authentication, Productos) {
        // Exponer el service Authentication
        $scope.authentication = Authentication;
						
 		// Crear un nuevo método controller para crear nuevos productos
        $scope.create = function() {
            // Usar los campos form para crear un nuevo objeto $resource producto			
            var producto = new Productos({
                producto: this.producto,
                precio: this.precio,
				descripcion: this.descripcion
            });

            // Usar el método '$save' de producto para enviar una petición POST apropiada
            producto.$save(function(response) {
                // Si un producto fue creado de modo correcto, redireccionar al usuario a la página del producto 
                $location.path('productos/' + response._id);
            }, function(errorResponse) {
                // En otro caso, presentar al usuario el mensaje de error
                $scope.error = errorResponse.data.message;
            });
        };

		// Crear un nuevo método controller para recuperar una lista de productos
        $scope.find = function() {
            // Usar el método 'query' de producto para enviar una petición GET apropiada
            $scope.productos = Productos.query();
        };

        // Crear un nuevo método controller para recuperar un unico producto
        $scope.findOne = function() {
            // Usar el método 'get' de producto para enviar una petición GET apropiada
            $scope.producto = Productos.get({
                productoId: $routeParams.productoId
            });
        };

 		// Crear un nuevo método controller para actualizar un único producto
        $scope.update = function() {
            // Usar el método '$update' de producto para enviar una petición PUT apropiada
            $scope.producto.$update(function() {
                // Si un producto fue actualizado de modo correcto, redirigir el user a la página del producto 
                $location.path('productos/' + $scope.producto._id);
            }, function(errorResponse) {
                // En otro caso, presenta al user un mensaje de error
                $scope.error = errorResponse.data.message;
            });
        };

		// Crear un nuevo método controller para borrar un único producto
        $scope.delete = function(producto) {
            // Si un producto fue enviado al método, borrarlo
            if (producto) {
                // Usar el método '$remove' del producto para borrar el producto
                producto.$remove(function() {
                    // Eliminar el producto de la lista de productos
                    for (var i in $scope.productos) {
                        if ($scope.productos[i] === producto) {
                            $scope.productos.splice(i, 1);
                        }
                    }
                });
            } else {
                // En otro caso, usar el método '$remove' de producto para borrar el producto
                $scope.producto.$remove(function() {
                    $location.path('productos');
                });
            }
        };
    }
]);