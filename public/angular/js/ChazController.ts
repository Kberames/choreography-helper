namespace App {
    export class ChazController {
        static $inject = ['$http'];

        private httpService;

        constructor (
            $http: angular.IHttpService) {
            this.httpService = $http;

            console.log ('This is my ChazController');
        }
    }
}
