
var requestUrl = "https://www.superheroapi.com/api/access-token/"
var key1 = "10222471827453189"


var searchInput = document.querySelector("#searchinput");
var searchBar = document.querySelector('#searchbar');
var navUlEl = document.querySelector('#navul');
var localStorageArray;


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


//event listener for the super search bar
searchBar.addEventListener('submit', inputToSearch);


