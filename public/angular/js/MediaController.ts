namespace App {
    export class MediaController {
        static $inject = ['$http', '$state', 'MediaService'];

        private httpService;
        private stateService;
        private mediaService;

        public releaseList;
        public currentRelease;

        constructor (
            $http: angular.IHttpService,
            $state: angular.ui.IState,
            mediaService: App.MediaService
        ) {
            this.httpService = $http;
            this.stateService = $state;
            this.mediaService = mediaService;

            // this.releaseObject = {};

            // console.log ('- test: ', this.stateService);

            this.releaseList = [];

            this.getReleaseList ();
        }

        public getReleaseList () {
            console.log ('inside getReleaseList');

            this.mediaService.getReleaseList()
                .success ((response) => {
                    console.info ('This is the response: ', response);
                    this.releaseList = response;
                })
                .error ((response) => {
                    console.error ('There was an error with the getReleaseList.');
                })
        }

        public getRelease (id) {
            console.log ('inside getRelease');
            this.mediaService.getRelease(id)
            .success ((response) => {
                console.log ('Test data: ', response);
                // this.postList = response;
                this.currentRelease = response [0];
            })
            .error ((response) => {
            });
        }

        public editRelease (releaseId) {
            console.log ('release id: ' + releaseId);

            this.stateService.go ('release',
                {
                    id: releaseId
                }
            );
        }

        public test () {
            console.log ('***** TEST ****');
        }
    }
}
