namespace App {
    export class ReleaseController {
        static $inject = ['$http', '$state', 'TrackService'];

        private httpService;
        private stateService;
        private trackService;

        public release;
        public releaseList;
        public mode;


        constructor (
            $http: angular.IHttpService,
            $state: angular.ui.IState,
            trackService: App.TrackService
        ) {
            this.httpService = $http;
            this.stateService = $state;
            this.trackService = trackService;

            console.log ('*** ReleaseController - Passed parameters: ', this.stateService.params);
            this.httpService ({
              url: '/media/release/' + this.stateService.params.id,
              method: 'GET'
            })
            .success ((response) => {
              console.log (response);
              this.release = response;
            })
            .error (() => {
            })
        }

        public saveRelease () {
            console.log ('release save method fired for release: ' + this.stateService.params.id);

            let updateID = this.stateService.params.id;

            this.httpService ({
                // Need to include media the path.
                url: '/media/release/' + updateID,
                method: 'PUT',
                data: this.release
            })
            .success ((response) => {
                console.log ('Release was saved.');
                this.stateService.go ('media');
            })
            .error (() => {
            })

        }

        public viewTrack (trackId) {
            console.log ('*** ReleaseController view track id: ' + trackId);

            this.stateService.go ('track-view',
                {
                    id: trackId
                }
            );
        }

        public createTrack (releaseId) {
            console.log ('createTrack release id: ' + releaseId);

            this.stateService.go ('track-create',
                {
                    // rel: '5840967c24054afa20934b2d',
                    releaseId: releaseId
                }
            );
        }

        public viewPresenter (presenterId) {
            console.log ('*** ReleaseController view presenter id: ' + presenterId);

            this.stateService.go ('presenter-view',
                {
                    id: presenterId
                }
            );
        }

        public createPresenter (releaseId) {
            console.log ('createPresenter release id: ' + releaseId);

            this.stateService.go ('presenter-create',
                {
                    // rel: '5840967c24054afa20934b2d',
                    releaseId: releaseId
                }
            );
        }

    }
}
