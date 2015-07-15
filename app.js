(function () {
  'use strict';

  angular
    .module('broadcast', [])
    .controller('MainController', function ($scope, CrudService) {
      CrudService.getAll().success(function (items) {
        $scope.items = items;
      });

      $scope.$on('item:added', function () {
        CrudService.getAll().success(function (items) {
          $scope.items = items;
        });
      });



      $scope.addItem = function (newItem) {
        CrudService.addOne(newItem);
      };

      $scope.deleteOne = function (index) {
        CrudService.deleteOne(index);
      };

    })
    .factory('CrudService', function ($rootScope, $http) {
      var items = [
        {
          title: 'Macbook',
          price: 1000
        },
        {
          title: 'iPad',
          price: 600
        }
      ];
      var url = 'http://tiy-fee-rest.herokuapp.com/collections/broadcast'

      var getItems = function () {
        return $http.get(url);
      };

      var getItem = function (index) {
        return items[index];
      };

      var addItem = function (newItem) {
        $http.post(url, newItem).then(function (data) {
          $rootScope.$broadcast('item:added');
        });
      };

      var removeItem = function (index) {
        items.splice(index, 1);
      };
      var updateItem =function (index, item) {
        items[index] = item;
      };
      return {
        getAll: getItems,
        getOne: getItem,
        addOne: addItem,
        deleteOne: removeItem,
        updateOne: updateItem
      };




    });

})();
