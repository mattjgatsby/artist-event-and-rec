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


var userSearchForm = document.getElementById("search-form")
var searchButton = document.getElementById("search-button-second-page")
var goBackButton = document.getElementById("go-back-button")
var searchText = document.getElementById("search-input-second-page")
var formValidation = $("#search-input-second-page").parsley()
$("#search-input-second-page").attr('data-parsley-minlength', 1)



function getApiTicket (artist) {
    var requestUrl = 'https://app.ticketmaster.com/discovery/v2/events?apikey=GGVmINtK7x38KXJV7CuAUu8cd8BCplr2&keyword='+artist+'&locale=*'
    fetch(requestUrl)
        
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // clearConcertDisplay();
            if(data.page.totalElements > 0){
                for(var i=0; i<data._embedded.events.length; i++){
                    displayConcertElements(data, i);
                }
            } else {
                // Show text instead of cards that says there were no upcoming for that artist
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
function displayConcertElements(data, count){
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
    cardEl.setAttribute("class","card mt-5");
    columnsCardEl.setAttribute("class", "columns card-content");
    infoEl.setAttribute("class","column is-9");
    festNameEl.setAttribute("class", "is-size-2");
    festNameEl.textContent = "Festival Name: " + data._embedded.events[count].name;
    conDateEl.setAttribute("class", "is-size-3");
    conDateEl.textContent = "Date: " + data._embedded.events[count].dates.start.localDate + " @ " + data._embedded.events[count].dates.start.localTime;
    ticketDatesEl.setAttribute("class", "is-size-3");
    ticketDatesEl.textContent = "Tickets Sales Ends on" + data._embedded.events[count].sales.public.endDateTime;
    venLocEl.setAttribute("class", "is-size-3");
    venLocEl.textContent = "Venue Location: " + data._embedded.events[count]._embedded.venues[0].name;
    //for buttons
    btnDiv.setAttribute("class","is-flex is-justify-content-space-around");
    buyTicBtn.setAttribute("class","button is-primary search-button is-size-4"); //need to add event listeners
    buyTicBtn.textContent = "Buy Ticket";
    buyTicBtn.onclick = function(){ //need to check if this works
        window.open(data._embedded.events[count].url);
    }
    seeVenueBtn.setAttribute("class","button is-primary search-button is-size-4");// same with this one
    seeVenueBtn.textContent = "See Venue";
    seeVenueBtn.onclick = function(){ //need to check if this works
        window.open(data._embedded.events[count]._embedded.venues[0].url);
    }

    //for second column
    var imageDiv = document.createElement("div");
    var imageEl = document.createElement("img");
    imageDiv.setAttribute("class", "column is-flex is-align-items-center is-justify-content-center image")
    imageEl.setAttribute("src", data._embedded.events[count].images[0].url);  //need to talk about this
    imageEl.setAttribute("alt", "concert photo"); 

    //for appending infoel
    infoEl.appendChild(festNameEl); infoEl.appendChild(conDateEl); infoEl.appendChild(ticketDatesEl); infoEl.appendChild(venLocEl);
    btnDiv.appendChild(buyTicBtn); btnDiv.appendChild(seeVenueBtn);
    infoEl.appendChild(btnDiv);
    //for appending imageDiv
    imageDiv.appendChild(imageEl);
    //for appending columnCardEl
    columnsCardEl.appendChild(infoEl); columnsCardEl.appendChild(imageDiv);
    //for appending cardEl
    cardEl.appendChild(columnsCardEl);
    //for appending  right side column
    document.getElementById("right-column").appendChild(cardEl);
}

//Search From EVENT LISTENER
userSearchForm.addEventListener("submit", function(event){
    event.preventDefault()
    searchText.textContent = ""
    if(formValidation.isValid() && searchText.value.trim() !=''){
        document.location = "./search.html?textInput=" + searchText.value.trim();
    }else{
        return
    }
    
})

searchButton.addEventListener("click", function(event){
    event.preventDefault()
    document.location = "./search.html?textInput=" + searchText.value.trim();
})
// GO BACK BUTTON (PAGE 2)
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
            var recArtName = data.similarartists.artist[i].name;
            displayRecommendedArtists(recArtName);
        }
        saveArtistToLocalStorage(data.similarartists['@attr'].artist);
    })
}

function displayRecommendedArtists(recArtName){
    var recArtistsDiv = document.getElementById("recommended-artists-div")
    var artistButton = document.createElement("button");
    artistButton.setAttribute("class", "artist-button button is-primary");
    artistButton.textContent = recArtName;
    recArtistsDiv.appendChild(artistButton);
}

function loadPage () {
    var artistName = document.location.search.split("=")[1];
    getApiTicket(artistName);
    getLastFMData(artistName);
    displaySearchHistory();
}

function saveArtistToLocalStorage(artistName) {
    var artistHistoryList = JSON.parse(localStorage.getItem('artistHistory'));
    if(JSON.parse(localStorage.getItem('artistHistory'))){
        var artistHistoryList = JSON.parse(localStorage.getItem('artistHistory'));
        if(artistHistoryList.includes(artistName)){
            return;
        }
        if(artistHistoryList.length >= 5) {
            artistHistoryList.shift();
        }
    } else {
        var artistHistoryList = [];
    }
    artistHistoryList.push(artistName);
    localStorage.setItem('artistHistory', JSON.stringify(artistHistoryList));
}

function displaySearchHistory(){
    var searchHistoryDiv = document.getElementById("search-history-div");
    var searchHistoryArray = JSON.parse(localStorage.getItem('artistHistory'));
    if(!searchHistoryArray) {
        return;
    }
    for(var i = 0; i < searchHistoryArray.length; i++){
        var searchHistoryItemButton = document.createElement("button")
        searchHistoryItemButton.setAttribute("class", "search-history-item button is-primary")
        searchHistoryItemButton.textContent = searchHistoryArray[i];
        searchHistoryDiv.appendChild(searchHistoryItemButton)
    }
}

loadPage();