namespace App {
    export class PresenterController {
        static $inject = ['$http', '$state'];

        private httpService;
        private stateService;

        public presenter;

        constructor (
            $http: angular.IHttpService,
            $state: angular.ui.IState,
        ) {
            this.httpService = $http;
            this.stateService = $state;

            console.log ('Passed parameters: ', this.stateService.params);
            this.httpService ({
              url: '/media/presenter/' + this.stateService.params.id,
              method: 'GET'
            })
            .success ((response) => {
              console.log (response);
              this.presenter = response;
            })
            .error (() => {
            })
        }

        public savePresenter () {
            console.log ('presenter save method fired for presenter: ' + this.stateService.params.id);

            let updateID = this.stateService.params.id;

            this.httpService ({
                // Need to include media the path.
                url: '/media/presenter/' + updateID,
                method: 'PUT',
                data: this.presenter
            })
            .success ((response) => {
                console.log ('Presenter was saved.');
                this.stateService.go ('media');
            })
            .error (() => {
            })

        }
    }
}
