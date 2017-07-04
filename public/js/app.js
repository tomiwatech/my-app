	// create the module and name it scotchApp
	var app = angular.module('scotchApp', ['ui.router']);
   

   app.config(function($stateProvider,$urlRouterProvider){

   	 $stateProvider

	      .state('home', {
	        url: '/home',
	        templateUrl: 'templates/home.html',
	        controller: 'mainController'
	      })


	      .state('about', {
	        url: '/about',
	        templateUrl: 'templates/about.html',
	        controller: 'aboutContoller'
	      })

	       .state('chat', {
	        url: '/chat',
	        templateUrl: 'templates/chat.html',
	        controller: 'chatController'
	      })


	      .state('contact', {
	        url: '/contact',
	        templateUrl: 'templates/contact.html',
	        controller: 'contactController'
	      })

      $urlRouterProvider.otherwise('home');
   });


   app.controller('mainController',function($scope){
      
      $scope.data = {
	      	name: 'Sanni Michael Tomiwa',
	      	designation: 'Software Engineer',
	      	discipline: 'Computer Science'
	      }

     })

   app.controller('aboutContoller',function($scope){
      
       $scope.message = 'Hello'

    })

    app.controller('contactController',function($scope){
      
      $scope.message = "Welcome"

   })

    app.controller('chatController',function($scope){
      
      $scope.message = "Welcome"

   })