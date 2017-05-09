(function() {
  'use strict';

  angular
    .module('app.vehicles')
    .controller('VehiclesDetailController', VehiclesDetailController);

  VehiclesDetailController.$inject = ['vehiclesFactory', 'SweetAlert', '$stateParams'];

  /* @ngInject */
  function VehiclesDetailController(vehiclesFactory, SweetAlert, $stateParams) {
    var vm = this;

    vm.save = save;

    activate();

    function activate() {
      // http://localhost:3000/#/vehicles/detail/1
      //grab the vehicle that matches the id provide in the URL
      var vehicleId = $stateParams.id;
      vehiclesFactory
        .getById(vehicleId)
        .then(function(vehicle) {
          vm.vehicle = vehicle;
        }).catch(function(error) {
          alert(error);
        });
    }

    function save() {
      var vehicleId = $stateParams.id;

      if (vehicleId) { // Update the record
        vehiclesFactory
          .update(vm.vehicle.vehicleId, vm.vehicle)
          .then(function() {
            SweetAlert.swal("Vehicle Information Updated!", "You are on fire today!", "success");
          });
      } else { // Create the record
        vehiclesFactory
          .create(vm.vehicle)
          .then(function() {
            SweetAlert.swal("Vehicle Information Created!", "Go get them tiger", "success");
          });
      }
    }
  }
})();
