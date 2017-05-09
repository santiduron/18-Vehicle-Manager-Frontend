(function() {
  'use strict';

  angular
    .module('app.sales')
    .controller('SalesDetailController', SalesDetailController);

  SalesDetailController.$inject = ['salesFactory', 'customersFactory', 'vehiclesFactory', 'SweetAlert', '$stateParams'];

  /* @ngInject */
  function SalesDetailController(salesFactory, customersFactory, vehiclesFactory, SweetAlert, $stateParams) {
    var vm = this;

    vm.save = save;

    activate();

    function activate() {
      // http://localhost:3000/#/sales/detail/1
      //grab the sale that matches the id provide in the URL
      var saleId = $stateParams.id;

      customersFactory
        .getAll()
        .then(function(customers) {
          vm.customers = customers;
        });

      vehiclesFactory
        .getAll()
        .then(function(vehicles) {
          vm.vehicles = vehicles;
        });
      if (saleId) {
        salesFactory
          .getById(saleId)
          .then(function(sale) {
            vm.sale = sale;
          })
          .catch(function(error) {
            alert(error);
          });
      };
    }

    function save() {
      var saleId = $stateParams.id;

      vm.sale.customerId = vm.selectedCustomer.customerId;
      vm.sale.vehicleId = vm.selectedVehicle.vehicleId;

      if (saleId) { // Update the record
        salesFactory
          .update(vm.sale.saleId, vm.sale)
          .then(function() {
            SweetAlert.swal("Sale Information Updated!", "You are on fire today!", "success");
          });
      } else { // Create the record
        salesFactory
          .create(vm.sale)
          .then(function() {
            SweetAlert.swal("Sale Information Created!", "Go get them tiger", "success");
          });
      }
    }
  }
})();
