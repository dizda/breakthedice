//Articles service used for articles REST endpoint
angular.module('mean.bank').factory("Bank", ['$resource', function($resource) {
//    return $resource('bank/:articleId', {
//        articleId: '@_id'
//    }, {
//        update: {
//            method: 'PUT'
//        }
//    });
    return $resource('bank/:operation', {}, {
        withdraw: {params: {operation: 'withdraw'}}
    });
}]);