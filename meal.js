var allMeals;
// allMeals is outside because it is used in both display() and showAllMeals().
function connect() {

    var search = document.getElementById("mealInput").value;
    var statusArea = document.getElementById("statusArea");

    if (search == "") {

        statusArea.innerHTML = "Please type a meal name first.";
    }
    else {

        statusArea.innerHTML = "Searching...";

        var url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;

        fetch(url)
        .then(res => res.json())
        .then(data => display(data))
        .catch(err => statusArea.innerHTML = "Could not reach the meal database. Please try again.");
        // Learned from internet; used to show an error message if the API request fails.

    }

}

function display(data) {

    var statusArea = document.getElementById("statusArea");
    var oldContent = document.getElementById("displayArea");

    oldContent.textContent = "";

    var meals =  data.meals;

    if (meals == null) {
        statusArea.innerHTML = "Meal not found. Please check the spelling.";

    }
    else {
        allMeals = meals;

        statusArea.innerHTML = `Found ${meals.length} result(s).`;

        var showCount = meals.length;

        if (meals.length > 5) {
            showCount = 5;

        }

        for (var i = 1; i <= showCount; i++) {
            addMealCard(meals[i - 1], oldContent);
        }

        // Shows the button when there are more than 5 results. Learned it from internet.
        if (meals.length > 5) {
            var buttonDiv = document.createElement("div");
            buttonDiv.classList.add("col-12");

            buttonDiv.innerHTML = `
                <div id="showAllArea">
                    <button onclick="showAllMeals()"> SHOW ALL (${meals.length - 5} more) </button>

                </div>
            `;

            oldContent.appendChild(buttonDiv);
        }
        
    }

    // Learned from internet; used to bring the page back to the top after a new search.
    window.scrollTo(0, 0);

}

