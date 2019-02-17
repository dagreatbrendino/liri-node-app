# liri-node-app
# liri-node-app
### Overview
This app allows users to provide command line inputs to execute serveral different api calls. Think of it as Siri with a much finer scope, and instead of voice input you provide command line inputs to get the information you are looking for. Watch this [Demo](https://www.youtube.com/watch?v=lXW1te_tjRg&feature=youtu.be) if you have trouble getting started!

### Technical Aspects
#### !!!Important Note!!!
**You will need to create a file named ".env" and populate it with an ID and Secret key. The file should read as below**
        
        # Spotify API keys

        SPOTIFY_ID=YOUR_CLIENT_ID
        SPOTIFY_SECRET=YOUR_CLIENT_SECRET

If you do not have these, visit https://developer.spotify.com/my-applications/#!/ and make an app to get them.
#### Node
Node is utilized so that the javascript can be run outside the browser. This app requires the following packages to run: [axios](https://www.npmjs.com/package/axios), [dotenv](https://www.npmjs.com/package/dotenv), [moment](https://www.npmjs.com/package/moment), and [node-spotfy-api](https://www.npmjs.com/package/node-spotify-api). If you run into any issues, be sure to make sure all of these packages are properly installed. A properly configured package should like similar to the one below.

``` javascript
  {
  "name": "liri-node-app",
  "version": "1.0.0",
  "description": "this app will utilize the spotify, bandsintown, and omdb apis",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/dagreatbrendino/liri-node-app.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/dagreatbrendino/liri-node-app/issues"
  },
  "homepage": "https://github.com/dagreatbrendino/liri-node-app#readme",
  "dependencies": {
    "axios": "^0.18.0",
    "dotenv": "^6.2.0",
    "moment": "^2.24.0",
    "node-spotify-api": "^1.0.7"
  }
}
```
* __axios__ - allows asychroneous calls to Bands In Town api and OMDB Api    
* __dotenv__ - uses .env to set environment variables to the process.env object so unique keys can be utilized for the Spotify API
* __moment__ - used for date format conversion
* __node-spotify-api__ - used for requesting Spotify objects

There are four commands that you can run from the command line.

  * node liri.js __concert-this__ __artist name__ - this will log upcoming shows for the **artist** using the Bands in Town API
  * node liri.js __spotify-this-song__ __song name__ - this will log information about the track pulled from the Spotify API search function for __song name__ if __song name__ is not provided then it will search _The Sign_ by default
  * node liri.js __movie-this__ __movie title__ - this will log information about the movie using the OMDB API axios request for __movie title__ if no __movie title__ is provided then it will search _Mr. Nobody_ by default
  * node liri.js __do-what-it-says__ - this will perform a one of the three actions above based on the contents of the *random.txt* file
  

