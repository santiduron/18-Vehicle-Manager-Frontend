(function() {
  'use strict';

  angular
    .module('app', [
      'ui.router',
      'ui.select',
      'ngSanitize',
      'oitozero.ngSweetAlert',
      'app.customers',
      'app.dashboard',
      'app.sales',
      'app.vehicles'
    ])
    .value('apiUrl', 'https://smrd-vehicle-api.azurewebsites.net/api/')
    .config(function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/dashboard');

      // Configure each one of our states
      $stateProvider
        .state('dashboard', {
          url: '/dashboard', //http://localhost:3000/#/dashboard
          controller: 'DashboardController as dashboardCtrl', //ng-controller
          templateUrl: 'app/dashboard/dashboard.html'

        })
        .state('customers.grid', {
          url: '/grid', //http://localhost:3000/#/grid
          controller: 'CustomersGridController as customersGridCtrl',
          templateUrl: 'app/customers/customers.grid.html'
        })
        .state('customers.detail', {
          url: '/detail/:id', //http://localhost:3000/#/customer/detail/
          controller: 'CustomersDetailController as customersDetailCtrl',
          templateUrl: 'app/customers/customers.detail.html'
        })
        .state('customers', {
          url: '/customers',
          abstract: true,
          template: '<div ui-view></div>'

        })
        .state('sales.grid', {
          url: '/grid', //http://localhost:3000/#/grid
          controller: 'SalesGridController as salesGridCtrl',
          templateUrl: 'app/sales/sales.grid.html'
        })
        .state('sales.detail', {
          url: '/detail/:id', //http://localhost:3000/#/sales/detail/
          controller: 'SalesDetailController as salesDetailCtrl',
          templateUrl: 'app/sales/sales.detail.html'
        })
        .state('sales', {
          url: '/sales',
          abstract: true,
          template: '<div ui-view></div>'
        })
        .state('vehicles.grid', {
          url: '/grid', //http://localhost:3000/#/grid
          controller: 'VehiclesGridController as vehiclesGridCtrl',
          templateUrl: 'app/vehicles/vehicles.grid.html'
        })
        .state('vehicles.detail', {
          url: '/detail/:id', //http://localhost:3000/#/sales/detail/
          controller: 'VehiclesDetailController as vehiclesDetailCtrl',
          templateUrl: 'app/vehicles/vehicles.detail.html'
        })
        .state('vehicles', {
          url: '/vehicles',
          abstract: true,
          template: '<div ui-view></div>'
        });
    });
})();
