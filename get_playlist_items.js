const https = require("https");

function getPlaylistItems(playlistId) {
    return function (accessToken, callback) {
        const endpoint = 'api.spotify.com'
        const queryParams = encodeURI('fields=tracks.items(track(name,external_urls))')

        const path = `/v1/playlists/${playlistId}?${queryParams}`

        const options = {
            hostname: endpoint,
            path,
            headers: {
                "Authorization" : "Bearer " + accessToken
            }
        };

        const req = https.get(options, res => {
            let response = ""
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                response = response + chunk
            });
            res.on('end', () => {
                if (res.statusCode !== 200) {
                    return callback(new Error(response))
                }
                let parsedResponse;
                try {
                    parsedResponse = JSON.parse(response)
                } catch(err) {
                    return callback(err)
                }
                return callback(null, parsedResponse)
            });
        })
        req.on("error", callback)
    }
}

module.exports = getPlaylistItems