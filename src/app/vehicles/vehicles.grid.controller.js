(function() {
  'use strict';

  angular
    .module('app.vehicles')
    .controller('VehiclesGridController', VehiclesGridController);

  VehiclesGridController.$inject = ['vehiclesFactory', 'SweetAlert'];

  /* @ngInject */
  function VehiclesGridController(vehiclesFactory, SweetAlert) {
    var vm = this;

    vm.remove = remove;

    activate();

    function activate() {
      vehiclesFactory
        .getAll()
        .then(function(vehicles) {
          vm.vehicles = vehicles;
        });
    }

    function remove(vehicle) {
      SweetAlert.swal({
          title: "Are you sure?",
          text: `You will not be able to recover the vehicle ${vehicle.make}!`,
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "Cancel",
          closeOnConfirm: false,
          closeOnCancel: false
        },
        function(isConfirm) {
          if (isConfirm) {
            vehiclesFactory
              .remove(vehicle.vehicleId, vehicle)
              .then(function() {
                SweetAlert.swal("Deleted!", `The vehicle ${vehicle.make} has been deleted`, "success");
                vm.vehicles.splice(vm.vehicles.indexOf(vehicle), 1);
              });
          } else {
            SweetAlert.swal("Cancelled", `The vehicle ${vehicle.make} will remain in inventory`, "error");
          }
        });
    };
  }
})();
