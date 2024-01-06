/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (let i = 0; i < games.length; i++) {
        let div_element = document.createElement('div')
        div_element.classList.add("game-card")
        let display = `
        <h3>${games[i].name}</h3>
        <img class="game-img"src=${games[i].img}>
        <p>${games[i].description}</p>
        <p>backers: ${games[i].backers}</p>
        `
        div_element.innerHTML = display
        gamesContainer.appendChild(div_element)
    }
    



        // create a new div element, which will become the game card


        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container

}
// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


addGamesToPage(GAMES_JSON)

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
let total_contributions = GAMES_JSON.reduce((sum, game) => {
    return sum + game.backers;
}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `<h3>${total_contributions.toLocaleString('en-US')}</h3>`

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

let total_raised = GAMES_JSON.reduce((sum, game) => {
    return sum + game.pledged;
}, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `<h3>$${total_raised.toLocaleString('en-US')}</h3>`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

let total_games = GAMES_JSON.reduce((sum, game) => {
    return sum + 1;
}, 0);

gamesCard.innerHTML =  `<h3>${total_games}</h3>`


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let list_of_unfunded_games = GAMES_JSON.filter( (game) => {
        return game.pledged < game.goal;
    });
    // use the function we previously created to add the unfunded games to the DOM
    
    for (let i = 0; i < list_of_unfunded_games.length; i++) {
        let div_element = document.createElement('div')
        div_element.classList.add("game-card")
        let display = `
        <h3>${list_of_unfunded_games[i].name}</h3>
        <img class="game-img"src=${list_of_unfunded_games[i].img}>
        <p>${list_of_unfunded_games[i].description}</p>
        <p>backers: ${list_of_unfunded_games[i].backers}</p>
        `
        div_element.innerHTML = display
        gamesContainer.appendChild(div_element)
        
    }
    
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let list_of_funded_games = GAMES_JSON.filter( (game) => {
        return game.pledged >= game.goal;
    });

    // use the function we previously created to add unfunded games to the DOM
    for (let i = 0; i < list_of_funded_games.length; i++) {
        let div_element = document.createElement('div')
        div_element.classList.add("game-card")
        let display = `
        <h3>${list_of_funded_games[i].name}</h3>
        <img class="game-img"src=${list_of_funded_games[i].img}>
        <p>${list_of_funded_games[i].description}</p>
        <p>backers: ${list_of_funded_games[i].backers}</p>
        `
        div_element.innerHTML = display
        gamesContainer.appendChild(div_element)
        
    }
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    for (let i = 0; i < GAMES_JSON.length; i++) {
        let div_element = document.createElement('div')
        div_element.classList.add("game-card")
        let display = `
        <h3>${GAMES_JSON[i].name}</h3>
        <img class="game-img"src=${GAMES_JSON[i].img}>
        <p>${GAMES_JSON[i].description}</p>
        <p>backers: ${GAMES_JSON[i].backers}</p>
        `
        div_element.innerHTML = display
        gamesContainer.appendChild(div_element)
    }

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly)
fundedBtn.addEventListener("click", filterFundedOnly)
allBtn.addEventListener("click", showAllGames)

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let list_of_unfunded_games = GAMES_JSON.filter( (game) => {
    return game.pledged < game.goal;
});

let num_unfunded_games = list_of_unfunded_games.length

// create a string that explains the number of unfunded games using the ternary operator
let description_Str = `A total of $${total_raised.toLocaleString('en-US')} has been raised for ${total_games} games. Currently, ${num_unfunded_games} ${num_unfunded_games < 2 ? "game" : "games"} remains unfunded. We need your help to fund these amazing games!`

// create a new DOM element containing the template string and append it to the description container
let p_element = document.createElement('p');
p_element.innerHTML = description_Str;
descriptionContainer.appendChild(p_element);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
let [first_game, second_game, ...other_games] = sortedGames
// create a new element to hold the name of the top pledge game, then append it to the correct element
let p_element_first_game = document.createElement('p');
p_element_first_game.innerHTML = `${first_game.name}`
firstGameContainer.appendChild(p_element_first_game);

let p_element_second_game = document.createElement('p');
p_element_second_game.innerHTML = `${second_game.name}`
secondGameContainer.appendChild(p_element_second_game)
// do the same for the runner up item
