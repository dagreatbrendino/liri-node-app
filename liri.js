require("dotenv").config();

var keys = require("./keys.js");

require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
// var spotify = new Spotify(keys.spotify);

var args = process.argv; 

var action = args[2];

var term = args.splice(3).join("%20");

switch (action){
    case "concert-this": 
        console.log("calling concert-this");
        var URL = "https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp";
        console.log(URL);
        axios.get(URL).then(
            function(response){
                // console.log(response.data);
                response.data.forEach(function(concert){
                    //from moment docs
                    var date = moment(concert.datetime, moment.ISO_8601).format("MM/DD/YYYY");
                    console.log("Venue: " + concert.venue.name + " Location: " + concert.venue.city + ", " + concert.venue.region +
                    " Date: " + date);
                    console.log("-------------------------");
                });
        });
        console.log(term);
        break;
    case "spotify-this-song": 
        console.log("spotifying this");
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