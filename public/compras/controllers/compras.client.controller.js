// Invocar modo JavaScript 'strict'
'use strict';

// Crear el controller 'compras'
angular.module('compras').controller('ComprasController', ['$scope', '$routeParams', '$location', 'Authentication', 'Compras', 'Clientes', 'Sedes', 'Productos',
function($scope, $routeParams, $location, Authentication, Compras, Clientes, Sedes, Productos) {
  // Exponer el service Authentication
  $scope.authentication = Authentication;

  // Crear un nuevo método controller para recuperar una lista de clientes
  $scope.findCliente = function() {
    // Usar el método 'query' de cliente para enviar una petición GET apropiada
    $scope.clientes = Clientes.query();
  };

  // Crear un nuevo método controller para recuperar una lista de sedes
  $scope.findSede = function() {
    // Usar el método 'query' de sede para enviar una petición GET apropiada
    $scope.sedes = Sedes.query();
  };

  // Crear un nuevo método controller para recuperar una lista de productos
  $scope.findProducto = function() {
    // Usar el método 'query' de producto para enviar una petición GET apropiada
    $scope.productos = Productos.query();
  };

  $scope.getPrecio = function (producto) {
    $scope.producto = Productos.get({
      productoId: $scope.id_producto
    });
  };

  $scope.calcTotal = function(){
    var total = 0;
    angular.forEach($scope.compras, function(compra){
      total = total + compra.precio;
    })
    return total;
  };

  $scope.genPDF = function(){

    var doc = new jsPDF('l', 'pt', 'letter', true);

    var specialElementHandlers = {
      '#hidediv': function (element, render) {
        return true;
      }
    };

    doc.fromHTML($('#testdiv').get(0), 20, 20, {
      'width': 500,
      'elementHandlers': specialElementHandlers
    });

    doc.save('Test.pdf');
  };

  // Crear un nuevo método controller para crear nuevos compras
  $scope.create = function() {
    // Usar los campos form para crear un nuevo objeto $resource compra
    var compra = new Compras({
      id_cliente: this.id_cliente,
      id_producto: this.id_producto,
      id_sede: this.id_sede,
      precio: this.producto.precio,
      descripcion: this.descripcion
    });

    // Usar el método '$save' de compra para enviar una petición POST apropiada
    compra.$save(function(response) {
      // Si un compra fue creado de modo correcto, redireccionar al usuario a la página del compra
      $location.path('compras/' + response._id);
    }, function(errorResponse) {
      // En otro caso, presentar al usuario el mensaje de error
      $scope.error = errorResponse.data.message;
    });
  };

  // Crear un nuevo método controller para recuperar una lista de compras
  $scope.find = function() {
    // Usar el método 'query' de compra para enviar una petición GET apropiada
    $scope.compras = Compras.query();
  };

  // Crear un nuevo método controller para recuperar un unico compra
  $scope.findOne = function() {
    // Usar el método 'get' de compra para enviar una petición GET apropiada
    $scope.compra = Compras.get({
      compraId: $routeParams.compraId
    });
  };

  // Crear un nuevo método controller para actualizar un único compra
  $scope.update = function() {
    // Usar el método '$update' de compra para enviar una petición PUT apropiada
    $scope.compra.$update(function() {
      // Si un compra fue actualizado de modo correcto, redirigir el user a la página del compra
      $location.path('compras/' + $scope.compra._id);
    }, function(errorResponse) {
      // En otro caso, presenta al user un mensaje de error
      $scope.error = errorResponse.data.message;
    });
  };

  // Crear un nuevo método controller para borrar un único compra
  $scope.delete = function(compra) {
    // Si un compra fue enviado al método, borrarlo
    if (compra) {
      // Usar el método '$remove' del compra para borrar el compra
      compra.$remove(function() {
        // Eliminar el compra de la lista de compras
        for (var i in $scope.compras) {
          if ($scope.compras[i] === compra) {
            $scope.compras.splice(i, 1);
          }
        }
      });
    } else {
      // En otro caso, usar el método '$remove' de compra para borrar el compra
      $scope.compra.$remove(function() {
        $location.path('compras');
      });
    }
  };
}
]);
