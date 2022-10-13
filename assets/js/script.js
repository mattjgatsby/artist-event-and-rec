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


// Clear display on the right side of the screen(also can be modify to remove more than right side)
function clearConcertDisplay(){
    //list of containers needed to remove child of. Rn there are only 1
    var elements = [    document.getElementById("right-column")
                    ];

    for(var i=0; i<elements.length; i++){
        while (elements[i].hasChildNodes()){
            elements[i].removeChild(elements[i].firstChild);
        }
    }
}

//Display the right side of screen when called
function displayElements(data, count){
    //main container
    var cardEl = document.createElement('div');
    //for the first column
    var columnsCardEl = document.createElement('div');
    var infoEl = document.createElement('div');
    var festNameEl = document.createElement('p');
    var conDateEl = document.createElement('p');
    var ticketDatesEl = document.createElement('p');
    var venLocEl = document.createElement('p');
    var btnDiv = document.createElement('div');
    var buyTicBtn = document.createElement('button');
    var seeVenueBtn = document.createElement('button');
    cardEl.setAttribute("class","card");
    columnsCardEl.setAttribute("class", "columns card-content");
    infoEl.setAttribute("class","column is-9");
    festNameEl.setAttribute("class", "is-size-1");
    festNameEl.textContent = "Festival Name: " + data._embedded[count].name;
    conDateEl.setAttribute("class", "is-size-2");
    conDateEl.textContent = "Date: " + data._embedded[count].dates.start.localDate + " @ " + data._embedded[count].dates.start.localTime;
    ticketDatesEl.setAttribute("class", "is-size-2");
    ticketDatesEl.textContent = "Tickets Sales Ends on" + data._embedded[count].sales.public.endDateTime;
    venLocEl.setAttribute("class", "is-size-2");
    venLocEl.textContent = "Venue Location: " + data._embedded._embedded.venues.name;
    //for buttons
    btnDiv.setAttribute("class","is-flex is-justify-content-space-around");
    buyTicBtn.setAttribute("class","button is-primary search-button is-size-4"); //need to add event listeners
    buyTicBtn.textContent = "Buy Ticket";
    seeVenueBtn.setAttribute("class","button is-primary search-button is-size-4");// same with this one
    seeVenueBtn.textContent = "See Venue";
    
    //for second column
    var imageDiv = document.createElement("div");
    var imageEl = document.createElement("image");
    imageDiv.setAttribute("class", "column is-flex is-align-items-center is-justify-content-center image")
    imageEl.setAttribute("src", data._embedded[count].image[1]) //need to talk about this

}

searchButton.addEventListener("click", function(event){
    event.preventDefault()
    console.log(searchText)
    getApiTicket()
})
goBackButton.addEventListener("click", function(){
    document.location = "index.html"
})
