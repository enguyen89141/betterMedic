'use strict'
/*
function getDogBreeds() {
    fetch('https://dog.ceo/api/breeds/list/all')
      .then(response => response.json())
      .then(responseJson => 
        populateBreedsList(responseJson))
      .catch(error => alert('Something went wrong. Try again later.'));
  }

  function displayResults() {
    let searchTerm = $('.breed').val()
    $('.results').removeClass('hidden');  
    fetch('https://dog.ceo/api/breed/' + searchTerm.toLowerCase() + '/images/random')
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(`${searchTerm} not found. Please try again.`);
    })
    .then(responseJson =>
      $('.results').append('<img src="' + responseJson.message + '" class = "results-img">'))
    .catch(err => 
        $('.error').text(`Something went wrong: ${err.message}`))
  }

function watchForm(breedsList) {
  $('form').submit(event => {
    $('.error').text('')
    event.preventDefault();
    $('.results').empty();
    displayResults();
})}
function populateBreedsList(responseJson) {
  let breedsList = responseJson.message
  watchForm(breedsList)
}
getDogBreeds();
*/

function getLocation() {
    $('.currentLocation').on('click', function(event) {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                $('.latitude').val(`${position.coords.latitude}`);
                $('.longitude').val(`${position.coords.longitude}`);
              });
        } else {
            alert('Sorry, we are unable to determine you location at this time. Please enter in a zip code.')
        }
    })
}

function showForm() {
    $('#start').on('click', function(event) {
        event.preventDefault();
        $('.welcomeText').css('display', 'none')
        $('.container').css('border', 'none')
        $('form').css('display', 'block')
    })
}
showForm();
getLocation();
