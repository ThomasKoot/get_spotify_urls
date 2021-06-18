const https = require("https");

function getPlaylistItems(playlistId) {
    let nextPath;
    let tracks = []
    return function getPlaylistItemsIteration(accessToken, callback) {
        const endpoint = 'api.spotify.com'
        const queryParams = encodeURI('fields=offset,next,previous,total,items(track(name,external_urls))')

        const path = nextPath ? 
            nextPath.replace("https://api.spotify.com", "") :
            `/v1/playlists/${playlistId}/tracks?${queryParams}`

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
                tracks = tracks.concat(parsedResponse.items);
                if (parsedResponse.next) {
                    nextPath = parsedResponse.next
                    return getPlaylistItemsIteration(accessToken, callback)
                } else {
                    return callback(null, tracks)
                }
            });
        })
        req.on("error", callback)
    }
}

module.exports = getPlaylistItems