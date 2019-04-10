var actors = ["michael keaton", "emma watson", "natalie portman", "jon hamm"];

$(document).ready(function(){

        for (i = 0; i < actors.length; i++) {
            var a = $("<button>");
            a.addClass("actor");
            a.addClass("btn btn-info");
            a.attr("data-name", actors[i]);
            a.text(actors[i]);
            $("#buttons").append(a);
        };

    
    //when entering in a new actor
    $("#submit").on("click", function(){
        addActor = $("#search-term").val().trim();//NOT USING THIS YET
        console.log(addActor);
        var b = $("<button>");
        b.addClass("actor");
        b.addClass("btn btn-info");
        b.attr("data-name", addActor);
        b.text(addActor);
        $("#buttons").append(b);
        console.log(addActor)
        actors.push(addActor);
        console.log(actors);
    });

    //when selecting an actor button
    $("#buttons").on("click", ".actor", function(){
        console.log($(this).data("name"));
        console.log(this);
        var clickedActor = $(this).data("name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + clickedActor + "&api_key=YTxyGlOjfID594D59aSyrTdWGCOM2945&limit=10"
    
        // Here we run our AJAX call to the Giphy API
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            // We store all of the retrieved data inside of an object called "response"
            .then(function(response) {
                console.log(response)
                for (i = 0; i < response.data.length; i++) {
                    //for every item in the response, we want to add it to a div, add details, and append that div
                    var gifDiv = $("<div>");
                    var $p = $("<p>").text("Rating: " + response.data[i].rating);
                    var $p2 = $("<p>").text("Title: " + response.data[i].title);
                    var actorImage = $("<img>");
                    gifDiv.addClass("actorGifs");
                    //we want to give the gif an ititial source of still
                    actorImage.attr("src", response.data[i].images.fixed_height_still.url);
                    gifDiv.append($p2);
                    gifDiv.append($p);
                    gifDiv.append(actorImage);
                    $("#gifsGoHere").prepend(gifDiv);
                    //we want to give the gif the annimate attributes as well to use later
                    actorImage.attr("data-still", response.data[i].images.fixed_height_still.url)
                    actorImage.attr("data-animate", response.data[i].images.fixed_height.url)
                    actorImage.addClass("gif");
                    actorImage.attr("data-state", "still");
                }
            });
    });
    //when selecting a gif, we want to change the data-state to annimate or vice versa
    $("#gifsGoHere").on("click", ".gif", function() {
        console.log(this);
        var state = $(this).attr("data-state");
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
    });
    
});