namespace App {
    // Grab the app module.
    let app = angular.module ('App');

    export class PlaylistService {
        static $inject = ['$http'];

        private httpService;

        // Pull in the dependency services.
        constructor ($httpService: angular.IHttpService) {

            // Point the internal httpService to the
            // $httpService passed to us by angular.
            this.httpService = $httpService;
        }

        public getPlaylistList () {
            let promise = this.httpService ({
                url: '/playlist',
                method: 'GET'
            });

            return promise;
        }

        public getPlaylist (id) {

            let promise = this.httpService ({
                url: '/playlist',
                method: 'GET',
                params: {
                    id: id
                }
            });

            return promise;
        }

        public delete (id) {
            let promise = this.httpService ({
                url: '/playlist/' + id + '/delete',
                method: 'GET',
                data: {
                    id: id
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            return promise;
        };
    };

    // Register the class as an angular service.
    app.service ('PlaylistService', PlaylistService);
}
