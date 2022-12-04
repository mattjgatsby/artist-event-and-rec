# Sounds Like...All Around the World!
This application is designed for a user who wants to find concert events by an artist of their choice, or by any similar artists that are listed on the webpage.  The application keeps a list of the user's previous searches, allowing them to branch off from any of those jumping-off points.  The data provided comes from the Ticket Master API and from the Last FM API 

## Overview of the Application
<img src="./assets/images/Sounds Like In Your Area.gif">

## Link to the Deployed Application
https://mattjgatsby.github.io/artist-event-and-rec/

## Technologies used
- The primary language used in the project is Javascript.  It also utilized CSS and HTML languages
- It utilizes styling framework functionality provided by Bulma
- It utilizes from validation from Parsley.js
- It utilizes JQery

## Notable features
- Fetches data from multiple third-party APIs and consolidates that data into a user-friendly environment
- input forms that relocate the user and also ensure that the user inputed a valid entry
- dynamically generated cards, each with their own data and images displayed
- dynamically generated buttons, which navigate the user to unique URLs

## Notable Methods
- Accessing the API data was the primary methodology of this project.  Using fetch/then statements and parsing the response allowed us to built a useful interactive site.
- Having event listeners trigger asynchronous events
- Jquery selectors were used in order to utilize the Parsley.js library.

## Examples of Code:
- Here is the fetch call to the Last .FM API. The URL is modified by the input of the user
```javascript
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
```
Here is the function that displays the recommended artists by dynamically generating buttons, each with their own unique properties
```javascript
function displayRecommendedArtists(recArtName){
    var recArtistsDiv = document.getElementById("recommended-artists-div")
    var artistButton = document.createElement("button");
    artistButton.setAttribute("class", "artist-button button is-primary");
    artistButton.textContent = recArtName;
    artistButton.addEventListener('click', (event) => {
        document.location = "./search.html?textInput=" + event.target.textContent;
    });
    recArtistsDiv.appendChild(artistButton);
}
```
## Learning points from this project
- The biggest learning point from this project was learning how to collaborate as a group.  This involved learning on the fly how git branches are created and merged and how to deal with conflicts in those merges.  We learned how to delegate certain portions of the project to certain people in order to avoid overlap in work.  Communication was a huge part of this process.  Communicating coding practices is much different that simply knowing them.  We also learned that it's nice to have partners that are all helpful with the work, easy to get along with, and committed to putting in the time and the effort to work and learn together
- Another big learning point from this project was gaining more experience with looking at docs for APIs, javascript libraries, and styling frameworks.  These docs can seem very intimidating at first, but become less so as we work through a project like this
- Along with a few new coding practices learned, we also solidified previously learned concepts

## -By Carlos Martinez, Michael Seaman, Jeff Chan, Matt Gatspy
