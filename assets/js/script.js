// TICKET MASTER API KEYs 
// Carlos' api key LGekbuhhnmSZ9YhkEfdlTGolpJhYEnKn 
// Mike's api key 8wmM9YQxNWgAKsCSZiMrgT0usA7JEZjI
// Jeff's api key GGVmINtK7x38KXJV7CuAUu8cd8BCplr2
// Matt's api key 3r8wxnByCq8PgG9dNcHuw5eRnL9HqNGj

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