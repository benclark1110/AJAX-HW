var actors = ["michael keaton", "emma watson", "natalie portman", "jon hamm"];

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

    // Here we are building the URL we need to query the database
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=michael+keaton&api_key=YTxyGlOjfID594D59aSyrTdWGCOM2945"

 
      // Here we run our AJAX call to the Giphy API
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // We store all of the retrieved data inside of an object called "response"
        .then(function(response) {
            console.log(response)
        });
  
        $(".actor").on("click", function(){
            
        });
    });
