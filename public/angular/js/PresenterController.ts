namespace App {
    export class PresenterController {
        static $inject = ['$http', '$state', 'PresenterService'];

        private httpService;
        private stateService;
        private presenterService;

        public presenter;
        public list;

        constructor (
            $http: angular.IHttpService,
            $state: angular.ui.IState,
            presenterService: App.PresenterService
        ) {
            this.httpService = $http;
            this.stateService = $state;
            this.presenterService = presenterService;

            console.log ('*** parameters passed into presenter constructor: ', this.stateService.params);

            if (this.stateService.params.id) {
                this.read (this.stateService.params.id);
            }

            if (this.stateService.params.releaseId) {

                this.presenter = {
                    release: this.stateService.params.releaseId
                    }
            }
        }

        public read (id) {
            this.presenterService.read (id)
                .success ((response) => {
                    if (id) {
                        this.presenter = response;
                    }
                    else {
                        this.list = response;

                    }
                })
                .error ((response) => {
                    console.error ('Unable to read presenters: ', response);
                });
        }

        public savePresenter () {

            let updateID;
            let method;
            let url;

            if (this.presenter._id) {
                updateID = this.presenter._id;
                method = 'PUT';
                url = '/presenter/' + updateID;
            }
            else {
                updateID = -1;
                method = 'POST';
                url = '/presenter';
            }

            // console.log ('updateID: ' + updateID);

            this.httpService ({
                url: url,
                method: method,
                data: this.presenter
            })
            .success ((response) => {
                console.log ('Presenter was saved.');
                this.stateService.go ('release-view');
            })
            .error (() => {
            })

        }

        public delete (id, release){
            console.log ('Delete presenter id:', id);
            console.log ('Delete presenter, release id:', release);
            this.presenterService.delete (id)
                .success ((response) => {
                    this.goToPage ('release', {id: release});
                })
                .error ((response) => {
                    console.error ('Unable to delete the presenter: ', response);
                })
                ;
        }

        public goToPage (route, data){
            this.stateService.go (route, data);
        }
    }
}
