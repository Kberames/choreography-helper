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
                console.log ('Passed parameters: ', this.stateService.params);

                this.httpService ({
                  url: '/media/track/' + this.stateService.params.id,
                  method: 'GET'
                })
                .success ((response) => {
                  console.log (response);
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
            console.log ('track save method fired for track: ' + this.stateService.params.id);

            let method = '';
            let url = '';

            let updateID = this.stateService.params.id;

            if (updateID == -1) {
                method = 'POST';
                url = '/media/track';
            }
            else {
                method = 'PUT';
                url = '/media/track/' + updateID;
            }

            this.httpService ({
                // Need to include media the path.
                url: url,
                method: method,
                data: this.track
            })
            .success ((response) => {
                console.log ('Track was saved.');
                this.stateService.go ('media');
            })
            .error (() => {
            })

        }
    }
}
