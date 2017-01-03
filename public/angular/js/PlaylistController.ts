namespace App {
    export class PlaylistController {
        static $inject = ['$http', '$state', '$scope', 'PlaylistService'];

        private httpService;
        private stateService;
        private playlistService;
        private scopeService;

        public playlist;
        public list;

        public track;

        constructor (
            $http: angular.IHttpService,
            $state: angular.ui.IState,
            $scope: angular.IScope,
            playlistService: App.PlaylistService
        ) {
            this.httpService = $http;
            this.stateService = $state;
            this.scopeService = $scope;
            this.playlistService = playlistService;

            console.log ('*** parameters passed into playlist constructor: ', this.stateService.params);

            // if (this.stateService.current.name == 'pdf') {
            //     this.getPlaylist(this.stateService.params.id);
            //     this.displayPDF ();
            // }
            if (this.stateService.current.name == 'playlist') {
                this.getPlaylistList ();
            }
            else if (this.stateService.params.id) {
                    console.log ('*** Playlist constructor id:' + this.stateService.params.id);
                    this.getPlaylist(this.stateService.params.id);
            }
            else {
                console.log ('*** Playlist constructor NEW BLANK PLAYLIST');
            }
        }

        public getPlaylistList () {
            console.log ('inside getPlaylistList');

            this.playlistService.getPlaylistList()
                .success ((response) => {
                    console.info ('This is the response: ', response);
                    this.list = response;
                })
                .error ((response) => {
                    console.error ('There was an error with the getPlaylistList.');
                })
        }

        public getPlaylist (id) {
            console.log ('*** PlaylistController - getPlaylist parameters: ', this.stateService.params);
            this.httpService ({
              url: '/playlist/' + this.stateService.params.id,
              method: 'GET'
            })
            .success ((response) => {
              console.log ('getPlaylist success: ' + response);
              this.playlist = response;
              console.log ('*** playlist' + this.playlist.name);
              if (this.stateService.current.name == 'pdf') {
                //   console.log ('*** Playlist constructor PDF');
                //   console.log ('*** displayPDF playlist' + this.playlist);
                this.displayPDF ();
              }
            })
            .error (() => {
            })
        }

        public viewPlaylist (playlistId) {
            console.log ('*** PlaylistController viewPlaylist playlist id: ' + playlistId);

            this.stateService.go ('playlist-view',
                {
                    id: playlistId
                }
            );
        }

        public viewPDF (playlistId) {
            console.log ('*** PlaylistController viewPDF playlist id: ' + playlistId);

            this.stateService.go ('pdf',
                {
                    id: playlistId
                }
            );
        }

        public displayPDF () {
            console.log ('*** displayPDF playlist' + this.playlist.tracks);

            let pdfName = this.playlist.tracks[0].release.program + this.playlist.tracks[0].release.number;

            this.scopeService.pdfName = pdfName;
            this.scopeService.pageNum = this.playlist.tracks[0].pdfPage;
            this.scopeService.pdfUrl = '/CHOREY/' + pdfName + '.pdf';
            this.track = 1;

            this.scopeService.scroll = 0;

            this.scopeService.getNavStyle = function (scroll) {
              if(scroll > 100) return 'pdf-controls fixed';
              else return 'pdf-controls';
            }

            this.scopeService.onError = function (error) {
              console.log(error);
            }
        }

        public goToPDFPage (direction) {
            let newTrack = this.track;
            if (direction == 'next' &&
                this.track < 10) {
                    newTrack++;
                }
            else if (direction == 'back' &&
                this.track > 1) {
                    newTrack--;
                }

            if (newTrack != this.track) {
                this.track = newTrack;

                let pdfName = this.playlist.tracks[newTrack-1].release.program + this.playlist.tracks[newTrack-1].release.number;

                this.scopeService.pdfName = pdfName;
                this.scopeService.pageNum = this.playlist.tracks[newTrack-1].pdfPage;
                this.scopeService.pdfUrl = '/CHOREY/' + pdfName + '.pdf';
            }
        }
    }
}
