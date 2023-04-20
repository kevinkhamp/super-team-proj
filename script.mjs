var searchInput = document.querySelector("#searchinput");
var searchBar = document.querySelector('#searchbar');
var navUlEl = document.querySelector('#navul');
var localStorageArray;
var newReleases = document.querySelector('#release');
var workInput = document.querySelector('#workinput');
var workInput2 = document.querySelector('#workinput2');
var biographyInput1 = document.querySelector('#biographyinput1');
var biographyInput2 = document.querySelector('#biographyinput2');
var biographyInput3 = document.querySelector('#biographyinput3');
var biographyInput4 = document.querySelector('#biographyinput4');
var biographyInput5 = document.querySelector('#biographyinput5');
var biographyInput6 = document.querySelector('#biographyinput6');
var biographyInput7 = document.querySelector('#biographyinput7');
var connectionsInput1 = document.querySelector('#connectionsinput1');
var connectionsInput2 = document.querySelector('#connectionsinput2'); 
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
    
  console.log(data.results[0].work);

  //Ethan's Bio
  biographyInput1.textContent = "Aliases: " +data.results[0].biography['aliases'] 
  biographyInput2.textContent = "Alignment: " +data.results[0].biography['alignment']
  biographyInput3.textContent = "Alter Egos: " +data.results[0].biography['alter-egos']
  biographyInput4.textContent = "First Appearance: " +data.results[0].biography['first-appearance']
  biographyInput5.textContent = "Full Name: " +data.results[0].biography['full-name']
  biographyInput6.textContent = "Place of Birth: " +data.results[0].biography['place-of-birth']
  biographyInput7.textContent = "Publisher: " +data.results[0].biography['publisher']

  connectionsInput1.textContent = "Groups and Affiliations: " +data.results[0].connections['group-affiliation']
  connectionsInput2.textContent = "Relatives: " +data.results[0].connections['relatives']

  workInput.textContent = "Occupation: " +data.results[0].work['occupation']
  workInput2.textContent = "Base: " +data.results[0].work['base']

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


// getSuperheroApi('/search/ironman/');


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
