const fs = require("fs");
const getAccessToken = require("./get_access_token");
const getPlaylistItems = require("./get_playlist_items");
const getMultipleInputs = require("./get_multiple_inputs");
const pipeAsync = require("./pipe_async")

getMultipleInputs(['clientId', 'clientSecret', 'playlistId'], (err, res) => {
    const { clientId, clientSecret, playlistId } = res;
    
    pipeAsync({clientId, clientSecret}, [
        getAccessToken,
        getPlaylistItems(playlistId),
        handlePlayListItems
        ]
    )
})

function handlePlayListItems(data) {
    const items = data
    const parsedData = items.map(item => {
        const name = item.track.name;
        const url = item.track.external_urls.spotify
        return {name, url}
    })
    fs.writeFile("output.json", JSON.stringify(parsedData), 
        () => console.log(`finished, wrote ${items.length} tracks to output.json`))
}

