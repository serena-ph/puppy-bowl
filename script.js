// Use the API_URL variable to make fetch requests to the API.
// Replace the placeholder with your cohort name (ex: 2109-UNF-HY-WEB-PT)
const cohortName = "YOUR COHORT NAME HERE";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`;

/**
 * Fetches all players from the API.
 * @returns {Object[]} the array of player objects
 */
const fetchAllPlayers = async () => {
  try { const response = await fetch ('https://fsa-puppy-bowl.herokuapp.com/api/2307-FSA-ET-WEB-FT-SF/players');
  const data = await response.json();
  // console.log(data.data.players)
return data.data.players
    // TODO
  } catch (err) {
    console.error("Uh oh, trouble fetching players!", err);
  }
};
/**
 * Fetches a single player from the API.
 * @param {number} playerId
 * @returns {Object} the player object
 */
const fetchSinglePlayer = async (playerId) => {
  try { const response = await fetch (`https://fsa-puppy-bowl.herokuapp.com/api/2307-FSA-ET-WEB-FT-SF/players/${playerId}/`);
  const data = await response.json();

  return data.data.player;

    // TODO
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, err);
  }
};
// console.log(fetchSinglePlayer(640));



/**
 * Updates `<main>` to display a list of all players.
 *
 * If there are no players, a corresponding message is displayed instead.
 *
 * Each player is displayed in a card with the following information:
 * - name
 * - id
 * - image (with alt text of the player's name)
 *
 * Additionally, each card has two buttons:
 * - "See details" button that, when clicked, calls `renderSinglePlayer` to
 *    display more information about the player
 * - "Remove from roster" button that, when clicked, will call `removePlayer` to
 *    remove that specific player and then re-render all players
 *
 * Note: this function should replace the current contents of `<main>`, not append to it.
 * @param {Object[]} playerList - an array of player objects
 */

// div for players info
function createElement(dt){
  const element = document.createElement("div");
// names
  const name = document.createElement("h1");
  name.innerHTML = dt.name
 
  // id
  const id = document.createElement("h2");
  id.innerHTML = dt.id
  // img
  const image = document.createElement("h3");
  image.innerHTML = dt.imageUrl

  // buttons
  const detailsBut = document.createElement("button");
  detailsBut.innerHTML= "See Details";
  detailsBut.addEventListener("click",()=>{
    renderSinglePlayer(dt.id)
  })

  const removeBut = document.createElement("button");
  removeBut.innerHTML="Remove from roster";
  removeBut.addEventListener("click",()=>{
    element.remove()
  })
  


  element.appendChild(name);
  element.appendChild(id);
  element.appendChild(image);
  element.appendChild(detailsBut);
  element.appendChild(removeBut);

 
  
  document.getElementsByTagName("main")[0].appendChild(element);

}

const renderAllPlayers = (playerList) => {

  fetchAllPlayers().then(response=>{
    response.forEach((i) => 
      createElement(i))
  })

};


    

/**
 * Updates `<main>` to display a single player.
 * The player is displayed in a card with the following information:
 * - name
 * - id
 * - breed
 * - image (with alt text of the player's name)
 * - team name, if the player has one, or "Unassigned"
 *
 * The card also contains a "Back to all players" button that, when clicked,
 * will call `renderAllPlayers` to re-render the full list of players.
 * @param {Object} player an object representing a single player
 */



const renderSinglePlayer = (player) => {
  fetchSinglePlayer(player).then(response=>{
    createElement(response)
  })


};
/**
 * Initializes the app by fetching all players and rendering them to the DOM.
 */
const init = async () => {
  const players = await fetchAllPlayers();
  renderAllPlayers(players);

};

// This script will be run using Node when testing, so here we're doing a quick
// check to see if we're in Node or the browser, and exporting the functions
// we want to test if we're in Node.
if (typeof window === "undefined") {
  module.exports = {
    fetchAllPlayers,
    fetchSinglePlayer,
    renderAllPlayers,
    renderSinglePlayer,
  };
} else {
  init();
}
