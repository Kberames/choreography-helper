namespace App {
    export class PdfController {
        static $inject = ['$http', '$state', '$scope'];

        private httpService;
        private stateService;
        private scopeService;

        public track;

        constructor (
            $http: angular.IHttpService,
            $state: angular.ui.IState,
            $scope: angular.IScope
        ) {
            this.httpService = $http;
            this.stateService = $state;
            this.scopeService = $scope;

            this.scopeService.pdfName = 'BODYPUMP88';
            this.scopeService.pageNum = 12;
            this.scopeService.pdfUrl = '/CHOREY/BODYPUMP88.pdf';
            this.track = 1;

            this.scopeService.scroll = 0;

            // NOTE: Removed.  Causing errors.  Not needed.
        // this.scopeService.loading = 'loading';

            this.scopeService.getNavStyle = function (scroll) {
                // DEBUG:
                // console.log ('*** getNavStyle scroll: ' + scroll);

              if(scroll > 100) return 'pdf-controls fixed';
              else return 'pdf-controls';
            }

            this.scopeService.onError = function (error) {
              console.log(error);
            }

            // NOTE: Removed.  Causing errors.  Not needed.
            // this.scopeService.onLoad = function () {
            //   this.scopeService.loading = '';
            // }

            // DEBUG:
            // console.log ('*** PLAYLIST ***');
        }

        public goToPage (direction) {
            // DEBUG:
            // console.log ('goToPage direction: ' + direction);
            // console.log ('goToPage current track: ' + this.track);

            let newTrack = this.track;
            if (direction == 'next' &&
                this.track < 10) {
                    newTrack++;
                }
            else if (direction == 'back' &&
                this.track > 1) {
                    newTrack--;
                }

            console.log ('goToPage new track: ' + newTrack);

            if (newTrack != this.track) {
                this.track = newTrack;

                if (newTrack == 1) {
                    this.scopeService.pdfName = 'BODYPUMP88';
                    this.scopeService.pageNum = 12;
                    this.scopeService.pdfUrl = '/CHOREY/BODYPUMP88.pdf';
                }
                else if (newTrack == 2) {
                    this.scopeService.pdfName = 'BODYPUMP89';
                    this.scopeService.pageNum = 12;
                    this.scopeService.pdfUrl = '/CHOREY/BODYPUMP89.pdf';
                }
                else if (newTrack == 3) {
                    this.scopeService.pdfName = 'BODYPUMP91';
                    this.scopeService.pageNum = 16;
                    this.scopeService.pdfUrl = '/CHOREY/BODYPUMP91.pdf';
                }
                else if (newTrack == 4) {
                    this.scopeService.pdfName = 'BODYPUMP92';
                    this.scopeService.pageNum = 18;
                    this.scopeService.pdfUrl = '/CHOREY/BODYPUMP92.pdf';
                }
                else if (newTrack == 5) {
                    this.scopeService.pdfName = 'BODYPUMP94';
                    this.scopeService.pageNum = 22;
                    this.scopeService.pdfUrl = '/CHOREY/BODYPUMP94.pdf';
                }
                else if (newTrack == 6) {
                    this.scopeService.pdfName = 'BODYPUMP88';
                    this.scopeService.pageNum = 22;
                    this.scopeService.pdfUrl = '/CHOREY/BODYPUMP88.pdf';
                }
                else if (newTrack == 7) {
                    this.scopeService.pdfName = 'BODYPUMP89';
                    this.scopeService.pageNum = 22;
                    this.scopeService.pdfUrl = '/CHOREY/BODYPUMP89.pdf';
                }
                else if (newTrack == 8) {
                    this.scopeService.pdfName = 'BODYPUMP91';
                    this.scopeService.pageNum = 26;
                    this.scopeService.pdfUrl = '/CHOREY/BODYPUMP91.pdf';
                }
                else if (newTrack == 9) {
                    this.scopeService.pdfName = 'BODYPUMP92';
                    this.scopeService.pageNum = 32;
                    this.scopeService.pdfUrl = '/CHOREY/BODYPUMP92.pdf';
                }
                else if (newTrack == 10) {
                    this.scopeService.pdfName = 'BODYPUMP94';
                    this.scopeService.pageNum = 34;
                    this.scopeService.pdfUrl = '/CHOREY/BODYPUMP94.pdf';
                }
                // DEBUG:
                // console.log ('pageNum: ' + this.scopeService.pageNum);
            }
        }

    }
}
