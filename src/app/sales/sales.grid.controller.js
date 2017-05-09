(function() {
  'use strict';

  angular
    .module('app.sales')
    .controller('SalesGridController', SalesGridController);

  SalesGridController.$inject = ['salesFactory', 'SweetAlert'];

  /* @ngInject */
  function SalesGridController(salesFactory, SweetAlert) {
    var vm = this;

    vm.remove = remove;

    activate();

    function activate() {
      salesFactory
        .getAll()
        .then(function(sales) {
          vm.sales = sales;
        });
    }

    function remove(sale) {
      SweetAlert.swal({
          title: "Are you sure?",
          text: `You will not be able to recover records of ${sale.customerName}!`,
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
            salesFactory
              .remove(sale.saleId, sale)
              .then(function() {
                SweetAlert.swal("Deleted!", `${sale.customerName}  has been deleted`, "success");
                vm.sales.splice(vm.sales.indexOf(sale), 1);
              });

          } else {
            SweetAlert.swal("Cancelled", `${sale.customerName}  has been saved!`, "error");
          }
        });
    }
  }
})();
