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

        public saveTrack () {
            console.log ('track save method fired for track: ' + this.stateService.params.id);

            let updateID = this.stateService.params.id;

            this.httpService ({
                // Need to include media the path.
                url: '/media/track/' + updateID,
                method: 'PUT',
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
