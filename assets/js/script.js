// TICKET MASTER API KEYs 
// Carlos' api key LGekbuhhnmSZ9YhkEfdlTGolpJhYEnKn 
// Mike's api key 8wmM9YQxNWgAKsCSZiMrgT0usA7JEZjI
// Jeff's api key GGVmINtK7x38KXJV7CuAUu8cd8BCplr2
// Matt's api key 3r8wxnByCq8PgG9dNcHuw5eRnL9HqNGj

//TICKET MASTER API Call: https://app.ticketmaster.com/discovery/v2/events?apikey=GGVmINtK7x38KXJV7CuAUu8cd8BCplr2&keyword= <artist/band> &locale=*

// TICKET MASTER API REQUEST
// using keyword parameter enter artist name 
// if artist name cant be found or artist has no concerts coming up, data.page.totalElements will be return 0\
// If artist concerts are found, data._embedded is an array of objects that will contain information on concerts 

// data._embedded[i].name is festival name
// data._embedded[i].url is the site to buy tickets on for concert
// data._embedded[i].images contains an array of images for the event
// data._embedded[i].dates.start.localDate gives day of concert
// data._embedded[i].dates.start.localTime gives time of concert
// data._embedded[i].dates.timezone gives time zone of the event
// data._embedded[i].sales.public.startDateTime gives date and time for ticket sale start
// data._embedded[i]._embedded.venues[0].name gives name of venue
// data._embedded[i]._embedded.venues[0].url gives url for the venue location
// data._embedded[i]._embedded.venues[0].state.name gives name of state that venue is located in
// data._embedded[i]._embedded.venues[0].city.name gives name of city that venue is located in
// data._embedded[i]._embedded.venues[0].country.countryCode (can change to name instead of countryCode) gives country code

//Taste Dive API Key: 443285-soundsli-Y4UIPD8B

//TASTE DIVE API CALL: https://tastedive.com/api/similar?q= <artist/band> &k=443285-soundsli-Y4UIPD8B

//TASTE DIVE API Request
//data.similar.Results[] to get the list of recommendations
//data.similar.Results[i].name to get the artist name

var festivalNameEL = document.getElementById("festival-name");
var concertDateEL = document.getElementById("concert-date");
var ticketInfoEL = document.getElementById("ticket-info");
var ticketUrlEL = document.getElementById("ticket-url");
var venueInfoEL = document.getElementById("venue-info");
var venueUrlEL = document.getElementById("venue-url");

function getApiTicket () {
    var requestUrl = 'https://app.ticketmaster.com/discovery/v2/events?apikey=GGVmINtK7x38KXJV7CuAUu8cd8BCplr2&keyword= <artist/band> &locale=*'
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (var i =0; data.length; i++) {
                
                var festName = document.createElement('h2');
                var conDate = document.createElement('p');
                var ticketFo= document.createElement('p');
                var venInfo = document.createElement('p');
                var venUrl = document.createElement('p');

                festName.textContent = data._embedded[i].name;
                conDate.textContent =  data._embedded[i].dates.start.localDate;
                ticketFo.textContent = data._embedded[i].sales.public.startDateTime;
                venInfo.textContent = data._embedded[i]._embedded.venues[0].name;
                venUrl.textContent = data._embedded[i]._embedded.venues[0].url;


            }
        })
}