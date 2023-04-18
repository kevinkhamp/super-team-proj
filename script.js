

var searchInput = document.querySelector("#searchinput");
var searchBar = document.querySelector('#searchbar');
var navUlEl = document.querySelector('#navul');
var localStorageArray;



// $(document).ready(function() {

// });


var inputToSearch = function (event) {
    
    event.preventDefault();

    var userInput = searchInput.value.trim();

    if (JSON.parse(localStorage.getItem("superhero"))===null) {
        localStorageArray=[]; 
    } else {
        localStorageArray=JSON.parse(localStorage.getItem("superhero"));   
    };

    localStorageArray.push(userInput);
    console.log(localStorageArray);
    localStorage.setItem("superhero", JSON.stringify(localStorageArray));

};


searchBar.addEventListener('submit', inputToSearch);
