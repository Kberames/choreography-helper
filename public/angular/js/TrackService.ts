namespace App {
    // Grab the app module.
    let app = angular.module ('App');

    export class TrackService {
        static $inject = ['$http'];

        private httpService;

        // Pull in the dependency services.
        constructor ($httpService: angular.IHttpService) {

            // Point the internal httpService to the
            // $httpService passed to us by angular.
            this.httpService = $httpService;
        }

        // NOTE: POST /TrackService
        public create (track) {
            let promise = this.httpService ({
                url: '/track',
                method: 'POST',
                data: track,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            return promise;
        };

        public update (id, track) {
            let promise = this.httpService ({
                url: '/track/' + id,
                method: 'PUT',
                data: track,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            return promise;
        };

        public delete (id) {
            let promise = this.httpService ({
                url: '/track/' + id + '/delete',
                method: 'GET',
                data: {},
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            return promise;
        };

        public read (id) {
            let url = '/track';


            if (id) {
                url += '/' + id;
            }
            // console.log ('*** prod service read');
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
    app.service ('TrackService', TrackService);
}
