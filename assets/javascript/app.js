var actors = ["michaelkeaton", "emmawatson", "natalieportman", "jonhamm"];

$(document).ready(function(){
    for (i = 0; i < actors.length; i++) {
        var a = $("<button>");
        // Adding a class
        a.addClass("actor");
        // Adding a data-attribute with a value of the movie at index i
        a.attr("data-name", actors[i]);
        // Providing the button's text with a value of the movie at index i
        a.text(actors[i]);
        // Adding the button to the HTML
        $("#buttons").append(a);
    };

    
    //////////////////////////////////////////////////////////////////////////When adding classes from here, its not working
    //when entering in a new actor
    $("#submit").on("click", function(){
        addActor = $("#search-term").val().trim();//NOT USING THIS YET
        console.log(addActor);
        var b = $("<button>");
        b.addClass("actor");
        b.attr("data-name", addActor);
        b.text(addActor);
        $("#buttons").append(b);
        console.log(addActor)
        actors.push(addActor);
        console.log(actors)
    });

    //when selecting an actor button
    $(".actor").on("click", function(){
        //actor = $(".actor").val();
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
                    var gifDiv = $("<div>");
                    var $p = $("<p>").text("Rating: " + response.data[i].rating);
                    var $p2 = $("<p>").text("Title: " + response.data[i].title);
                    var actorImage = $("<img>");
                    actorImage.attr("src", response.data[i].images.original_still.url);
                    gifDiv.append($p2);
                    gifDiv.append($p);
                    gifDiv.append(actorImage);
                    $("#gifsGoHere").prepend(gifDiv);
                    actorImage.attr("data-still", response.data[i].images.original_still.url)
                    actorImage.attr("data-animate", response.data[i].images.fixed_height.url)
                    actorImage.addClass("gif");
                    actorImage.attr("data-state", "still");
                }
            });
    });
//////////////////////////////////////////////////////////////////////////When adding classes from here, its not working
    $(".gif").on("click", function() {
        console.log("thisIsWorking")
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

    //PLAN OF ACTION
    //1 - when selecting a actor button, injecting that into query url
    //2 - display those gifs
    //3 - when typing in a user, adding them to button array
    //4 - when sekecting new button, their images show up