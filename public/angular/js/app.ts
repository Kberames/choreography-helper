namespace App {
    let app = angular.module ('App', ['ui.router', 'ui.bootstrap']);


    app.config ([
        '$stateProvider',

        ($stateProvider) => {
            $stateProvider
            .state ('chaz', {
                url: '/',
                templateUrl: '/angular/templates/chaz.html',
                controller: App.ChazController,
                controllerAs: 'chazController'
            })
            .state ('media', {
                url: '/media',
                templateUrl: '/angular/templates/media.html',
                controller: App.MediaController,
                controllerAs: 'mediaController'
            })
            ;
        }
    ]);
}
