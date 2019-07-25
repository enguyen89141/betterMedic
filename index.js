'use strict'

const medicKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImVuZ3V5ZW44OTE0MUBnbWFpbC5jb20iLCJyb2xlIjoiVXNlciIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL3NpZCI6IjU0NjkiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3ZlcnNpb24iOiIyMDAiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL2xpbWl0IjoiOTk5OTk5OTk5IiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9tZW1iZXJzaGlwIjoiUHJlbWl1bSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGFuZ3VhZ2UiOiJlbi1nYiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvZXhwaXJhdGlvbiI6IjIwOTktMTItMzEiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXBzdGFydCI6IjIwMTktMDctMjQiLCJpc3MiOiJodHRwczovL3NhbmRib3gtYXV0aHNlcnZpY2UucHJpYWlkLmNoIiwiYXVkIjoiaHR0cHM6Ly9oZWFsdGhzZXJ2aWNlLnByaWFpZC5jaCIsImV4cCI6MTU2NDAzMjcyNiwibmJmIjoxNTY0MDI1NTI2fQ.vRcjL1Qh25cJqyvMnWFD31gyzXAHW4DjbgJ7BpHOj7I';
const medicURL = 'https://sandbox-healthservice.priaid.ch/'
let zipCode = ''
let userLat = ''
let userLong = ''
let symptoms = ''
let symptomsArr = []

function fetchSymptoms() {
    var uri = 'https://sandbox-authservice.priaid.ch/login';
    var secret_key = "n6X3ByDw97Eod8W2Q";
    var computedHash = CryptoJS.HmacMD5(uri,secret_key);
    var computedHashString = computedHash.toString(CryptoJS.enc.Base64);
    console.log(computedHashString)
    fetch(medicURL + 'symptoms?token=' + computedHashString + '&format=json&language=en-gb')
    .then(response => response.json())
    .then(responseJson =>
         populateSymptoms(responseJson))
    .catch(error => alert('Something went wrong. Please try again later.'))
}

function populateSymptoms(responseJson) {
    symptoms = responseJson
    for (let i = 0; i < 21; i++){
        $('#symptomsColumn1').append(`<input type="checkbox" class="checkbox" id="${symptoms[i].ID}" name="${symptoms[i].Name}"><label for="${symptoms[i].ID}">${symptoms[i].Name}</label><br>`)
    }
    for (let j = 20; j < 41; j++){
        $('#symptomsColumn2').append(`<input type="checkbox" class="checkbox" id="${symptoms[j].ID}" name="${symptoms[j].Name}"><label for="${symptoms[j].ID}">${symptoms[j].Name}</label><br>`)
    }
    for (let k = 41; k < 62; k++){
        $('#symptomsColumn3').append(`<input type="checkbox" class="checkbox" id="${symptoms[k].ID}" name="${symptoms[k].Name}"><label for="${symptoms[k].ID}">${symptoms[k].Name}</label><br>`)
    }
}

function getLocation() {
    $('.currentLocation').on('click', function(event) {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                $('.latitude').val(`${position.coords.latitude}`);
                $('.longitude').val(`${position.coords.longitude}`);
                userLat = position.coords.latitude;
                userLong = position.coords.longitude;
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
        $('.genInfo').css('display', 'block')
    })
}
function showSymptoms() {
    $('.genInfo').submit(function(event) {
        event.preventDefault();
        let zipCode = $('.zip').val();
        /* ask David why the OR in this if function isn't working properly and about symptoms clear*/
        if($('.zip').val() === '' || $('.latitude').val() === '' ) {
                alert("Please enter a zip code or select my current location.")
            } else {
                $('form').css('display', 'none')
                fetchSymptoms();
                $('.symptomsPage').css('display', 'flex')
                $('.symptomsPage').css('flex-wrap', 'wrap')
                $('.symptomsPage').css('justify-content', 'center')
                }
    })

}
/*ask about getting id value from checkbox
function showIssues() {
    $('.symptomsPage').submit(function(event) {
        event.preventDefault();
        $('.symptomsPage input[type="checkbox"]:checked').each(function() {
            console.log($(this).ID)
        })
        console.log(symptomsArr)
    })
}

showIssues();
*/
showSymptoms();
showForm();
getLocation();