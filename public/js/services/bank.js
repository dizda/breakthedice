'use strict';

//Articles service used for articles REST endpoint
angular.module('mean.bank').factory('Bank', ['$resource', function($resource) {
    return $resource('bank/:operation', {}, {
        withdraw: {params: {operation: 'withdraw'}}
    });
}]);