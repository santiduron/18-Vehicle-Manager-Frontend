(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .factory('dashboardFactory', dashboardFactory)

  dashboardFactory.$inject = [];

  /* @ngInject */
  function dashboardFactory() {
    var service = {
      getAll: getAll,
      getById: getById,
      create: create,
      remove: remove,
      update: update
    };
    return service;

    function getAll() {
      return $http
        .get(apiUrl + 'dashboard/')
        .then(function(response) {
          return response.data;
        });

    }

    function getById(id) {
      return $http
        .get(apiUrl + 'dashboard/' + id)
        .then(function(response) {
          return response.data;
        });
    }

    function update(id, board) {
      return $http.put(apiUrl + 'dashboard/' + id, board);
    }

    function create() {
      return $http
        .post(apiUrl + 'dashboard/', board)
        .then(function(response) {
          return response.data;
        });
    }

    function remove(id) {
      return $http
        .delete(apiUrl + 'dashboard/' + id)
        .then(function(response) {
          return response.data;
        });
    }

  }
})();
