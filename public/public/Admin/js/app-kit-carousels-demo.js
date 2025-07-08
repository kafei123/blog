angular.module('appKitCarouselsDemo', [
	'appKitCommon',
	'appKit',
	'owlCarousel',
	'angular-flexslider'
]).controller('AppKitCarouselsDemo', function($scope) {
	'use strict';

	$scope.carouselOne = [
		{
			"image": "/cth/Public/Admin/images/carousels/slide-1.jpg",
			"title": "Carousel Caption One"
		}, {
			"image": "/cth/Public/Admin/images/carousels/slide-2.jpg",
			"title": "Carousel Caption Two"
		}, {
			"image": "/cth/Public/Admin/images/carousels/slide-3.jpg",
			"title": "Carousel Caption Three"
		}
	];

	$scope.carouselTwo = [
		'/cth/Public/Admin/images/carousels/slide-4.jpg',
		'/cth/Public/Admin/images/carousels/slide-5.jpg',
		'/cth/Public/Admin/images/carousels/slide-6.jpg'
	];

	$scope.carouselThree = [
		'/cth/Public/Admin/images/carousels/slide-sm-1.jpg',
		'/cth/Public/Admin/images/carousels/slide-sm-2.jpg',
		'/cth/Public/Admin/images/carousels/slide-sm-3.jpg',
		'/cth/Public/Admin/images/carousels/slide-sm-4.jpg',
		'/cth/Public/Admin/images/carousels/slide-sm-5.jpg',
		'/cth/Public/Admin/images/carousels/slide-sm-6.jpg',
		'/cth/Public/Admin/images/carousels/slide-sm-7.jpg',
		'/cth/Public/Admin/images/carousels/slide-sm-8.jpg'
	];
});
