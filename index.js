'use strict'

let medicKey = ''; //stores ApiMedic API key
const medicURL = 'https://sandbox-healthservice.priaid.ch/'; //URL base to fetch data from ApiMedic API
const doctorURL = 'https://api.betterdoctor.com/2016-03-01/doctors?location=' //URL base to fetch data from BetterDoctor API
const doctorKey = 'ce1e7e356075c4503093af9bfb06ec0c'
let zipCode = ''; //user's zip code
let userLat = ''; //user's latitude
let userLong = ''; //user's longitude
let age = '';
let gender = '';
let issues = ''; //responseJson Object of issues from ApiMedic
let symptoms = ''; //responseJson Object of symptoms from ApiMedic
let symptomsAndIssuesArr = []; //array of user's symptoms that were checked
let range = ''
const api_key = 'enguyen89141@gmail.com' 
var uri = 'https://sandbox-authservice.priaid.ch/login'; //login url to fetch token 
var secret_key = "n6X3ByDw97Eod8W2Q"; //ApiMedic pass to get token 
var computedHash = CryptoJS.HmacMD5(uri,secret_key); 
var computedHashString = computedHash.toString(CryptoJS.enc.Base64);

function showForm() { //1 retrieves token from ApiMedic, hides welcome text, and shows general information collection screen
    $('#start').on('click', function(event) {
        event.preventDefault();
        fetch('https://sandbox-authservice.priaid.ch/login',{
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + api_key + ':' + computedHashString
            }})
            .then(response => response.json())
            .then(function(responseJson) {
                medicKey = responseJson.Token;
            })
            if ($(window).width() > 1024) {
                $('.home').fadeOut('fast')
                $('.genInfo').fadeIn('slow')
                $('.container').css('border', 'none')
            } else {
                $('.home').css('display', 'none')
                $('.genInfo').css('display', 'block')
                if ($('body').css('background-size') === '300px 300px') {
                    $('body').css('background-size', '200px 200px')
                    }
                }
            }
        )
    }
 
function getLocation() { //2.1 gets user's longitude and latitude coordinates when they click on get my current location 
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

function fetchSymptoms() { //2.2 Uses token showForm to fetch symptoms

    fetch(medicURL + 'symptoms?token=' + medicKey + '&format=json&language=en-gb')
    .then(response => response.json())
    .then(responseJson =>
         populateSymptoms(responseJson))
    .catch(error => alert('There was an issue retrieving the list of symptoms. Please try again later.'))
}


function populateSymptoms(responseJson) { //2.3 populates symptoms into 3 columns
    symptoms = responseJson;
    if ($(window).width() < 500){
        for (let i = 0; i < symptoms.length; i ++) {
            $('#symptomsColumn1').append(`<input type="checkbox" class="checkbox" id="${symptoms[i].ID}" value="${symptoms[i].ID}" name="${symptoms[i].Name}"><label for="${symptoms[i].ID}">${symptoms[i].Name}</label><br>`)
        }
    } else {
        for (let i = 0; i < 21; i++){
            $('#symptomsColumn1').append(`<input type="checkbox" class="checkbox" id="${symptoms[i].ID}" value="${symptoms[i].ID}" name="${symptoms[i].Name}"><label for="${symptoms[i].ID}">${symptoms[i].Name}</label><br>`)
        }
        for (let j = 20; j < 41; j++){
            $('#symptomsColumn2').append(`<input type="checkbox" class="checkbox" id="${symptoms[j].ID}" value="${symptoms[j].ID}" name="${symptoms[j].Name}"><label for="${symptoms[j].ID}">${symptoms[j].Name}</label><br>`)
        }
        for (let k = 41; k < 62; k++){
            $('#symptomsColumn3').append(`<input type="checkbox" class="checkbox" id="${symptoms[k].ID}" value="${symptoms[k].ID}" name="${symptoms[k].Name}"><label for="${symptoms[k].ID}">${symptoms[k].Name}</label><br>`)
        }
    }
}


function showSymptoms() { //2.4 ensures user inputs zip code or coordinates, hides general infomation page and populates/shows symptoms page
    $('.genInfo').submit(function(event) {
        event.preventDefault();
        zipCode = $('.zip').val();
        age = $('.age').val();
        gender = $("input[name='gender']:checked").val();
        range = $("input[name='range']:checked").val();
        if($('.zip').val() === '' && $('.latitude').val() === '' ) {
                alert("Please enter a zip code or select my current location.")
            } else {
                $('form').css('display', 'none')
                fetchSymptoms();
                $('body').css('background-image', 'none')
                $('.symptomsPage').css('display', 'flex')
                $('.symptomsPage').css('flex-wrap', 'wrap')
                $('.symptomsPage').css('justify-content', 'center')
                }
    if ($(window).width() > 1024){
        $('#myVideo').css('display', 'none');
        $('.container').css('display', 'none');
    }
    })
    showIssues();
}


function fetchIssues() { //3.1 fetches and populates issues page 
    fetch(medicURL + 'issues?token=' + medicKey + '&format=json&language=en-gb')
    .then(response => response.json())
    .then(responseJson =>
         populateIssues(responseJson))
    .catch(error => alert('There was an issue retrieving the list of issues. Please try again later.'))
}

function populateIssues(responseJson) {//same as above
    issues = responseJson;
    if ($(window).width() < 500){
        for (let i = 0; i < issues.length; i ++) {
            $('#issuesColumn1').append(`<input type="checkbox" class="checkbox" id="${issues[i].ID}" value="${issues[i].ID}" name="${issues[i].Name}"><label for="${issues[i].ID}">${issues[i].Name}</label><br>`)
        } 
    } else {
            for (let i = 0; i < 25; i++){
                $('#issuesColumn1').append(`<input type="checkbox" class="checkbox" id="${issues[i].ID}" value="${issues[i].ID}" name="${issues[i].Name}"><label for="${issues[i].ID}">${issues[i].Name}</label><br>`)
            }
            for (let j = 25; j < 50; j++){
                $('#issuesColumn2').append(`<input type="checkbox" class="checkbox" id="${issues[j].ID}" value="${issues[j].ID}" name="${issues[j].Name}"><label for="${issues[j].ID}">${issues[j].Name}</label><br>`)
            }
    }
}

function showIssues() { //3.2 Stores ID numbers from symptoms page into an array, hides the page, and shows/populates issues page 
    $('.symptomsPage').submit(function(event) {
        event.preventDefault();
        $('.symptomsPage input[type="checkbox"]:checked').each(function() {
            symptomsAndIssuesArr.push($(this).val());
        });
        $('.symptomsPage').css('display', 'none')
        fetchIssues();
        $('.issuesPage').css('display', 'flex')
        $('.issuesPage').css('flex-wrap', 'wrap')
        $('.issuesPage').css('justify-content', 'center')
        })
    }

function showResults() {
    $('.issuesPage').submit(function(event) {
        event.preventDefault();
        $('.issuesPage input[type="checkbox"]:checked').each(function() {
            symptomsAndIssuesArr.push($(this).val());
        });
        fetchResults();
        
    })
}

function fetchResults() {
    fetch(medicURL + 'diagnosis?symptoms=[' + symptomsAndIssuesArr + ']&gender=' + gender + '&year_of_birth=' + age + '&token=' + medicKey + '&format=json&language=en-gb')
    .then(response => response.json())
    .then(responseJson =>
        displayResults(responseJson))
    .catch(error => alert('Sorry we are unable to return your results. Please try again later.')) 
}

function displayDoctors() {
    if (zipCode === '' ) {
        fetch(doctorURL + userLat + '%2C' + userLong + '%2C' + range + '&user_location=' + userLat + '%2C' + userLong + '&skip=0&limit=10&user_key=' + doctorKey)
        .then(response => response.json())
        .then(response =>
            displayDoctorResults(response))
    } else {
        fetch(doctorURL + zipCode + '&skip=0&limit=10&user_key=' + doctorKey)
        .then(response => response.json())
        .then(response =>
            displayDoctorResults(response))
    }
}

function displayResults(responseJson){
    let results = responseJson;
    $('.issuesPage').css('display', 'none')
    if (results === undefined || results.length === 0) {
        alert('Sorry no results were found. Please try again with fewer selections.')
        location.reload();
    } else {
    $('.results').css('display', 'block')
    for (let i = 0; i < results.length; i ++){
        $('.results').append(`<h3>Name: ${results[i].Issue.Name}</h3><p>Recommended Specialists: `)
        for (let j = 0; j < results[i].Specialisation.length; j++) {
            $('.results').append(`${results[i].Specialisation[j].Name} `)
        }
    }
    $('.results').append('</p>')
    displayDoctors();
}}
function displayDoctorResults(responseJson) {
    let doctorResults = responseJson.data;
    if (doctorResults === undefined || doctorResults.length === 0)
        $('.results').append('<h3>Sorry no doctors were found in your area.</h3>')
    else {
        $('.results').append('<h2>Doctors in your area</h2>')
        for (let i = 0; i < doctorResults.length; i ++){
            $('.results').append(`<h3>Name: ${doctorResults[i].practices[0].name}</h3>`)
            $('.results').append(`<p>Specialty: ${doctorResults[i].specialties[0].name}`)
            $('.results').append(`<p>Phone Number: ${doctorResults[i].practices[0].phones[0].number}`)
        }
    }
    $('.results').append('<p>Powered by:</p><p><img src="./images/apiMedic.png" alt="ApiMedic Logo" class="apiLogo"></p><p><img src="./images/betterDoctorLogo.png" alt="Better Doctor logo" class="apiLogo"></p>')
}

function startOver() {
    $('.startOver').on('click', function(event) {
        location.reload();
    })
}
function betterMedic() {
    showResults();
    showForm();
    showSymptoms();
    getLocation();
    startOver();
}
betterMedic();