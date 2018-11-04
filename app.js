

var foodArray = ["pizza", "pho", "ramen", "pasta", "salad"];



    function generateGif() {

        var food = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + food + "&api_key=y6VwG67BXWfJhwEOrpnQAGpSaQMVsUuf&limit=10";
        console.log(queryURL);
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {

                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    
                    var dataStill = results[i].images.fixed_height_still.url;
                    var dataAnimate = results[i].images.fixed_height.url;
                    var dataTitle = results[i].title;
                    var dataRating = results[i].rating;
                    
                    // Creating div that'll contain all gif and related data
                    var gifDiv = $("<div class='shadow-lg p-3 mb-4 bg-white rounded'>");
                    // Creating and storing the image tag
                    var foodGif = $("<img>");
                    // Setting attribute to foodGif
                    foodGif.attr("src", dataStill);
                    foodGif.attr("data-state", "still");
                    foodGif.attr("data-still", dataStill);
                    foodGif.attr("data-animate", dataAnimate);
                    foodGif.attr("id", "gif-id");
                    // Storing title and rating data in <p>
                    var pTitle = $("<p>").text("Title: " + dataTitle);
                    var pRating = $("<p>").text("Rating: " + dataRating);
    
                    // Append 
                    gifDiv.append(pTitle);
                    gifDiv.append(pRating);
                    gifDiv.append(foodGif);
                    // Prepend
                    $("#giphy-area").prepend(gifDiv);

                    $("#gif-id").on("click", function() {
                        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
                        var state = $(this).attr("data-state");
                        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
                        // Then, set the image's data-state to animate
                        // Else set src to the data-still value
                        if (state === "still") {
                          $(this).attr("src", $(this).attr("data-animate"));
                          $(this).attr("data-state", "animate");
                        } else {
                          $(this).attr("src", $(this).attr("data-still"));
                          $(this).attr("data-state", "still");
                        }
                      });

                }

            });
        };


    function renderButtons() {
    // Deleting food prior to adding new food
    // (this is necessary otherwise you will have repeat buttons)
    $("#button-area").empty();
    // Looping through the array of food
        for (var i = 0; i < foodArray.length; i++) {
            // Then dynamicaly generating buttons for each food in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var a = $("<button>");
            // Adding a class of btn btn-outline-danger m-2 to our button
            a.addClass("btn btn-outline-danger m-2");
            a.attr("id", "button-id");
            // Adding a data-attribute
            a.attr("data-name", foodArray[i]);
            // Providing the initial button text
            a.text(foodArray[i]);
            // Adding the button to the buttons-view div
            $("#button-area").append(a);
            console.log(a);
        }
    };

    // Function to add new food
    $("#food-submit").on("click", function(event) {
        event.preventDefault();
        var food = $("#food-input").val().trim();
        foodArray.push(food);
        
        renderButtons();
    });

    // Adding a click event listener to all elements with a class of "btn btn-outline-danger m-2"
    $(document).on("click", "#button-id", generateGif);

    // Calling the renderButtons function to display the intial buttons
    renderButtons();