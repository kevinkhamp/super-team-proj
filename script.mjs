var searchInput = document.querySelector("#searchinput");
var searchBar = document.querySelector('#searchbar');
var navUlEl = document.querySelector('#navul');
var localStorageArray;
var charImg = $('.char-img')
import { availableTags } from "./longstring.mjs";
console.log(availableTags);


var shortboxedURL = "https://api.shortboxed.com/" //Might remove
var key1 = "3299094467007947/search/"
var superUrl = "https://superheroapi.com/api/" + key1

//Search button funtionality. Works but needs to be further developed for API use
$('.img-size').on('click', function() {
  var event = $(this).prev().val()
  console.log("It works")
  console.log(event)


  getSuperheroApi(event)
})

//generic pull for shortboxed api, use REQUESTED ELEMENT as paramater to specify which element within the shortboxed api to pull
var getShortboxedApi = function(requestedElement) {
    var requestUrl = shortboxedURL + requestedElement;
    fetch('https://cors-anywhere-jung.herokuapp.com/'+requestUrl, {
    method: 'GET',
    credentials: 'same-origin',
    redirect: 'follow'
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    
      })
};

var getSuperheroApi = function(requestedElement) {
  var requestUrl = superUrl + requestedElement;
  fetch('https://cors-anywhere-jung.herokuapp.com/'+requestUrl, {
  method: 'GET',
  credentials: 'same-origin',
  redirect: 'follow'
  })
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    return data;
    })
};


//document.ready to place functions we don't want to use until the page has loaded, commented out for now
// $(document).ready(function() {

// });

//creating function to store data from the event listener.
var inputToSearch = function (event) {
    //preventing the page from clearing form data
    event.preventDefault();
    //creating the variable to use from the search input
    var userInput = searchInput.value.trim();
    //if statement to create array to set the local storage...need to create the array if storage is empty
    if (JSON.parse(localStorage.getItem("superhero"))===null) {
        localStorageArray=[]; 
    } else {
        localStorageArray=JSON.parse(localStorage.getItem("superhero"));   
    };
    //pushing new elements to local storage array to then be set in local
    localStorageArray.push(userInput);
    //setting the localArray to storage
    localStorage.setItem("superhero", JSON.stringify(localStorageArray));

};

//autocomplete from available superheros list
$(function() {    
    $( "#searchinput" ).autocomplete({
      source: availableTags
    });
  } );


getShortboxedApi()
getSuperheroApi('ironman')

//event listener for the super search bar
searchBar.addEventListener('submit', inputToSearch);


