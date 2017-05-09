(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['dashboardFactory'];

  /* @ngInject */
  function DashboardController(dashboardFactory) {
    var vm = this;

    activate();

    function activate() {

    }
  }
})();
