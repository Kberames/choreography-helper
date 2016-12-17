namespace App {
    // Grab the app module.
    let app = angular.module ('App');

    export class PresenterService {
        static $inject = ['$http'];

        private httpService;

        // Pull in the dependency services.
        constructor ($httpService: angular.IHttpService) {

            // Point the internal httpService to the
            // $httpService passed to us by angular.
            this.httpService = $httpService;
        }

        // NOTE: POST /PresenterService
        public create (presenter) {
            let promise = this.httpService ({
                url: '/presenter',
                method: 'POST',
                data: presenter,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            return promise;
        };

        public update (id, presenter) {
            let promise = this.httpService ({
                url: '/presenter/' + id,
                method: 'PUT',
                data: presenter,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            return promise;
        };

        public delete (id) {
            let promise = this.httpService ({
                url: '/presenter/' + id + '/delete',
                method: 'GET',
                data: {},
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            return promise;
        };


        public read (id) {
            let url = '/presenter';


            if (id) {
                url += '/' + id;
            }
            let promise = this.httpService ({
                url: url,
                method: 'GET',
                data: {},
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log ('promise: ', promise);
            console.log ('url: ', url);
            console.log ('id: ', id);

            return promise;
        };
    };

    // Register the class as an angular service.
    app.service ('PresenterService', PresenterService);
}
