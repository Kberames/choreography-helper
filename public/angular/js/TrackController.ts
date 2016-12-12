namespace App {
    export class TrackController {
        static $inject = ['$http', '$state'];

        private httpService;
        private stateService;

        public track;

        constructor (
            $http: angular.IHttpService,
            $state: angular.ui.IState,
        ) {
            this.httpService = $http;
            this.stateService = $state;

            if (this.stateService.params) {
                console.log ('*** parameters passed into track constructor: ', this.stateService.params);

                this.httpService ({
                    url: '/media/' + this.stateService.params.rel + '/track/' + this.stateService.params.id,
                    // url: '/media/track/' + this.stateService.params.id,
                     method: 'GET'
                })
                .success ((response) => {
                    console.log ('response: ', response);
                    this.track = response;
                })
                .error (() => {
                })
            }
            else {
                console.log ('creating new track - inside track constructor');
            }
        }

        public saveTrack () {

            let updateID;
            let method;
            let url;

            if (this.track._id) {
                updateID = this.track._id;
                method = 'PUT';
                url = '/media/track/' + updateID;
            }
            else {
                updateID = -1;
                method = 'POST';
                url = '/media/track';
            }

            // console.log ('updateID: ' + updateID);

            this.httpService ({
                // Need to include media the path.
                url: url,
                method: method,
                data: this.track
            })
            .success ((response) => {
                console.log ('Track was saved.');
                // this.stateService.go ('release/' + releaseId passsed in with -1 trackId);
                this.stateService.go ('media');
            })
            .error (() => {
            })

        }
    }
}
