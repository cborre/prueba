// Invocar modo JavaScript 'strict'
'use strict';

// Crear el controller 'sedes'
angular.module('sedes').controller('SedesController', ['$scope', '$routeParams', '$location', 'Authentication', 'Sedes',
    function($scope, $routeParams, $location, Authentication, Sedes) {
        // Exponer el service Authentication
        $scope.authentication = Authentication;

 		// Crear un nuevo método controller para crear nuevas sedes
        $scope.create = function() {
            // Usar los campos form para crear un nuevo objeto $resource sede
            var sede = new Sedes({
                sede: this.sede,
                direccion: this.direccion
            });

            // Usar el método '$save' de sede para enviar una petición POST apropiada
            sede.$save(function(response) {
                // Si un artículo fue creado de modo correcto, redireccionar al usuario a la página del artículo 
                $location.path('sedes/' + response._id);
            }, function(errorResponse) {
                // En otro caso, presentar al usuario el mensaje de error
                $scope.error = errorResponse.data.message;
            });
        };

		// Crear un nuevo método controller para recuperar una lista de sedes
        $scope.find = function() {
            // Usar el método 'query' de sede para enviar una petición GET apropiada
            $scope.sedes = Sedes.query();
        };

        // Crear un nuevo método controller para recuperar una unica sede
        $scope.findOne = function() {
            // Usar el método 'get' de sede para enviar una petición GET apropiada
			console.log('findOne');
            $scope.sede = Sedes.get({
                sedeId: $routeParams.sedeId
            });
        };

 		// Crear un nuevo método controller para actualizar un único sede
        $scope.update = function() {
            // Usar el método '$update' de sede para enviar una petición PUT apropiada
            $scope.sede.$update(function() {
                // Si un sede fue actualizado de modo correcto, redirigir el user a la página del sede 
                $location.path('sedes/' + $scope.sede._id);
            }, function(errorResponse) {
                // En otro caso, presenta al user un mensaje de error
                $scope.error = errorResponse.data.message;
            });
        };

		// Crear un nuevo método controller para borrar una única sede
        $scope.delete = function(sede) {
            // Si una sede fue enviado al método, borrarlo
            if (sede) {
                // Usar el método '$remove' de la sede para borrar la sede
                sede.$remove(function() {
                    // Eliminar la sede de la lista de sedes
                    for (var i in $scope.sedes) {
                        if ($scope.sedes[i] === sede) {
                            $scope.sedes.splice(i, 1);
                        }
                    }
                });
            } else {
                // En otro caso, usar el método '$remove' de sede para borrar la sede
                $scope.sede.$remove(function() {
                    $location.path('sedes');
                });
            }
        };
    }
]);