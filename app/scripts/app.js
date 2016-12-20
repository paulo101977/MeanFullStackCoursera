'use strict';

/**
 * @ngdoc overview
 * @name meanFullStackCourseraApp
 * @description
 * # meanFullStackCourseraApp
 *
 * Main module of the application.
 */
angular
  .module('app', [
    //'ngAnimate',
    //'ngAria',
    //'ngCookies',
    //'ngMessages',
    //'ngResource',
    'ui.router',
    //'ngSanitize',
    //'ngTouch'
  ])
  .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('land', {
          url: '/land',
          //templateUrl: 'views/land.html',
          views: {
              'Content': {
                templateUrl: 'views/land.html',
                controller: 'LandCtrl'
              }
          }
        })
        .state('home', {
          url: '/home',
          //templateUrl: 'views/land.html',
          views: {
              'Header': {
                templateUrl: 'views/header.html',
                controller: 'HeaderCtrl'
              },
              'Content': {
                templateUrl: 'views/home.html',
                controller: 'HomeCtrl'
              },
              'Footer': {
                templateUrl: 'views/footer.html',
                controller: 'FooterCtrl'
              }
          }
        })
      
        $urlRouterProvider.otherwise('/land');
})
