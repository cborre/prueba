// Invocar modo JavaScript 'strict'
'use strict';

// Crear el controller 'clientes'
angular.module('clientes').controller('ClientesController', ['$scope', '$routeParams', '$location', 'Authentication', 'Clientes',
function($scope, $routeParams, $location, Authentication, Clientes) {
  // Exponer el service Authentication
  $scope.authentication = Authentication;

  // Crear un nuevo método controller para crear nuevos clientes
  $scope.create = function() {
    // Usar los campos form para crear un nuevo objeto $resource cliente
    var cliente = new Clientes({
      documento: this.documento,
      nombres: this.nombres,
      detalles: this.detalles
    });

    // Usar el método '$save' de cliente para enviar una petición POST apropiada
    cliente.$save(function(response) {
      // Si un cliente fue creado de modo correcto, redireccionar al usuario a la página del cliente
      $location.path('clientes/' + response._id);
    }, function(errorResponse) {
      // En otro caso, presentar al usuario el mensaje de error
      $scope.error = errorResponse.data.message;
    });
  };

  // Crear un nuevo método controller para recuperar una lista de clientes
  $scope.find = function() {
    // Usar el método 'query' de cliente para enviar una petición GET apropiada
    $scope.clientes = Clientes.query();
  };

  // Crear un nuevo método controller para recuperar un unico cliente
  $scope.findOne = function() {
    // Usar el método 'get' de cliente para enviar una petición GET apropiada
    $scope.cliente = Clientes.get({
      clienteId: $routeParams.clienteId
    });
  };

  // Crear un nuevo método controller para actualizar un único cliente
  $scope.update = function() {
    // Usar el método '$update' de cliente para enviar una petición PUT apropiada
    $scope.cliente.$update(function() {
      // Si un cliente fue actualizado de modo correcto, redirigir el user a la página del cliente
      $location.path('clientes/' + $scope.cliente._id);
    }, function(errorResponse) {
      // En otro caso, presenta al user un mensaje de error
      $scope.error = errorResponse.data.message;
    });
  };

  // Crear un nuevo método controller para borrar un único cliente
  $scope.delete = function(cliente) {
    // Si un cliente fue enviado al método, borrarlo
    if (cliente) {
      // Usar el método '$remove' del cliente para borrar el cliente
      cliente.$remove(function() {
        // Eliminar el cliente de la lista de clientes
        for (var i in $scope.clientes) {
          if ($scope.clientes[i] === cliente) {
            $scope.clientes.splice(i, 1);
          }
        }
      });
    } else {
      // En otro caso, usar el método '$remove' de cliente para borrar el cliente
      $scope.cliente.$remove(function() {
        $location.path('clientes');
      });
    }
  };
}
]);
