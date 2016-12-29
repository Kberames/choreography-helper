namespace App {
    export class ReleaseController {
        static $inject = ['$http', '$state', 'ReleaseService', 'TrackService'];

        private httpService;
        private stateService;
        private releaseService;
        private trackService;

        public release;
        public releaseList;
        public mode;
        public currentRelease;

        constructor (
            $http: angular.IHttpService,
            $state: angular.ui.IState,
            releaseService: App.ReleaseService,
            trackService: App.TrackService
        ) {
            this.httpService = $http;
            this.stateService = $state;
            this.releaseService = releaseService;
            this.trackService = trackService;

            // this.releaseObject = {};

            console.log ('Release constructor : ', this.stateService);
            if (this.stateService.current.name == 'release') {
                // this.releaseList = [];
                this.getReleaseList ();
            }
            else if (this.stateService.params.id) {
                    console.log ('*** Release constructor id:' + this.stateService.params.id);
                    this.getRelease(this.stateService.params.id);
            }
            else {
                console.log ('*** Release constructor NEW BLANK RELEASE');
                // NEW BLANK RELEASE
            }
        }

        public getReleaseList () {
            console.log ('inside getReleaseList');

            this.releaseService.getReleaseList()
                .success ((response) => {
                    console.info ('This is the response: ', response);
                    this.releaseList = response;
                })
                .error ((response) => {
                    console.error ('There was an error with the getReleaseList.');
                })
        }

        public getRelease (id) {
            // console.log ('inside getRelease');
            // this.releaseService.getRelease(id)
            // .success ((response) => {
            //     console.log ('Test data: ', response);
            //     // this.postList = response;
            //     this.currentRelease = response [0];
            // })
            // .error ((response) => {
            // });
            console.log ('*** ReleaseController - getRelease parameters: ', this.stateService.params);
            this.httpService ({
              url: '/release/' + this.stateService.params.id,
              method: 'GET'
            })
            .success ((response) => {
              console.log ('getRelease success: ' + response);
              this.release = response;
            })
            .error (() => {
            })
        }

        public createRelease () {
            console.log ('*** ReleaseController createRelease.');

            // this.stateService.go ('release-edit', {});
            this.goToPage ('release-create', {});
            // this.goToPage ('release-edit', {id: '5840967c24054afa20934b2d'});
        }

        public viewRelease (releaseId) {
            console.log ('*** ReleaseController viewRelease release id: ' + releaseId);

            this.stateService.go ('release-view',
                {
                    id: releaseId
                }
            );
        }

        public editRelease (releaseId) {
            console.log ('*** ReleaseController editRelease release id: ' + releaseId);

            this.stateService.go ('release-edit',
                {
                    id: releaseId
                }
            );
        }

        public saveRelease () {
            console.log ('release save method fired for release: ' + this.stateService.params.id);

            let method;
            let url;

            if (this.release._id) {
                method = 'PUT';
                url = '/release/' + this.release._id;
            }
            else {
                method = 'POST';
                url = '/release';
            }
            // let updateID = this.stateService.params.id;

            this.httpService ({
                url: url,
                method: method,
                data: this.release
            })
            .success ((response) => {
                console.log ('Release was saved.');
                // this.stateService.go ('release-list');
                this.goToPage ('release', {});
            })
            .error (() => {
            })

        }

        public viewTrack (trackId) {
            console.log ('*** ReleaseController view track id: ' + trackId);

            this.stateService.go ('track-view',
                {
                    id: trackId
                }
            );
        }

        public createTrack (releaseId) {
            console.log ('*** ReleaseController createTrack release id: ' + releaseId);

            this.stateService.go ('track-create',
                {
                    // rel: '5840967c24054afa20934b2d',
                    releaseId: releaseId
                }
            );
        }

        public viewPresenter (presenterId) {
            console.log ('*** ReleaseController view presenter id: ' + presenterId);

            this.stateService.go ('presenter-view',
                {
                    id: presenterId
                }
            );
        }

        public createPresenter (releaseId) {
            console.log ('*** ReleaseController createPresenter release id: ' + releaseId);

            this.stateService.go ('presenter-create',
                {
                    // rel: '5840967c24054afa20934b2d',
                    releaseId: releaseId
                }
            );
        }

        public delete (id, track){
            console.log ('Delete release id:', id);
            console.log ('Delete release, track object:', track);

            for (let i = 0; i < track.length; i++ ) {
                console.log ('Delete release, track %s id: %s', i, track[i]._id);
                this.trackService.delete (track[i]._id)
                    .success ((response) => {
                    })
                    .error ((response) => {
                        console.error ('Unable to delete the track: ', response);
                    })
                    ;
            }

            this.releaseService.delete (id, track)
                .success ((response) => {
                    this.goToPage ('release', {});
                })
                .error ((response) => {
                    console.error ('Unable to delete the release: ', response);
                })
                ;
        }

        public goToPage (route, data){
            console.log ('goToPage: ' + route)
            this.stateService.go (route, data);
        }

        public test () {
            console.log ('***** TEST ****');
        }
    }
}
