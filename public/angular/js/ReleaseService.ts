namespace App {
    export class ReleaseService {
        static $inject = ['$http'];

        private httpService;

        constructor ($http: angular.IHttpService) {
            this.httpService = $http;
            this.getReleaseList();
        }

        public getReleaseList () {
            let promise = this.httpService ({
                url: '/release',
                method: 'GET'
            });

            return promise;
        }

        public getRelease (id) {

            let promise = this.httpService ({
                url: '/release',
                method: 'GET',
                params: {
                    id: id
                }
            });

            return promise;
        }

        public delete (id, track) {
            let promise = this.httpService ({
                url: '/release/' + id + '/delete',
                method: 'GET',
                data: {
                    id: id,
                    track: track
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            return promise;
        };

    }

    let app = angular.module ('App');
    app.service ('ReleaseService', ReleaseService);
}
