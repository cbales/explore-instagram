var exploreInstagram = angular.module('exploreInstagram', []);

function mainController($scope, $http) {
	$scope.formData = {};
	// when landing on the page, get all the todos and show them
	$http.get('/instagram')
		.success(function(data) {
			$scope.instagramToken = data.instagramToken;
			$scope.showLogin = data.showLogin;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	$scope.getPhotosByTag = function() {
		$http.post('/instagram', $scope.formData)
		.success(function(data) {
			$scope.taggedPhotos = data;
		})
		.error(function(data){
			console.log('Error: ' + data);
		});
	};
};