var topics = ["Wall-E", "The Incredibles", "Toy Story", "Spirited Away"];
var gifs = [];


window.onload = function() {
	$("#find-film").on("click", addFilm);
	renderButtons();
};

$(document).on("click", "button", searchGifs);

function searchGifs() {
	var filmName = $(this).attr('data-name');
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + filmName + "&api_key=ipsNwKvIczYuK0mO76Im4fh4hMILbQlT&limit=10";
    
    renderGifs(queryURL);
}

function animateGif() {
	var state = $(this).attr("data-state");
	var animateState = $(this).attr("data-animate");
    var stillState = $(this).attr("data-still");
    
	if (state == "still") {
		$(this).attr("src", animateState);
		$(this).attr("data-state", "animate");
	}
	if (state == "animate") {
		$(this).attr("src", stillState);
		$(this).attr("data-state", "still");
	}
}

function renderButtons() {
	$("#buttons-view").empty();

	for (var i = 0; i < topics.length; i++) {
		var newBtn = $("<button>");
		newBtn.attr("data-name", topics[i]);
		newBtn.text(topics[i]);
		$("#buttons-view").append(newBtn);
	}
  }

  function renderGifs(queryURL) {
	$("#films-view").empty();

	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function(response) {
		console.log(response);
		var results = response.data;
		for (var i = 0; i < results.length; i++) {
			var animalDiv = $("<div>");
			var p = $("<p>");
			p.text = "Rating: " + results[i].rating.toUpperCase();
			var animalImage = $("<img>");
			animalImage.attr("id", results[i].id);
			animalImage.attr("src", results[i].images.fixed_height_still.url);
			animalImage.attr("data-still", results[i].images.fixed_height_still.url);
			animalImage.attr("data-animate", results[i].images.fixed_height.url);
			animalImage.attr("data-state", "still");
			animalImage.attr("class", "gif");
			animalDiv.append(p.text);
			animalDiv.append("<br>");
			animalDiv.append(animalImage);
			$("#films-view").prepend(animalDiv);
			gifs.push(results[i]);
		}
		$(".gif").on("click", animateGif);
	});
  }

function addFilm (event) {
	event.preventDefault();	
	var film = $("#film-input").val();
	topics.push(film);

	renderButtons();
  }