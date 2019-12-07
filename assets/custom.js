// global variables
var userInputs = {};

// movie recommendation function
function movieRecommendation() {

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.themoviedb.org/3/discover/movie?with_genres=" + userInputs[1] + userInputs[3] + userInputs[2] + "&page=1&include_video=false&include_adult=false&sort_by=popularity.desc&language=en-US&with_original_language=en&api_key=d12c2969d92f9ef15d80bab89a0cdf8d",
    "method": "GET",
    "headers": {},
    "data": "{}",
  }
  
  $.ajax(settings).done(function (response) {
    console.log(response);
    var x = parseInt(Math.random()*response.results.length);
    var movie = response.results[x].original_title;
    console.log(movie);

    $.ajax({
      url: "http://www.omdbapi.com/?apikey=63f86544&t=" + movie,
      type: "GET",
    }).then(function(response) {
      console.log(response);
      var imdb = parseFloat(response.Ratings[0].Value)*10;
      console.log(imdb);
      var rotten = parseInt(response.Ratings[1].Value);
      console.log(rotten);
      var meta = parseInt(response.Ratings[2].Value);
      console.log(meta);


      var poster = $('<img>').attr('src', response.Poster);
      console.log(poster);
      var title = $('<p>').text(response.Title);
      console.log(title);
      var cast = $('<p>').text('Main Cast: ' + response.Actors);
      console.log(cast);
      var plot = $('<p>').text('Synopsis: ' + response.Plot);
      console.log(plot);
      var release = $('<p>').text('Released: ' + response.Released);
      var rating = $('<p>').text('Rating: ' + response.Rated);
      $('#resultCard').append(poster, title, release, rating, cast, plot);

    });
    var ytQuery = "https://www.googleapis.com/youtube/v3/search?part=snippet&order=relevance&q=" + movie + "+trailer&key=AIzaSyAs4LN-8AAtpD25meiR3Upyat-7B-nnqck"
    $.ajax({
      url: ytQuery,
      method: "GET"
    }).then(function(response) {
      console.log(response)
      var trailer = $("<iframe>").attr("src", "https://www.youtube.com/embed/" + response.items[0].id.videoId)
      $("#resultCard").append(trailer);
      });

  });
    
};

// TV recommendation function
function tvRecommendation() {

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.themoviedb.org/3/discover/tv?include_null_first_air_dates=false&with_genres=" + userInputs[1] + userInputs[3] + "&timezone=America%2FNew_York&page=1" + userInputs[2] + "&sort_by=popularity.desc&language=en-US&with_original_language=en&api_key=d12c2969d92f9ef15d80bab89a0cdf8d",
    "method": "GET",
    "headers": {},
    "data": "{}"
  }
  
  $.ajax(settings).done(function (response) {
    console.log(response);
    var x = parseInt(Math.random()*response.results.length);
    var series = response.results[x].original_name;
    console.log(series);
    $.ajax({
      url: "http://www.omdbapi.com/?apikey=63f86544&t=" + series,
      type: "GET",
    }).then(function(response) {
      console.log(response);
      var imdb = parseFloat(response.Ratings[0].Value)*10;
      console.log(imdb);
      var rotten = parseInt(response.Ratings[1].Value);
      console.log(rotten);
      var meta = parseInt(response.Ratings[2].Value);
      console.log(meta);


      var poster = $('<img>').attr('src', response.Poster);
      console.log(poster);
      var title = $('<h2>').text(response.Title);
      console.log(title);
      var cast = $('<p>').text('Main Cast: ' + response.Actors);
      console.log(cast);
      var plot = $('<p>').text('Synopsis: ' + response.Plot);
      console.log(plot);
      var runtime = $('<p>').text('Aired: ' + response.Year);
      var rating = $('<p>').text('Rating: ' + response.Rated);
      $('#resultCard').append(title, poster, runtime, rating, cast, plot);

    });
    var ytQuery = "https://www.googleapis.com/youtube/v3/search?part=snippet&order=relevance&q=" + series + "+trailer&key=AIzaSyAs4LN-8AAtpD25meiR3Upyat-7B-nnqck"
    $.ajax({
      url: ytQuery,
      method: "GET"
    }).then(function(response) {
      console.log(response)
      var trailer = $("<iframe>").attr("src", "https://www.youtube.com/embed/" + response.items[0].id.videoId)
      $("#resultCard").append(trailer);
      });

  });
    
};
// animate.css
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

// Button onclick function with animation through all Questionnaire cards
$('#startBtn').click(function() {
  $(function() {
    animateCSS('#introCard', 'slideOutLeft')
    $('#introCard').hide()
  });
  $(function() {
    $('#promptCard1').show()
    animateCSS('#promptCard1', 'fadeIn')
  });
});

$('.card1btn').click(function() {
  var userMedia = $(this).attr("data-medium");
  userInputs[0] = userMedia;
  $(function () {
    $('#promptCard1').hide()
  });

  $(function() {
    $('#promptCard2').show()
    animateCSS('#promptCard2', 'fadeIn')
  });
});

$('.card2btn').click(function() {
  var userGenre = $(this).attr("data-genre");
  userInputs[1] = userGenre;
  $(function () {
    $('#promptCard2').hide()
  });

  $(function () {
    $('#promptCard3').show()
    animateCSS('#promptCard3', 'fadeIn')
  });
});

$('.card3btn').click(function() {
  if (userInputs[0] === "movie") {
    var userEra = $(this).attr("data-movieDate");
    userInputs[2] = userEra;
  } else {
    var userEra = $(this).attr("data-tvDate");
    userInputs[2] = userEra;
  }

  $(function () {
    $('#promptCard3').hide()
  });

  $(function() {
    $('#promptCard4').show()
    animateCSS('#promptCard4', 'fadeIn')
  });
});

// function for displaying results
var displayResults = function() {
  $('#loadingCard').hide()
  $(function() {
    $('#results').show()
    animateCSS('#results', 'fadeIn')
  });
};

// Show loading card
$('.card4btn').click (function(){
  // set final parameter in userInputs object
  var userRating = $(this).attr("data-rating");
  userInputs[3] = userRating;
  $(function () {
    $('#promptCard4').hide()
  });
  // show loading card and run recommendation function
  $(function () {
    $('#loadingCard').show()
    animateCSS('#loadingCard', 'slideInUp')
    console.log(userInputs);
    if (userInputs[0] === "movie") {
      movieRecommendation();
    } else {
      tvRecommendation();
    }
  });
  // after 2 seconds, display results
  setTimeout(displayResults, 4000);
});