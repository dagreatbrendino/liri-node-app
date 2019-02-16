require("dotenv").config();

var keys = require("./keys.js");

require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);

var args = process.argv; 

var action = args[2];

var term = args.splice(3).join("%20");
var liriRun = function(act, query){
    switch (act){
        case "concert-this": 
            console.log("calling concert-this for " + query);
            var URL = "https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp";
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
            if(query === ""){
                query = "The%20Sign";
            }
            console.log("searching spotify for " + query);
            spotify.search({ type: 'track', query: query }, function(err, data) {
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
            if(query === ""){
                query = "Mr.%20Nobody";
            } 
            console.log("movie-this searching for " + query);
            var URL = `http://www.omdbapi.com/?t=${query}&y=&plot=short&apikey=trilogy`;
            axios.get(URL).then(
                function(response) {
                    console.log(
                        "Title: " + response.data.Title + 
                        "\nReleased: " + response.data.Released + 
                        "\nIMDB Rating: " + response.data.imdbRating + 
                        "\nRotten Tomatoes: " + response.data.Ratings[1].Value +
                        "\nCountry: " + response.data.Country +
                        "\nLanguage: " + response.data.Language + 
                        "\nPlot: " + response.data.Plot + 
                        "\nActors: " + response.data.Actors);
                }
            );
            break;
        case "do-what-it-says":
                fs.readFile("./random.txt", 'utf8', function(err, data){
                    if (err){
                        console.log(err);
                        return;
                    }
                    console.log(data);
                    var actionTerm = data.split(",")
                    var action = actionTerm[0];
                    var term = actionTerm[1];
                    liriRun(action, term);
                  
                });
                // console.log(term);
            console.log("Doing what it says");
            break;
        default: 
            console.log("default behaviour");
    }

}
liriRun(action, term);
