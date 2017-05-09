(function() {
  'use strict';

  angular
    .module('app.customers')
    .controller('CustomersDetailController', CustomersDetailController);

  CustomersDetailController.$inject = ['customersFactory', 'SweetAlert', '$stateParams'];

  /* @ngInject */
  function CustomersDetailController(customersFactory, SweetAlert, $stateParams) {
    var vm = this;

    vm.save = save;

    activate();

    function activate() {
      // http://localhost:3000/#/customers/detail/1
      //grab the customer that matches the id provide in the URL
      var customerId = $stateParams.id;
      customersFactory
        .getById(customerId)
        .then(function(customer) {
          vm.customer = customer;
        }).catch(function(error) {
          alert(error);
        });
    }

    function save() {
      var customerId = $stateParams.id;

      if (customerId) { // Update the record
        customersFactory
          .update(vm.customer.customerId, vm.customer)
          .then(function() {
            SweetAlert.swal("Customer Information Updated!", "You are on fire today!", "success");
          });
      } else { // Create the record
        customersFactory
          .create(vm.customer)
          .then(function() {
            SweetAlert.swal("Customer Information Created!", "Go get them tiger", "success");
          });
      }
    }
  }
})();
