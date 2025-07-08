angular.module('appKitInboxDemo',[
	'appKitCommon',
	'appKit',
	'icheck',
	'bootstrapWysiwyg'
]).controller('AppKitInboxDemo', function($scope, $uibModal) {
	'use strict';

	$scope.fullscreen = false;

	$scope.open = function() {
		$uibModal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'inboxModalContent.html',
			windowTemplateUrl: '/cth/Public/Admin/tpl/uib-modal-window.html'
		});
	};
});
