(function () {
    'use strict';

    angular
        .module('services.songs', [])
        .service('songsService', service);

    function service ($q) {
        var cache = {
            mySongs: [
                {
                    id: '1',
                    title: 'What\'s New Pussycat',
                    artist: {
                        id: '',
                        name: 'Tom Jones',
                        imageUrl: ''
                    },
                    averageRating: 4,
                    performances: [
                        {
                            createdAt: '',
                            timestamp: '',
                            rating: '4',
                            location: {},
                            remarks: ''
                        }
                    ]
                },
                {
                    id: '2',
                    title: 'For Your Love',
                    artist: {
                        id: '',
                        name: 'The Yardbirds',
                        imageUrl: ''
                    },
                    averageRating: 3,
                    performances: [
                        {
                            createdAt: '',
                            timestamp: '',
                            rating: '3',
                            location: {},
                            remarks: ''
                        }
                    ]
                }
            ]
        };

        this.getSongs = function () {
            return $q(function (resolve, reject) {
                // Calculate the average rating for each song
                resolve(cache.mySongs);
            });
        }
    }
})();
