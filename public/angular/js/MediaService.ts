namespace App {
    export class MediaService {
        static $inject = ['$http'];

        private httpService;
        public releaseList;

        constructor ($http: angular.IHttpService) {
            this.httpService = $http;
            this.getReleaseList();
        }

        public getReleaseList () {
            let promise = this.httpService ({
                url: '/media',
                method: 'GET'
            });

            return promise;
        }

    }

    let app = angular.module ('App');
    app.service ('MediaService', MediaService);
}
