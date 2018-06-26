var topics = ["Rise of the Guardians", "Howl's Moving Castle", "Wreck-it Ralph", "The Incredibles", "My Neighbor Totoro", "Inside Out", "Big Hero 6", "Spirited Away"];
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
			var filmDiv = $("<div>");
			filmDiv.attr("class", "films");
			var p = $("<p>");
			p.attr("class", "rating-text");
			p.text("Rating: " + results[i].rating.toUpperCase());
			var filmImage = $("<img>");
			filmImage.attr("id", results[i].id);
			filmImage.attr("src", results[i].images.fixed_height_still.url);
			filmImage.attr("data-still", results[i].images.fixed_height_still.url);
			filmImage.attr("data-animate", results[i].images.fixed_height.url);
			filmImage.attr("data-state", "still");
			filmImage.attr("class", "gif");
			filmDiv.append(p);
			filmDiv.append(filmImage);
			$("#films-view").prepend(filmDiv);
			gifs.push(results[i]);
		}
		$(".gif").on("click", animateGif);
	});
}

function addFilm(event) {
	event.preventDefault();
	var film = $("#film-input").val().trim();
	if(film === ""){
		alert("Please input a movie.");
		$("#film-input").val("");	
	}
	else{
		topics.push(film);
		renderButtons();
		$("#film-input").val("");	
	}
}