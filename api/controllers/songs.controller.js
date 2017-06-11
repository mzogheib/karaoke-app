module.exports = {
    getAll: getAll
};

function getAll(req, res) {
    var songs = [
        {
            id: 1,
            title: 'What\'s New Pussycat',
            artist: {
                id: 3,
                name: 'Tom Jones'
            }
        },
        {
            id: 2,
            title: 'For Your Love',
            artist: {
                id: 4,
                name: 'The Yardbirds'
            }
        }
    ];

    var response = {
        status: 200,
        message: songs
    };

    res
        .status(response.status)
        .json(response.message);
}