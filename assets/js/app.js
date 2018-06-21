var topics = [];

window.onload = function() {
	$("button").on("click", gifsAppear);
};

function gifsAppear() {
	var animal = $(this).attr("data-animal");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=ipsNwKvIczYuK0mO76Im4fh4hMILbQlT&limit=10";
    
    $.ajax({
		url: queryURL,
		method: "GET"
	}).then(function(response) {
		console.log(response);
		var results = response.data;
		for (var i = 0; i < results.length; i++) {
			var animalDiv = $("<div>");
			var p = $("<p>");
			p.text = results[i].rating;
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
			$("#gifs-appear-here").prepend(animalDiv);
			topics.push(results[i]);
		}
		$(".gif").on("click", animateGif);
	});
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