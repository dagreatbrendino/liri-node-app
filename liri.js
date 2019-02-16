require("dotenv").config();

var keys = require("./keys.js");

require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var args = process.argv; 

var action = args[2];

var term = args.splice(3).join("%20");

switch (action){
    case "concert-this": 
        console.log("calling concert-this for " + term);
        var URL = "https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp";
        console.log(URL);
        axios.get(URL).then(
            function(response){
                response.data.forEach(function(concert){
                    //from moment docs
                    var date = moment(concert.datetime, moment.ISO_8601).format("MM/DD/YYYY");
                    console.log("Venue: " + concert.venue.name + " Location: " + concert.venue.city + ", " + concert.venue.region +
                    " Date: " + date);
                    console.log("-------------------------");
                });
        });
        break;
    case "spotify-this-song": 
        console.log("searching spotify for " + term);
        spotify.search({ type: 'track', query: term }, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
           
          console.log(
                "Artist(s): " + data.tracks.items[0].artists[0].name +
                "\nTitle: " + data.tracks.items[0].name +
                "\nLink: " + data.tracks.items[0].preview_url + 
                "\nAlbum: " + data.tracks.items[0].album.name);
          });
        break;
    case "movie-this": 
        console.log("movie-this called");
        break;
    case "do-what-it-says called":
        console.log("Doing what it says");
        break;
    default: 
        console.log("default behaviour");
}