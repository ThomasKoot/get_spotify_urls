# get_spotify_urls
NodeJS based command line app built for a client who needed to get the spotify urls of the tracks in a playlist containing 1000+ tracks.

Requires Node version >= 12.16, no additional dependencies

Run the app by running the "node index" command. You are prompted for a clientId, clientSecret and playlistId. For the clientId & clientSecret you need to register with Spotify as a developer, which is pretty simple. To get the playlistId, you can just copy the playlistlink from spotify, the ID will be the string right after /playlist/ . You could probably write a clever script using the search-API to find the ID, but since I only used this app a couple of times I decided to just do it manually. 

The output is written to output.json in the project directory. It containes an array of objects with the structure:
<br>{
  <br>name: \<string\>, 
  <br>url: \<string\>
<br>}

