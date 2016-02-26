(function() {
    angular.module('order-directives', [])

    // directives make HTML easier, pull in subfiles without much effort.
    // <product-title></>
    .directive('recentOrdersTable', function() {
        return {
            restrict: 'E',
            templateUrl: 'components/recent-orders-table.html',
			controller: ['$scope','$http', function($scope,$http) {
		        $http({
		            method: 'GET',
		            url: 'files/orders.json'
		        }).then(function successCallback(response) {
		            $scope.ordersList = response.data;
		            console.log("Got order JSON");

					// Add "time ago" item to each row. Better than showing DT in raw format.
		            angular.forEach($scope.ordersList, function(item) {
		                item.timeAgo = timeSince(new Date(item.dt));
		            });
		        }, function errorCallback(response) {
		            console.log("Order JSON req failed");
		        });
			}],
			controllerAs: 'Orders'
        };
    });		
	function timeSince(date) {

	    var seconds = Math.floor((new Date() - date) / 1000);

	    var interval = Math.floor(seconds / 31536000);

	    if (interval > 1) {
	        return interval + " years";
	    }
	    interval = Math.floor(seconds / 2592000);
	    if (interval > 1) {
	        return interval + " months";
	    }
	    interval = Math.floor(seconds / 86400);
	    if (interval > 1) {
	        return interval + " days";
	    }
	    interval = Math.floor(seconds / 3600);
	    if (interval > 1) {
	        return interval + " hours";
	    }
	    interval = Math.floor(seconds / 60);
	    if (interval > 1) {
	        return interval + " minutes";
	    }
	    return Math.floor(seconds) + " seconds";
	}


})();