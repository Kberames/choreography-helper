namespace App {
    export class ReleaseController {
        static $inject = ['$http', '$state'];

        private httpService;
        private stateService;

        public release;

        constructor (
            $http: angular.IHttpService,
            $state: angular.ui.IState,
        ) {
            this.httpService = $http;
            this.stateService = $state;

            console.log ('Passed parameters: ', this.stateService.params);
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
    }
}
