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
            .state ('release', {
                url: '/media/release',
                templateUrl: '/angular/templates/release.html',
                controller: App.ReleaseController,
                controllerAs: 'releaseController',
                    params: {
                      id: null
                    }
            })
            .state ('presenter', {
                url: '/media/presenter',
                templateUrl: '/angular/templates/presenter.html',
                controller: App.PresenterController,
                controllerAs: 'presenterController',
                    params: {
                      id: null
                    }
            })
            .state ('track-create', {
                url: '/track/create/:releaseId',
                templateUrl: '/angular/templates/track/track-edit.html',
                controller: App.TrackController,
                controllerAs: 'trackController'
                ,
                    params: {
                      releaseId: null
                    }
            })
            .state ('track-view', {
                url: '/track/:id',
                templateUrl: '/angular/templates/track/track-view.html',
                controller: App.TrackController,
                controllerAs: 'trackController'
            })
            .state ('track-edit', {
                url: '/track/:id',
                templateUrl: '/angular/templates/track/track-edit.html',
                controller: App.TrackController,
                controllerAs: 'trackController'
            })
            ;
        }
    ]);
}
