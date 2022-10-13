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

// LAST FM API KEY: ad9eb14ec5af4e4148be415fdc964ee5
// LAST FM API CALL: http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=blink-182&api_key=ad9eb14ec5af4e4148be415fdc964ee5&format=json
//data.similarartists.artist[i].name is an array of 100 artists similar to the one give


var userSearchForm = document.getElementById("search-input-second-page")
var searchButton = document.getElementById("search-button-second-page")
var goBackButton = document.getElementById("go-back-button")
var searchText = userSearchForm.value


var festivalNameEL = document.getElementById("festival-name");
var concertDateEL = document.getElementById("concert-date");
var ticketInfoEL = document.getElementById("ticket-info");
var ticketUrlEL = document.getElementById("ticket-url");
var venueInfoEL = document.getElementById("venue-info");
var venueUrlEL = document.getElementById("venue-url");

function getApiTicket () {
    var requestUrl = 'https://app.ticketmaster.com/discovery/v2/events?apikey=GGVmINtK7x38KXJV7CuAUu8cd8BCplr2&keyword='+userSearchForm.value+'&locale=*'
    fetch(requestUrl)
        
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
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

                //next we add the appends when we have the proper Ids from the html
            }
        })
}


//SUBMIT BUTTON (PAGE 2)
searchButton.addEventListener("click", function(event){
    event.preventDefault()
    //getApiTicket()
    getTasteDiveData()
    
})
//GO BACK BUTTON (PAGE 2)
goBackButton.addEventListener("click", function(){
    document.location = "index.html"
})

function getLastFMData(artistName){
    var lastFMURL = `http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${artistName}&api_key=ad9eb14ec5af4e4148be415fdc964ee5&format=json`
    fetch(lastFMURL)
    .then(function (response) {

        return response.json();
    })
    .then(function (data) {
        for (var i = 0; i < 10; i++) {
            
            var recArtName =data.similarartists.artist[i].name;
            // console.log(data.similarartists.artist[i].name);
            
            displayRecommendedArtists(recArtName)
        }
    })
    userSearchForm.value = ""
}

function displayRecommendedArtists(recArtName){
    var recArtistsDiv = document.getElementById("recommended-artists-div")
        var artistButton = document.createElement("button")
        artistButton.setAttribute("class", "artist-button")
        artistButton.textContent = recArtName
        recArtistsDiv.appendChild(artistButton)
    

}

function loadPage () {
var artistName = document.location.search.split("=")[1]
    getLastFMData(artistName);
}

function displaySearchHistory(){
    var searchHistoryDiv = document.getElementById("search-history-div")
    for(var i = 0; i<5; i++){
        var searchHistoryItemButton = document.createElement("button")
        searchHistoryItemButton.setAttribute("class", "search-history-item")
        searchHistoryItemButton.textContent = "test search item"
        searchHistoryDiv.appendChild(searchHistoryItemButton)
    }
}
displaySearchHistory()
displayRecommendedArtists()
=======
loadPage();

