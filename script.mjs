var searchInput = document.querySelector("#searchinput");
var searchBar = document.querySelector('#searchbar');
var navUlEl = document.querySelector('#navul');
var localStorageArray;
var newReleases = document.querySelector('#release');
var workInput = document.querySelector('#workinput');
var charImg = $('.char-img')
import { availableTags } from "./longstring.mjs";
var favBtn = document.querySelector('#favbutton');
var favArray;

//api urls and keys
var shortBoxedUrl = "api.shortboxed.com"
var key1 = "3299094467007947"
var superUrl = "https://superheroapi.com/api/" + key1

//generic pull for shortboxed api, use REQUESTED ELEMENT as paramater to specify which element within the shortboxed api to pull
var getShortBoxedApi = function() {

    var requestUrl2 = shortBoxedUrl + "/comics/v1/new";
    
    fetch('https://cors-anywhere-jung.herokuapp.com/'+requestUrl2, {
    method: 'GET',
    credentials: 'same-origin',
    redirect: 'follow'
    })
    .then(function (response) {
      
      return response.json();
    })
    .then(function (data) {
      while (newReleases.childNodes.length > 2) {
        newReleases.removeChild(newReleases.lastChild);
      }
      for (var i = 0; i<3; i++) {
      
      var newToRead = document.createElement('p');
      newToRead.textContent = "Title: " + data.comics[Math.floor(Math.random()*184)].title;
      newReleases.appendChild(newToRead);
      }
    
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
    
    console.log(data.results);
    
    return data;

    }) 
};

// document.ready to place functions we don't want to use until the page has loaded, commented out for now
$(document).ready(function() {
  
});

//creating function to store data from the event listener.
// var inputToSearch = function (event) {
//     //preventing the page from clearing form data
//     event.preventDefault();
//     //creating the variable to use from the search input
//     var userInput = searchInput.value.trim();
//     //if statement to create array to set the local storage...need to create the array if storage is empty
//     if (JSON.parse(localStorage.getItem("superhero"))===null) {
//         localStorageArray=[]; 
//     } else {
//         localStorageArray=JSON.parse(localStorage.getItem("superhero"));   
//     };
//     //pushing new elements to local storage array to then be set in local
//     localStorageArray.push(userInput);
//     //setting the localArray to storage
//     localStorage.setItem("superhero", JSON.stringify(localStorageArray));

// };

//autocomplete from superheros list
$(function() {    
    $( "#searchinput" ).autocomplete({
      source: availableTags
    });
  } );


getSuperheroApi('/search/ironman/');


//event listener for the super search bar
searchBar.addEventListener('submit', function(event){
  event.preventDefault();
  
  // userInput = searchInput.value.trim();
  getShortBoxedApi();

  var event = $(this).children('#searchinput').val()
  
  var requestUrl = superUrl;
  fetch('https://cors-anywhere-jung.herokuapp.com/'+requestUrl, {
  method: 'GET',
  credentials: 'same-origin',
  redirect: 'follow'
  })
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    //Not targetting array for searched superhero. Shows everything not as Object or Array(x)
  getSuperheroApi('/search/' + event)
})
});



favBtn.addEventListener('click', function(){
  var userInput = searchInput.value.trim();
  console.log(userInput);
  if (JSON.parse(localStorage.getItem("favorite"))===null) {
    favArray=[];
  } else {
    favArray = JSON.parse(localStorage.getItem("favorite"));
  } if(userInput!="") {
    favArray.push(userInput);
  }
  localStorage.setItem("favorite", JSON.stringify(favArray));

})
