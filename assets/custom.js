// user inputs
var inputs = {};


// log TMDb genres
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=d12c2969d92f9ef15d80bab89a0cdf8d",
  "method": "GET",
  "headers": {},
  "data": "{}"
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

// PTR recommendation function
function movieRecommendation() {

  var modern = "2000-01-01";
  var era = modern;
  var genre = "35";
  var rating = 7;

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.themoviedb.org/3/discover/movie?with_genres=" + genre + "&vote_average.gte=" + rating + "&primary_release_date.gte=" + era + "&page=1&include_video=false&include_adult=false&sort_by=popularity.desc&language=en-US&api_key=d12c2969d92f9ef15d80bab89a0cdf8d",
    "method": "GET",
    "headers": {},
    "data": "{}",
  }
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });

};

movieRecommendation();

// PTR tv recommendation function
function tvRecommendation() {

  var modern = "2000-01-01";
  var era = modern;
  var genre = "35";
  var rating = 7;

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.themoviedb.org/3/discover/tv?include_null_first_air_dates=false&with_genres=" + genre + "&vote_average.gte=" + rating + "&timezone=America%2FNew_York&page=1&first_air_date.gte=" + era + "&sort_by=popularity.desc&language=en-US&api_key=d12c2969d92f9ef15d80bab89a0cdf8d",
    "method": "GET",
    "headers": {},
    "data": "{}"
  }
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });
};

tvRecommendation();




// hide other cards on load
$(function () {
  $('#promptCard1, #promptCard2, #promptCard3, #promptCard4, #loadingCard, #resultCard').hide();
});

// function that Animation.css needs
function animateCSS(element, animationName, callback) {
  const node = document.querySelector(element)
  node.classList.add('animated', animationName)

  function handleAnimationEnd() {
      node.classList.remove('animated', animationName)
      node.removeEventListener('animationend', handleAnimationEnd)

      if (typeof callback === 'function') callback()
  }

  node.addEventListener('animationend', handleAnimationEnd)
}

$('#startBtn').click (function(){
  animateCSS('#startBtn', 'zoomOutRight')
});

