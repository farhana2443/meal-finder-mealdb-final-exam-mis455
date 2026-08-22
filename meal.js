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

function showAllMeals() {

    var oldContent = document.getElementById("displayArea");
    var showAllArea = document.getElementById("showAllArea");

    showAllArea.textContent = "";

    for (var i = 6; i <= allMeals.length; i++) {
        addMealCard(allMeals[i - 1], oldContent);

    }
}

// addMealCard() is a helper function - avoids writing the same card-building code twice in display() and showAllMeals(). This idea (reusable helper function) wasn't shown exactly like this in class. 
function addMealCard(meal, container) {

    var newDiv = document.createElement("div");

    newDiv.classList.add("col-md-4");
    newDiv.classList.add("mb-4");

    newDiv.innerHTML = `
    <div class="recipe-card">
        <img src="${meal.strMealThumb}" class="recipe-card-img" alt="${meal.strMeal}">
        <div class="recipe-card-body">
            <span class="ticket-stub">#${meal.idMeal} &middot; ${meal.strCategory}</span>
            <h3 class="recipe-title">${meal.strMeal}</h3>
            <p class="recipe-tagline">${meal.strArea} dish</p>
            <p class="recipe-instructions">${meal.strInstructions}</p>
        </div>
        
    </div>
`;
// MealDB has no separate "title" field, only strMeal (name) - using and strArea (cuisine origin, e.g. "Italian") as the closest stand-in
    container.appendChild(newDiv);
}

