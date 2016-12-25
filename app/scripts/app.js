'use strict';

/**
 * @ngdoc overview
 * @name meanFullStackCourseraApp
 * @description
 * # meanFullStackCourseraApp
 *
 * Main module of the application.
 */
var app = angular
  .module('app', [
    //'ngAnimate',
    //'ngAria',
    //'ngCookies',
    //'ngMessages',
    'ngResource',
    'ui.router',
    'ui.bootstrap'
    //'ngSanitize',
    //'ngTouch'
  ])
  .config(function($stateProvider, $urlRouterProvider) {
      
      //$qProvider.errorOnUnhandledRejections(false);
      //angular.module('ng').$qProvider.errorOnUnhandledRejections(false);
      //var $injector2 = window.angular.injector(['ng']);
      //$injector2.invoke(['$qProvider', function($qProvider) {
      //      $qProvider.errorOnUnhandledRejections(false);
      //}]);
      
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
          views: {
              'Header': {
                templateUrl: 'views/header.html',
                controller: 'HeaderCtrl'
              },
              'Content': {
                templateUrl: 'views/home.html',
                //controller: 'HomeCtrl',
              },
              'Footer': {
                templateUrl: 'views/footer.html',
                //controller: 'FooterCtrl'
              }
          }
        })
        .state('video', {
          url: '/video/:id',
          views: {
              'Header': {
                templateUrl: 'views/header.html',
                controller: 'HeaderCtrl'
              },
              'Content': {
                templateUrl: 'views/video.html',
                //controller: 'HomeCtrl',
              },
              'Footer': {
                templateUrl: 'views/footer.html',
                //controller: 'FooterCtrl'
              }
          }
        })
        $urlRouterProvider.otherwise('/land');
})

/* correct the error on inject ui.router */
/*app.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);*/

