namespace App {
    export class TrackController {
        static $inject = ['$http', '$state', 'TrackService'];

        private httpService;
        private stateService;
        private trackService;

        public track;
        public list;

        constructor (
            $http: angular.IHttpService,
            $state: angular.ui.IState,
            trackService: App.TrackService
        ) {
            this.httpService = $http;
            this.stateService = $state;
            this.trackService = trackService;

            console.log ('*** parameters passed into track constructor: ', this.stateService.params);

            if (this.stateService.params.id) {
                this.read (this.stateService.params.id);
            }

            if (this.stateService.params.releaseId) {

                this.track = {
                    release: this.stateService.params.releaseId
                    }
            }
        }

        public read (id) {
            this.trackService.read (id)
                .success ((response) => {
                    if (id) {
                        this.track = response;
                    }
                    else {
                        this.list = response;

                    }
                })
                .error ((response) => {
                    console.error ('Unable to read tracks: ', response);
                });
        }

        public saveTrack () {

            let updateID;
            let method;
            let url;

            if (this.track._id) {
                updateID = this.track._id;
                method = 'PUT';
                url = '/track/' + updateID;
            }
            else {
                updateID = -1;
                method = 'POST';
                url = '/track';
            }

            // console.log ('updateID: ' + updateID);

            this.httpService ({
                url: url,
                method: method,
                data: this.track
            })
            .success ((response) => {
                console.log ('Track was saved.');
                // this.stateService.go ('release/' + releaseId passsed in with -1 trackId);
                this.stateService.go ('release');
            })
            .error (() => {
            })

        }

        public delete (id, release){
            if (confirm ('Are you sure you want to delete ' +
                this.track.songTitle + ' ' + this.track.type + '?')) {
                console.log ('Delete track id:', id);
                console.log ('Delete track, release id:', release);
                this.trackService.delete (id)
                    .success ((response) => {
                        this.goToPage ('release', {id: release});
                    })
                    .error ((response) => {
                        console.error ('Unable to delete the track: ', response);
                    })
                    ;
            }
        }

        public viewPresenter (presenterId) {
            console.log ('*** TrackController view presenter id: ' + presenterId);

            this.stateService.go ('presenter-view',
                {
                    id: presenterId
                }
            );
        }

        public goToPage (route, data){
            this.stateService.go (route, data);
        }
    }
}
